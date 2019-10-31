import React from 'react';

export class ComputerKeyboard extends React.Component {
    constructor(props) {
        super(props);

        this.keyPressed = this.keyPressed.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        this._handlers = {};
    }

    componentDidMount() {
        document.addEventListener("keypress", this.keyPressed);
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.keyPressed);
        document.removeEventListener("keydown", this.keyDown);
        document.removeEventListener("keyup", this.keyUp);
    }

    keyPressed(e) {
        if (e.target.tagName === "INPUT" && !e.target.classList.contains("keyboard")) { return; }
        if (e.target.tagName === "TEXTAREA") { return; }
        /*const { store } = this.props;
        const { keyboard } = store.devices;
        keyboard.keyPressed(e.charCode); */
        e.preventDefault();
    }

    keyDown(e) {
        if (e.target.tagName === "INPUT" && !e.target.classList.contains("keyboard")) { return; }
        if (e.target.tagName === "TEXTAREA") { return; }
        const { store } = this.props;
        const { keyboard } = store.devices;
        keyboard.keyDown(e.nativeEvent ? e.nativeEvent.code : e.code);
        e.preventDefault();
    }

    keyUp(e) {
        if (e.target.tagName === "INPUT" && !e.target.classList.contains("keyboard")) { return; }
        if (e.target.tagName === "TEXTAREA") { return; }
        const { store } = this.props;
        const { keyboard } = store.devices;
        keyboard.keyUp(e.nativeEvent ? e.nativeEvent.code : e.code);
        e.preventDefault();
    }

    render() {
        return (
            <div className="panel">
                <label>
                    Input: 
                    <input autoFocus={true} autoComplete="off" className="keyboard"
                           type="text" size={1} 
                           /*onKeyPress={this.keyPressed} onKeyDown={this.keyDown} onKeyUp={this.keyUp}*/ />
                </label>
            </div>
        )
    }
}