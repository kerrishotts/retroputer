import React from 'react';
import scanlines from "../assets/scanlines.png";
import shadowMask from "../assets/shadowmask.png";
import { Keyboard } from "./Keyboard.jsx";
/*
 * Modified from 
 * https://gist.github.com/KHN190/d7c467a471b15e72302b16a9336440a5
 */
const ASPECT = .936; //91/100;
function resizeCanvas(c) {
    // assume that c's grandparent has the width and height we need
    const otherHeights = Array.from(c.parentElement.parentElement.children, (el, idx) => idx > 1 ? el.getBoundingClientRect().height : 0)
        .reduce((acc, sz) => acc + sz, 0);
    const width = c.parentElement.parentElement.clientWidth - 40;
    const height = c.parentElement.parentElement.clientHeight - otherHeights - 20; //40;
    let aspectWidth = width;
    let aspectHeight = Math.floor(width * ASPECT);
    if (aspectHeight > height) {
        aspectHeight = height;
        aspectWidth = height / ASPECT;
    }
    c.style.width = `${aspectWidth}px`;
    c.style.height = `${aspectHeight}px`;
}
function glresize(gl, program)
{

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(gl.getUniformLocation(program, "u_canvasSize"), gl.canvas.width, gl.canvas.height);
}
function compileShader(gl, source, type)
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        var info = gl.getShaderInfoLog(shader);
        throw ("could not compile shader:" + info);
    }
    return shader;
};

function initGLCanvas(canvas, useGL) {
    if (!useGL) return [false, canvas.getContext("2d")];
    let gl = canvas.getContext("webgl2");
    if (!gl) gl = canvas.getContext("webgl");
    if (!gl) return [false, canvas.getContext("2d")];

    var vs_script = document.getElementById("some-vertex-shader");
    var vs = compileShader(gl, vs_script.text, gl.VERTEX_SHADER);
    var fs_script = document.getElementById("some-fragment-shader");
    var fs = compileShader(gl, fs_script.text, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        var info = gl.getProgramInfoLog(program);
        throw ("shader program failed to link:" + info);
    }
    gl.useProgram(program)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform3f(gl.getUniformLocation(program, "u_canvasSize"), gl.canvas.width, gl.canvas.height, 0.0 );

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(gl.getUniformLocation(program, "u_canvasSize"), gl.canvas.width, gl.canvas.height);

    var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,0, 0,0, 0,1, 0,1, 1,1, 1,0]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1, -1,1, -1,-1, -1,-1, 1,-1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const gltex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, gltex);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT );
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.getUniformLocation(program, "u_texture0"), 0);


    return [true, gl, program];
}
function gldraw(gl, source)
{
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    //requestAnimationFrame(gldraw);
}
/* end of shader stuff */

