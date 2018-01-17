import React from 'react';
import { Parser as FormulaParser } from 'hot-formula-parser';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {updateCell} from "../actions";
import Row from './Row';
import {Well} from 'react-bootstrap';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.parser = new FormulaParser();

        this.parser.on('callCellValue', (cellCoord, done) => {
            const x = cellCoord.column.index + 1;
            const y = cellCoord.row.index + 1;

            if (x > this.props.tableReducer[0].length || y > this.props.tableReducer.length) {
                throw this.parser.Error(this.parser.ERROR_NOT_AVAILABLE)
            }

            if (this.parser.cell.x === x && this.parser.cell.y === y) {
                throw this.parser.Error(this.parser.ERROR_REF)
            }

            if (!this.props.tableReducer[y] || !this.props.tableReducer[y][x]) {
                return done('')
            }

            return done(this.props.tableReducer[y][x])
        });

        this.parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
            const sx = startCellCoord.column.index + 1;
            const sy = startCellCoord.row.index + 1;
            const ex = endCellCoord.column.index + 1;
            const ey = endCellCoord.row.index + 1;
            const fragment = [];

            for (let y = sy; y <= ey; y += 1) {
                const row =this.props.tableReducer[y];
                if (!row) {
                    continue
                }

                const colFragment = [];

                for (let x = sx; x <= ex; x += 1) {
                    let value = row[x];
                    if (!value) {
                        value = ''
                    }

                    if (value.slice(0, 1) === '=') {
                        const res = this.executeFormula({ x, y }, value.slice(1));
                        if (res.error) {
                            throw this.parser.Error(res.error)
                        }
                        value = res.result
                    }
                    colFragment.push(value)
                }
                fragment.push(colFragment)
            }

            if (fragment) {
                done(fragment)
            }
        })
    }

    updateCells = () => {
        this.forceUpdate()
    };

    executeFormula = (cell, value) => {
        this.parser.cell = cell;
        let res = this.parser.parse(value);
        if (res.error != null) {
            return res
        }
        if (res.result.toString() === '') {
            return res
        }
        if (res.result.toString().slice(0, 1) === '=') {
            // formula points to formula
            res = this.executeFormula(cell, res.result.slice(1))
        }
        return res
    };

    render() {
        const rows = [];
        for (let y = 0; y < this.props.tableReducer.length; y += 1) {
            const rowData = this.props.tableReducer[y];
            rows.push(
                <Row
                    handleChangedCell={this.props.handleChangedCell}
                    executeFormula={this.executeFormula}
                    updateCells={this.updateCells}
                    key={y}
                    y={y}
                    x={this.props.tableReducer[0].length}
                    rowData={rowData}
                />,
            )
        }
        return (
            <div>
                <div className='my-table'>
                    {rows}
                </div>
                <div className='container formula'>
                    <Well>
                        <h3>The following formula can be used:</h3>
                        <ul>
                            <li>To count the difference between two numbers: <code>=MINUS(A1, A2)</code></li>
                            <li>To count the sum of two or more numbers: <code>=SUM(A1, A2) / =SUM(A1: A2)</code></li>
                            <li>For multiplication: <code>=MULTIPLY(A1, A2)</code></li>
                            <li>For exponentiation <code>=POW(A1, A2)</code></li>
                            <li>To find the quotient of two numbers: <code>=QUOTIENT(A1, A2)</code></li>
                            <li>Modulo operation: <code>=MOD(A1, A2)</code></li>
                        </ul>
                    </Well>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tableReducer: state.tableReducer
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({handleChangedCell: updateCell}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Table);