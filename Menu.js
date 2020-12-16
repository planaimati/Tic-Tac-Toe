class Menu {
  constructor(newGameButton) {
    this.newGameButton = newGameButton;
    this.newGameFunc = this.newGameFunc;
  }

  init = () => {
    this.addListeners();
    console.log(this.newGameFunc);
  };

  addListeners = () => {
    this.newGameButton.addEventListener("click", () => this.newGame());
  };

  newGame = () => {
    this.newGameFunc();
  };
}
