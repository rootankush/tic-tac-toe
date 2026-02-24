function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markBoard = (row, column, player) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addMark(player);
            return true;
        } else {
            console.log("INVALID MOVE");
            return false;
        }
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue()),
        );
        console.table(boardWithCellValues);
    };

    return {
        getBoard,
        markBoard,
        printBoard,
    };
}

function Cell() {
    let value = "";
    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue,
    };
}

function GameFlow(playerOneName = "Player X", playerTwoName = "Player O") {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            mark: "X",
        },
        {
            name: playerTwoName,
            mark: "O",
        },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`Marked ${getActivePlayer().name}'s mark into the table'`);
        board.markBoard(row, column, getActivePlayer().mark);
        if (true) {
            switchPlayerTurn();
        }
        printNewRound();
    };

    return {
        playRound,
        getActivePlayer,
    };
}

const game = GameFlow();
