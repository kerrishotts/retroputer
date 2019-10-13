import React from 'react';

export class ComputerConsole extends React.Component {
    constructor(props) {
        super(props);
        this._console = React.createRef();
    }
    componentDidMount() {
        const { store } = this.props;
        const { devices: { console } } = store;
        console.target = this._console.current;
    }
    render() {
        return (
            <div className="panel">
                <code ref={this._console}/>
            </div>
        )
    }
}