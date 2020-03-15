import React from 'react';

const columnWidths = [ 48, ...Array.from({length: 8}, () => 24), 16, ...Array.from({length: 8}, () => 12)];

export class AutoUpdateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false
        };

        this.setupUpdates = this.setupUpdates.bind(this);
        this.clearUpdates = this.clearUpdates.bind(this);
    }

    setupUpdates() {
        const { store } = this.props;
        this.clearUpdates();
        if (store.autoUpdate) this._cancelUpdate = setInterval(() => this.setState({updating: true}), store.updateInterval);
    }
    clearUpdates() {
        clearInterval(this._cancelUpdate);
    }
            
    componentDidMount() {
        const { store } = this.props;
        store.addListener(this.setupUpdates);
        this.setupUpdates();
    }
    componentWillUnmount() {
        this.clearUpdates();
    }
}