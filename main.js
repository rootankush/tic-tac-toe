const GameBoard = () => {
	const board = ["", "", "", "", "", "", "", "", ""];

	const markBoard = (number, player) => {
		if (board[number] === "") {
			board[number] = player;
			return true;
		} else {
			console.log("INVALID MOVE");
			return false;
		}
	};

	const getBoard = () => board;

	const printBoard = () => {
		const actualBoard = [];
		for (let i = 0; i < 3; i++) {
			const start = i * 3;
			const end = (i + 1) * 3;
			actualBoard.push(board.slice(start, end));
		}
		return actualBoard;
	};

	return {
		getBoard,
		markBoard,
		printBoard,
	};
};

const GameFlow = (playerOneName = "Player X", playerTwoName = "Player O") => {
	const board = GameBoard();

	const players = [
		{
			name: playerOneName,
			mark: "X",
			markSpaces: [],
		},
		{
			name: playerTwoName,
			mark: "O",
			markSpaces: [],
		},
	];

	let activePlayer = players[0];

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	// const checkWin = () => {
	// };

	// [0, 1, 2], // Row 1
	// [3, 4, 5], // Row 2
	// [6, 7, 8], // Row 3
	// [0, 3, 6], // Column 1
	// [1, 4, 7], // Column 2
	// [2, 5, 8], // Column 3
	// [0, 4, 8], // Diagonal 1
	// [2, 4, 6], // Diagonal 2

	const printNewRound = () => {
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	const playRound = (number) => {
		const player = getActivePlayer();
		const moveWasSuccessful = board.markBoard(number, player.mark);
		if (moveWasSuccessful) {
			switchPlayerTurn();
			console.log(board.printBoard());
			printNewRound();
		} else {
			console.log("RETRY");
			console.log(board.printBoard());
			printNewRound();
		}
	};

	return {
		playRound,
		getActivePlayer,
		printNewRound,
	};
};

const game = GameFlow();
