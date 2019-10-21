import React from 'react';

export class Docs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="panel" style={{display: "flex", flexDirection: "column"}}>
                <div className="toolbar" style={{flex: "0 0 auto"}}>
                    <button>Home</button>
                    <span class="divider"></span>
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
                <iframe style={{flex: "1 1 auto"}} src="https://kerri-shotts.gitbook.io/retroputer/" />
            </div>
        )
    }
}