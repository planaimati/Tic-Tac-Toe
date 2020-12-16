class Board {
  constructor(boardContainer, player, winner) {
    this.boardContainer = boardContainer;
    this.player = player;
    this.winner = winner;
  }

  board = [];
  player1 = true;
  player2 = false;
  xd = ["kółko", "krzyżyk"];
  actualPlayer;

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
    this.createBoard();
    this.displayBoard();
    this.pickPlayer();
    this.setPlayerInfo();
  };

  createBoard = () => {
    for (let i = 0; i < 9; i++) {
      const item = {
        id: i,
        value: "",
      };
      this.board.push(item);
    }
  };

  pickPlayer = () => {
    const player = this.xd[Math.floor(Math.random() * this.xd.length)];

    this.actualPlayer = player;
  };

  setPlayerInfo = () => {
    this.player.innerText = this.actualPlayer;
  };

  setWinner = () => {
    this.winner.innerText = `winner is ${this.actualPlayer}`;
    this.player.style.display = "none";
  };

  clearBoard = () => {
    const boardItem = document.querySelectorAll("i");
    this.board.map((item) => {
      item.value = "";
    });
    boardItem.forEach((item) => {
      item.classList.remove("far", "fa-circle", "fas", "fa-times");
    });
  };

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
        console.log(`winner is ${this.actualPlayer}`);
        this.setWinner();
      } else if (
        this.board[item[0]].value !== this.actualPlayer &&
        this.board[item[0]].value !== "" &&
        this.board[item[1]].value !== this.actualPlayer &&
        this.board[item[1]].value !== "" &&
        this.board[item[2]].value !== this.actualPlayer &&
        this.board[item[2]].value !== ""
      ) {
        console.log("remis");
      }
    });
    // if (
    //   this.board[0].value === this.board[1].value &&
    //   this.board[0].value === this.board[2].value &&
    //   this.board[2].value !== ""
    // ) {
    //   console.log(` ${this.player1 ? "player1" : "player2"} wygrał`);
    //   this.clearBoard();
    //   return;
    // } else if (
    //   this.board[3].value === this.board[4].value &&
    //   this.board[3].value === this.board[5].value &&
    //   this.board[5].value !== ""
    // ) {
    //   console.log(` ${this.player1 ? "player1" : "player2"} wygrał`);
    //   return;
    // } else if (
    //   this.board[6].value === this.board[7].value &&
    //   this.board[6].value === this.board[8].value &&
    //   this.board[8].value !== ""
    // ) {
    //   console.log(` ${this.player1 ? "player1" : "player2"} wygrał`);
    //   return;
    // } else if (
    //   this.board[0].value === this.board[4].value &&
    //   this.board[0].value === this.board[8].value &&
    //   this.board[8].value !== ""
    // ) {
    //   console.log(` ${this.player1 ? "player1" : "player2"} wygrał`);
    //   return;
    // } else if (
    //   this.board[2].value === this.board[4].value &&
    //   this.board[2].value === this.board[6].value &&
    //   this.board[6].value !== ""
    // ) {
    //   console.log(` ${this.player1 ? "player1" : "player2"} wygrał`);
    //   return;
    // } else {
    // }
  };

  addSign = (x, index) => {
    const boardItem = document.querySelectorAll("i");
    this.board.map((item) => {
      if (item.id === index && item.value === "") {
        item.value = this.player1 ? "kółko" : "krzyżyk";

        if (item.value === "kółko") {
          boardItem[index].classList.add("far", "fa-circle");
        } else if (item.value === "krzyżyk") {
          boardItem[index].classList.add("fas", "fa-times");
        }
      }
    });
    this.checkWinner();
    this.player1 = !this.player1;
    this.actualPlayer = this.player1 ? "kółko" : "krzyżyk";
    this.setPlayerInfo();
  };

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
