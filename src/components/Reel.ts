import Context from "../context/Context";
import SlotSymbol from "./SlotSymbol";

class Reel extends Phaser.Group {
  public static get LENGTH(): number { return 18; }

  private symbols: SlotSymbol[];
  private prevSpinPart: number[] = [];

  constructor() {
    super(Context.game);

    this.prevSpinPart = new Array(3).fill(1).map(() => Phaser.Math.between(1, 6));
    this.symbols = this.createSymbols();
  }

  /**
   * Flush the reel state and remembers the previous reel state to fine showing next
   */
  public reset(randomizer: number = -1) {
      this.prevSpinPart = this.symbols.slice(0, 3).map(v => v.index);

      this.removeChildren();
      this.symbols = [];
      this.symbols = this.createSymbols(randomizer);
  }

  /**
   * Returns current state of the symbol id
   */
  public get current(): number {
    return this.symbols[1].index;
  }

  /**
   * Create and add the new symbols to the reel
   * @private
   */
  private createSymbols(randomizer: number = -1): SlotSymbol[] {
    let newIdsArr = new Array(Reel.LENGTH).fill(1).map(() => Phaser.Math.between(1, 6));

    if (this.prevSpinPart.length !== 0) {
      newIdsArr = newIdsArr.concat(this.prevSpinPart);
    }

    if (randomizer !== -1) {
      newIdsArr[1] = randomizer;
    }

    return newIdsArr.map((id,index) => {
      const symbol = new SlotSymbol(id);
      symbol.x = 0;
      symbol.y = index * SlotSymbol.HEIGHT;
      this.addChild(symbol);
      return symbol;
    });
  }
}

export default Reel;