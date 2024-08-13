const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (board.includes('')) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        } else {
            message.textContent = 'It\'s a tie!';
            isGameActive = false;
        }
    }
};

const checkWinner = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
