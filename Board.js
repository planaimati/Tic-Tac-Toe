class Board {
  constructor(boardContainer, player, winner, newGame) {
    this.boardContainer = boardContainer;
    this.player = player;
    this.winner = winner;
    this.newGame = newGame;
  }

  board = [];
  player1 = {
    name: "",
    moves: 0,
    value: true,
  };
  player2 = {
    name: "",
    moves: 0,
    value: false,
  };

  movesTotal = 0;
  xd = ["kółko", "krzyżyk"];
  actualPlayer;
  win = false;
  draw = false;

  winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  init = () => {
    this.addListeners();
    this.createBoard();
    this.displayBoard();
  };

  addListeners = () => {
    this.newGame.addEventListener("click", () => this.createNewGame());
  };
  //tworzenie nowej tablicy z grą
  createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const item = {
        id: i,
        value: "",
      };
      this.board.push(item);
    }
  };
  //tworzenie nowej gry po kliknięciu przycisku 'nowa gra'
  createNewGame = () => {
    this.board = [];
    this.clearBoard();
    this.createBoard();
    this.displayBoard();
    this.restartPlayerValues();
    this.pickPlayer();
    this.player.style.display = "block";

    if (this.win) {
      this.win = !this.win;
    } else if (this.draw) {
      this.draw = !this.draw;
    }
  };
  //reset statystyk
  restartPlayerValues = () => {
    this.player1.value = true;
    this.player2.value = false;
    this.player1.moves = 0;
    this.player2.moves = 0;
    this.movesTotal = 0;
  };
  // losowy wybór gracza
  pickPlayer = () => {
    const player = this.xd[Math.floor(Math.random() * this.xd.length)];
    this.actualPlayer = player;
  };
  setPlayerInfo = () => {
    this.player.innerText = this.actualPlayer;
  };
  //wyświetlanie info na temat wygranego
  setWinner = () => {
    console.log(this.player1.moves);
    this.win = true;
    this.player.style.display = "none";
    if (this.actualPlayer === "kółko") {
      this.winner.innerText = `wygrał gracz ${this.actualPlayer} w ${this.player1.moves} ruchach`;
    } else if (this.actualPlayer === "krzyżyk") {
      this.winner.innerText = `wygrał gracz ${this.actualPlayer} w ${this.player2.moves} ruchach`;
    }
  };
  //czyszczenie tablicy z poprzedniej gry
  clearBoard = () => {
    const xd = document.querySelectorAll(".boardItem");

    xd.forEach((item) => {
      item.remove();
    });

    const boardItem = document.querySelectorAll("i");
    this.board.map((item) => {
      item.value = "";
    });
    boardItem.forEach((item) => {
      item.classList.remove("far", "fa-circle", "fas", "fa-times");
    });

    this.winner.innerText = "";
    this.player.innerText = "";
  };

  //sprawdzanie wygranego
  checkWinner = () => {
    this.winningPossibilities.forEach((item) => {
      if (
        this.board[item[0]].value === this.actualPlayer &&
        this.board[item[0]].value !== "" &&
        this.board[item[1]].value === this.actualPlayer &&
        this.board[item[1]].value !== "" &&
        this.board[item[2]].value === this.actualPlayer &&
        this.board[item[2]].value !== ""
      ) {
        this.setWinner();
      }
    });
  };
  // sprawdzanie remisu
  checkDraw = () => {
    if (this.win === false && this.movesTotal === 9) {
      console.log("remis");
      this.draw = !this.draw;
      this.winner.innerText = `remis`;
      this.player.style.display = "none";
    }
  };
  // aktualizowanie statystyk gracza
  addMoveToPlayer = (actualPlayer) => {
    console.log(actualPlayer);
    if (actualPlayer === "kółko") {
      this.player1.moves++;
    } else if (actualPlayer === "krzyżyk") {
      this.player2.moves++;
    }

    this.movesTotal = this.player1.moves + this.player2.moves;

    //console.log(this.movesTotal);
  };
  //wyświetlanie znwku po kliknięciu
  addSign = (x, index) => {
    const boardItem = document.querySelectorAll("i");
    this.board.map((item) => {
      if (item.id === index && item.value === "" && this.win !== true) {
        item.value = this.player1.value ? "kółko" : "krzyżyk";

        if (item.value === "kółko") {
          boardItem[index].classList.add("far", "fa-circle");
        } else if (item.value === "krzyżyk") {
          boardItem[index].classList.add("fas", "fa-times");
        }
        this.actualPlayer = this.player1.value ? "kółko" : "krzyżyk";
        this.addMoveToPlayer(this.actualPlayer);
        this.checkWinner();

        this.player1.value = !this.player1.value;

        this.checkDraw();
        this.setPlayerInfo();
        console.log(this.player2.moves);
      }
    });
  };

  // wyświetlenie planszy gry na podstawie wcześniej utworzonej tablicy
  displayBoard = () => {
    this.board.map((item, index) => {
      const boardItem = document.createElement("div");
      const i = document.createElement("i");
      boardItem.appendChild(i);
      boardItem.addEventListener("click", (e) => this.addSign(e, index));
      boardItem.classList.add("boardItem");
      this.boardContainer.appendChild(boardItem);
    });
  };
}
