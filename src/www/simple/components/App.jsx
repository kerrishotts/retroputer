import React from 'react';

class App extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <div>Hello, from {store.config.code}</div>
        );
    }
}