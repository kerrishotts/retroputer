import React from 'react';

export class ComputerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.renderFrame = this.renderFrame.bind(this);

        const frameCanvas = document.createElement("canvas");
        frameCanvas.setAttribute("width", "640");
        frameCanvas.setAttribute("height", "480");
        const frameCtx = frameCanvas.getContext("2d");
        const frameBuffer = frameCtx.createImageData(640, 480);

        this.canvas = React.createRef();

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
    }
    componentWillUnmount() {
        cancelAnimationFrame(this._cancelRAF);
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
                const ctx = canvas.getContext("2d");

                ctx.drawImage(frameCanvas, 0, 0);
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
            <div className="panel row">
                <canvas width={640} height={480} ref={this.canvas} className="screen nogrow noshrink center" />
            </div>
        );
    }
}