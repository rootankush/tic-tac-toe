const GameBoard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];

	const markBoard = (number, player) => {
		if (board[number] === "") {
			board[number] = player;
			return true;
		} else {
			console.log("INVALID MOVE");
			return false;
		}
	};

	const checkWin = () => {
		if (
			(board[0] === "X" && board[1] === "X" && board[2] === "X") ||
			(board[3] === "X" && board[4] === "X" && board[5] === "X") ||
			(board[6] === "X" && board[7] === "X" && board[8] === "X") ||
			(board[0] === "X" && board[3] === "X" && board[6] === "X") ||
			(board[1] === "X" && board[4] === "X" && board[7] === "X") ||
			(board[2] === "X" && board[5] === "X" && board[8] === "X") ||
			(board[0] === "X" && board[4] === "X" && board[8] === "X") ||
			(board[2] === "X" && board[4] === "X" && board[6] === "X")
		) {
			return "X";
		}

		if (
			(board[0] === "O" && board[1] === "O" && board[2] === "O") ||
			(board[3] === "O" && board[4] === "O" && board[5] === "O") ||
			(board[6] === "O" && board[7] === "O" && board[8] === "O") ||
			(board[0] === "O" && board[3] === "O" && board[6] === "O") ||
			(board[1] === "O" && board[4] === "O" && board[7] === "O") ||
			(board[2] === "O" && board[5] === "O" && board[8] === "O") ||
			(board[0] === "O" && board[4] === "O" && board[8] === "O") ||
			(board[2] === "O" && board[4] === "O" && board[6] === "O")
		) {
			return "O";
		}

		return null;
	};

	const isFullBoard = () => {
		return !board.includes("") && true;
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

	const resetGame = () => {
		board = ["", "", "", "", "", "", "", "", ""];
	};

	return {
		getBoard,
		isFullBoard,
		checkWin,
		markBoard,
		printBoard,
		resetGame,
	};
})();

const GameFlow = ((playerOneName = "Player X", playerTwoName = "Player O") => {
	// Add function to set names
	// Done with console game
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
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	const playRound = (number) => {
		const player = getActivePlayer();
		const moveWasSuccessful = GameBoard.markBoard(number, player.mark);
		if (moveWasSuccessful) {
			const winner = GameBoard.checkWin();
			if (winner === "X") {
				console.log("X wins");
				console.log(GameBoard.printBoard());
				console.log("Type GameBoard.resetGame() ");
			} else if (winner === "O") {
				console.log("O wins");
				console.log(GameBoard.printBoard());
				console.log("Type GameBoard.resetGame() ");
			} else {
				if (GameBoard.isFullBoard()) {
					console.log("Draw");
					console.log(GameBoard.printBoard());
					console.log("Type GameBoard.resetGame() ");
				} else {
					switchPlayerTurn();
					console.log(GameBoard.printBoard());
					printNewRound();
				}
			}
		} else {
			console.log("RETRY");
			console.log(GameBoard.printBoard());
			printNewRound();
		}
	};

	return {
		playRound,
		getActivePlayer,
		printNewRound,
	};
})();

const ScreenController = (() => {
	const boardDiv = document.querySelector("#gameBoard");
	const turnText = document.querySelector(".turnText");
	const buttonBar = document.querySelector("#buttonBar");
	const winningAudio = new Audio("./assets/audio/winning.mp3");
	const checkMarkAudio = new Audio("./assets/audio/check_mark.mp3");

	const controlButton = document.createElement("button");
	controlButton.classList.add("controlButton");
	controlButton.textContent = "New";
	buttonBar.appendChild(controlButton);

	const updateScreen = () => {
		boardDiv.textContent = "";

		const board = GameBoard.getBoard();
		const activePlayer = GameFlow.getActivePlayer();

		turnText.textContent = `${activePlayer.name}'s turn`;

		// This is displaying the board correctly
		board.forEach((mark, number) => {
			const gameBoardButton = document.createElement("button");
			gameBoardButton.classList.add("gameBoardButton");
			gameBoardButton.dataset.index = number;
			gameBoardButton.textContent = mark;
			boardDiv.appendChild(gameBoardButton);
		});

		if (GameBoard.checkWin() === "X" || GameBoard.checkWin() === "O") {
			turnText.textContent = `${activePlayer.name} Won`;
			winningAudio.play();
			boardDiv.style.pointerEvents = "none";
		} else if (GameBoard.isFullBoard()) {
			turnText.textContent = `Its a Draw`;
		}
	};

	const clickHandlerBoard = (e) => {
		const selectedButton = e.target.dataset.index;
		if (!selectedButton) return;

		GameFlow.playRound(selectedButton);
		checkMarkAudio.play();
		updateScreen();
	};
	boardDiv.addEventListener("click", clickHandlerBoard);
	controlButton.addEventListener("click", () => {
		GameBoard.resetGame();
		boardDiv.style.pointerEvents = "auto";
		updateScreen();
	});
	// make a reset button

	updateScreen();

	return {
		updateScreen,
		clickHandlerBoard,
	};
})();

ScreenController();
