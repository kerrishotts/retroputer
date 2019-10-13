import React from 'react';

export class FPS extends React.Component {
    constructor(props) {
        super(props);
        this.mountPoint = React.createRef();
    }
    compontWillUnmount() {
        const { store: { stats, fps } } = this.props;
        stats.dom.remove();
        fps.dom.remove();
    }
    componentDidMount() {
        const { store: { stats, fps } } = this.props;
        this.mountPoint.current.appendChild(stats.dom);
        this.mountPoint.current.appendChild(fps.dom);
    }
    render() {
        const { store } = this.props;

        return (
            <div className="panel">
                <div ref={this.mountPoint} style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}></div>
        </div>
        );
    }
}