export class ComputerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.renderFrame = this.renderFrame.bind(this);
        this.glChecked = this.glChecked.bind(this);
        this.accuracyChecked = this.accuracyChecked.bind(this);
        this.keyboardChecked = this.keyboardChecked.bind(this);
        this.hideToolsClicked = this.hideToolsClicked.bind(this);

        const frameCanvas = document.createElement("canvas");
        frameCanvas.setAttribute("width", "640");
        frameCanvas.setAttribute("height", "480");
        const frameCtx = frameCanvas.getContext("2d");
        const frameBuffer = frameCtx.createImageData(640, 480);

        this.canvas = React.createRef();
        this.ctx = null;
        this.isGL = false;
        this.program = null;

        this._cancelRAF = null;
        this._lastTimestamp = 0;

        this.state = {
            frameBuffer,
            frameCtx,
            frameCanvas,
            frames: 0,
            orphanedFrames: 0,
            hideTools: false
        };
    }
    componentDidMount() {
        this._cancelRAF = requestAnimationFrame(this.renderFrame);
        const useGL = this.props.store.useGL;
        [this.isGL, this.ctx, this.program] = initGLCanvas(this.canvas.current, useGL);
        if (!this.isGL) {
            this.ctx.scale(2, 2);
        }
    }
    componentWillUnmount() {
        cancelAnimationFrame(this._cancelRAF);
    }
    hideToolsClicked(e) {
        this.setState(nextState => ({hideTools: !nextState.hideTools}));
    }
    accuracyChecked(e) {
        const { computer, diagnostics, devices: { screen }, stats } = store;
        this.props.store.accurateScreen = e.target.checked;
        screen.mode = this.props.store.accurateScreen ? 2 : 1;
        this.setState({});
    }
    glChecked(e) {
        this.props.store.useGL = e.target.checked;
        this.setState({});
        const newCanvas = this.canvas.current.cloneNode();
        this.canvas.current.replaceWith(newCanvas);
        this.canvas.current = newCanvas;
        const useGL = this.props.store.useGL;
        [this.isGL, this.ctx, this.program] = initGLCanvas(this.canvas.current, useGL);
        if (!this.isGL) {
            this.ctx.scale(2, 2);
        }
    }
    keyboardChecked(e) {
        const { computer, diagnostics, devices: { screen }, stats } = store;
        this.props.store.showKeyboardOnScreen = e.target.checked;
        this.setState({});
    }
    renderFrame(now) {
        const { store } = this.props;
        const { computer, diagnostics, devices: { screen }, stats } = store;

        stats.begin();

        // see if we need to resize...
        resizeCanvas(this.canvas.current);
        if (this.isGL) glresize(this.ctx, this.program);

        let { orphanedFrames, frames, frameBuffer, frameCtx, frameCanvas } = this.state;
        frames++;
        if (frames % 60 === 0) {
            orphanedFrames = 0;
        }

        const delta = now - this._lastTimestamp;
        this._lastTimestamp = now;

        this._cancelRAF = requestAnimationFrame(this.renderFrame);

        if (diagnostics.state !== "running") {
            if (orphanedFrames < 3) {
                while (!screen._wait)
                    screen.tick();
                orphanedFrames++;
            }
        }

        if (diagnostics.state === "running" || orphanedFrames < 3) {
            if (screen._wait) {
                screen.resetWait();
            }
                frameBuffer.data.set(screen.frame);
                frameCtx.putImageData(frameBuffer, 0, 0);

                const canvas = this.canvas.current;
                const ctx = this.ctx; //canvas.getContext("2d");

                if (this.isGL) {
                    gldraw(ctx, frameCanvas);
                } else {
                    ctx.drawImage(frameCanvas, 0, 0);
                }
            //}
        }

        if (diagnostics.state === "running") {
            orphanedFrames = 0;
        }

        this.setState({
            orphanedFrames,
            frames,
        });

        stats.end();

    }
    render() {
        const showKeyboardOnScreen = this.props.store.showKeyboardOnScreen;
        const hideTools = this.state.hideTools;
        return (
            <div className="panel column" style={{position: "relative", overflow: "hidden"}}>
                <div className="row" style={{position: "absolute", zIndex:"99", backgroundColor:(hideTools ? "": "rgba(0,0,0,0.2)"), right: "0", left: "0", margin:"-6px -6px 0 -6px", padding: "6px"}}>
                    <button style={{padding: "0 6px", margin: 0, marginRight: "6px", height: "1.5em", color: "white", backgroundColor: "transparent"}} onClick={this.hideToolsClicked}>{`${hideTools ? ">" : "<"}`}</button>
                    { !hideTools && 
                        <>
                            <label><input type="checkbox" checked={this.props.store.useGL} onChange={this.glChecked}/> CRT Effect </label>
                            &nbsp;
                            <label><input type="checkbox" checked={this.props.store.accurateScreen} onChange={this.accuracyChecked}/> Accurate</label>
                            &nbsp;
                            <label><input type="checkbox" checked={this.props.store.showKeyboardOnScreen} onChange={this.keyboardChecked}/> Keyboard</label>
                        </>
                    }   
                </div>
                <div style={{position: "relative"}} className="nogrow noshrink center">
                    <canvas width={1280} height={960} ref={this.canvas} className="screen nogrow noshrink center" />
                    {/*
                    <img src={scanlines} style={{position: "absolute", opacity: 0.25, left: 0, top: 0}} width={640} height={480} className="nogrow noshrink center"/>
                    <img src={shadowMask} style={{mixBlendMode: "overlay", opacity: 1, position: "absolute", left: 0, top: 0}} width={640} height={480} className="nogrow noshrink center"/>
                    */}
                </div>
                <div className="noshrink" style={{position: "relative", minHeight: showKeyboardOnScreen ? "240px" : "48px"}}>
                    <Keyboard mode={showKeyboardOnScreen? "full" : "mini"} store={this.props.store}/>
                </div>
            </div>
        );
    }
}