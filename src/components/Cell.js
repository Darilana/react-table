import React from 'react'
import PropTypes from 'prop-types'

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            value: props.value,
        };
        this.display = this.determineDisplay({ x: props.x, y: props.y }, props.value)
    }

    componentDidMount() {
        window.document.addEventListener('unselectAll', this.handleUnselectAll)
    }

    componentWillUpdate() {
        this.display = this.determineDisplay({ x: this.props.x, y: this.props.y }, this.state.value)
    }

    componentWillUnmount() {
        window.document.removeEventListener('unselectAll', this.handleUnselectAll)
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
        this.display = this.determineDisplay({ x: this.props.x, y: this.props.y }, e.target.value);
        this.props.updateCells()
    };

    onKeyPressOnInput = (e) => {
        if (e.key === 'Enter') {
            this.hasNewValue(e.target.value)
        }
    };

    onBlur = (e) => {
        this.hasNewValue(e.target.value)
    };

    handleUnselectAll = () => {
        if (this.state.selected || this.state.editing) {
            this.setState({ selected: false, editing: false })
        }
    };

    hasNewValue = (value) => {
        this.props.onChangedValue(
            {
                x: this.props.x,
                y: this.props.y,
            },
            value,
        );
        this.setState({ editing: false })
    };

    emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll');
        window.document.dispatchEvent(unselectAllEvent)
    };

    clicked = () => {
        this.emitUnselectAllEvent();
        this.setState({ editing: true, selected: true })
    };

    determineDisplay = ({ x, y }, value) => {
        if (value.slice(0, 1) === '=') {
            const res = this.props.executeFormula({ x, y }, value.slice(1));
            if (res.error !== null) {
                return 'INVALID'
            }
            return res.result
        }
        return value
    };

    render() {
        if (this.props.x === 0) {
            return (
                <span className='cell heading-cell'>
          {this.props.y}
        </span>
            )
        }

        if (this.props.y === 0) {
            const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('');
            return (
                <span onKeyPress={this.onKeyPressOnSpan} className='cell heading-cell' role="presentation">
          {alpha[this.props.x]}
        </span>
            )
        }

        if (this.state.editing) {
            return (
                <input
                    className="cell editable-cell"
                    type="text"
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPressOnInput}
                    value={this.state.value}
                    onChange={this.onChange}
                    autoFocus
                />
            )
        }
        return (
            <span
                onClick={e => this.clicked(e)}
                onDoubleClick={e => this.doubleClicked(e)}
                className="cell"
            >
        {this.display}
      </span>
        )
    }
}

Cell.propTypes = {
    onChangedValue: PropTypes.func.isRequired,
    executeFormula: PropTypes.func.isRequired,
    updateCells: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
};