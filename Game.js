class Game {
  constructor() {
    this.board = new Board(
      document.querySelector(".board"),
      document.querySelector(".player"),
      document.querySelector(".winnerInfo")
    );
    this.menu = new Menu(document.querySelector(".newGame"));
  }

  init = () => {
    this.board.init();
    this.menu.init();
  };
}
