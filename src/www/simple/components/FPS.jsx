import React from 'react';

export class FPS extends React.Component {
    constructor(props) {
        super(props);
        this.domStats = React.createRef();
        this.fpsStats = React.createRef();
        this.cpuStats = React.createRef();
    }
    compontWillUnmount() {
        const { store: { stats, fps, cpuStats } } = this.props;
        stats.dom.remove();
        fps.dom.remove();
        cpuStats.dom.remove();
    }
    componentDidMount() {
        const { store: { stats, fps, cpuStats } } = this.props;
        this.domStats.current.appendChild(stats.dom);
        this.fpsStats.current.appendChild(fps.dom);
        this.cpuStats.current.appendChild(cpuStats.dom);
    }
    render() {
        const { store } = this.props;

        return (
            <div className="panel">
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    <div ref={this.domStats}>DOM</div>
                    <div ref={this.fpsStats}>Screen</div>
                    <div ref={this.cpuStats}>CPU</div>
                </div>
        </div>
        );
    }
}