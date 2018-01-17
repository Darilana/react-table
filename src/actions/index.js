export const updateCell = ({x, y}, value) => {
    return {
        type: 'CELL_UPDATED',
        payload: {
            col: x,
            row: y,
            value: value
        }
    }
};

