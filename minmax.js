

const EMPTY = '';
const HUMAN = 'O';
const AI = 'X';


function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes(EMPTY) ? null : 'tie';
}


function getAvailableMoves(board) {
    return board.reduce((acc, val, idx) => val === EMPTY ? acc.concat(idx) : acc, []);
}


function minimax(board, depth, isMaximizing) {
    const winner = checkWinner(board);
    if (winner !== null) {
        if (winner === AI) return 10 - depth;
        if (winner === HUMAN) return depth - 10;
        return 0;
    }

    const availableMoves = getAvailableMoves(board);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let move of availableMoves) {
            board[move] = AI;
            const evall = minimax(board, depth + 1, false);
            board[move] = EMPTY;
            maxEval = Math.max(maxEval, evall);
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let move of availableMoves) {
            board[move] = HUMAN;
            const evall = minimax(board, depth + 1, true);
            board[move] = EMPTY;
            minEval = Math.min(minEval, evall);
        }
        return minEval;
    }
}

export default function findBestMove(board) {
    let bestMove = -1;
    let bestValue = -Infinity;
    const availableMoves = getAvailableMoves(board);

    for (let move of availableMoves) {
        board[move] = AI;
        const moveValue = minimax(board, 0, false);
        board[move] = EMPTY;

        if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = move;
        }
    }

    return bestMove;
}



