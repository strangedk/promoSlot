class Context {
  private static _game: Phaser.Game;
  private static _randomizer: number = -1;

  public static setGame(game: Phaser.Game) {
    Context._game = game;
  }

  public static get game() {
    return Context._game;
  }

  public static setRandomizer(randomizer: number) {
    Context._randomizer = randomizer;
  }

  public static get randomizer(): number {
    return Context._randomizer;
  }
}

export default Context;