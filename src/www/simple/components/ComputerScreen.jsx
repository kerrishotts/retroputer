import React from 'react';
import scanlines from "../assets/scanlines.png";
import shadowMask from "../assets/shadowmask.png";

/*
 * Modified from 
 * https://gist.github.com/KHN190/d7c467a471b15e72302b16a9336440a5
 */
function glresize(gl)
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
    const gl = canvas.getContext("webgl");
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
    /*
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    */
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.getUniformLocation(program, "u_texture0"), 0);


    return [true, gl];
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

        const frameCanvas = document.createElement("canvas");
        frameCanvas.setAttribute("width", "640");
        frameCanvas.setAttribute("height", "480");
        const frameCtx = frameCanvas.getContext("2d");
        const frameBuffer = frameCtx.createImageData(640, 480);

        this.canvas = React.createRef();
        this.ctx = null;
        this.isGL = false;

        this._cancelRAF = null;
        this._lastTimestamp = 0;

        this.state = {
            frameBuffer,
            frameCtx,
            frameCanvas,
            frames: 0,
            orphanedFrames: 0,
        };
    }
    componentDidMount() {
        this._cancelRAF = requestAnimationFrame(this.renderFrame);
        const useGL = this.props.store.useGL;
        [this.isGL, this.ctx] = initGLCanvas(this.canvas.current, useGL);
    }
    componentWillUnmount() {
        cancelAnimationFrame(this._cancelRAF);
    }
    glChecked(e) {
        this.props.store.useGL = e.target.checked;
        this.setState({});
        const newCanvas = this.canvas.current.cloneNode();
        this.canvas.current.replaceWith(newCanvas);
        this.canvas.current = newCanvas;
        const useGL = this.props.store.useGL;
        [this.isGL, this.ctx] = initGLCanvas(this.canvas.current, useGL);
    }
    renderFrame(now) {
        const { store } = this.props;
        const { computer, diagnostics, devices: { screen }, stats } = store;

        stats.begin();

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
                frameBuffer.data.set(screen.frame);
                frameCtx.putImageData(frameBuffer, 0, 0);

                const canvas = this.canvas.current;
                const ctx = this.ctx; //canvas.getContext("2d");

                if (this.isGL) {
                    gldraw(ctx, frameCanvas);
                } else {
                    ctx.drawImage(frameCanvas, 0, 0);
                }
            }
        }

        if (diagnostics.state === "running") {
            orphanedFrames = 0;
        }

        this.setState({
            orphanedFrames,
            frames
        });

        stats.end();

    }
    render() {
        return (
            <div className="panel column" style={{position: "relative"}}>
                <label><input type="checkbox" checked={this.props.store.useGL} onChange={this.glChecked}/> Use GL</label>
                <div style={{width:"640px", height: "480px", position: "relative"}} className="nogrow noshrink center">
                    <canvas width={640} height={480} ref={this.canvas} className="screen nogrow noshrink center" />
                    {/*
                    <img src={scanlines} style={{position: "absolute", opacity: 0.25, left: 0, top: 0}} width={640} height={480} className="nogrow noshrink center"/>
                    <img src={shadowMask} style={{mixBlendMode: "overlay", opacity: 1, position: "absolute", left: 0, top: 0}} width={640} height={480} className="nogrow noshrink center"/>
                    */}
                </div>
            </div>
        );
    }
}