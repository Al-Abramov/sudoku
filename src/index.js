module.exports = function solveSudoku(matrix) {
    const matrixSize = matrix.length;
    const subgridSize = 3;

    function findEmpty(matrix) {
        for (let r = 0; r < matrixSize; r++) {
            for (let c = 0; c < matrixSize; c++) {
                if(matrix[r][c] === 0) {
                    return [r,c];
                }
            }
        }
        return null;
    }

    const validate = (num, pos, matrix) => {
        const [r,c] = pos;

        //Check rows
        for (let i = 0; i < matrixSize; i++) {
            if (matrix[i][c] === num && i !== r) {
                return false;
            }
        }

        //Check cols
        for (let i = 0; i < matrixSize; i++) {
            if (matrix[r][i] === num && i !== c) {
                return false;
            }
        }


        //Check box
        const subgridRow = Math.floor( r/subgridSize ) * subgridSize;
        const subgridCol = Math.floor( c/subgridSize ) * subgridSize;

        for (let i = subgridRow; i < subgridRow + subgridSize; i++) {
            for (let j = subgridCol; j < subgridCol + subgridSize; j++) {
                if (matrix[i][j] === num && i !== r && j !== c) {
                    return false;
                }
            }
        }

        return true;
    }

    const solve = () => {
        const currentPos = findEmpty(matrix);

        if (currentPos === null) {
            return true;
        }
     
        for (let i = 1; i < matrixSize + 1; i++) {
            const currentNum = i;
            const isValid = validate(currentNum, currentPos, matrix);
   
            if (isValid) {
                const [a, b] = currentPos;
                matrix[a][b] = currentNum;

                if(solve()) {
                    return true;
                }

                matrix[a][b] = 0;
            }
        }

        return false;
    }

    solve();
    return matrix;
}
