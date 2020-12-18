class Game {
  constructor() {
    this.board = new Board(
      document.querySelector(".board"),
      document.querySelector(".player"),
      document.querySelector(".winnerInfo"),
      document.querySelector(".newGame")
    );
  }

  init = () => {
    this.board.init();
  };
}
