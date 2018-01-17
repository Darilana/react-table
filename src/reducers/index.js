import {combineReducers} from 'redux';

const TableReducer = function (state = null, action) {
    const rows = 20;
    const cols = 20;
    const initialTable = [];
    for (let i = 0; i < rows; i = i + 1) {
        initialTable[i] = [];
        for (let j = 0; j < cols; j = j + 1) {
            initialTable[i][j] = '';
        }
    }

    switch (action.type) {
        case 'CELL_UPDATED':
            let newState = state.map((row) => row.slice());
            newState[action.payload.row][action.payload.col] = action.payload.value;
            return newState;
        default:
            return initialTable;
    }
};

const allReducers = combineReducers({
    tableReducer: TableReducer,
});

export default allReducers;