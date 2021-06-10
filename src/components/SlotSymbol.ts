import Context from "../context/Context";

class SlotSymbol extends Phaser.Group {
  public static get WIDTH(): number { return 70; };
  public static get HEIGHT(): number { return 100; };

  constructor(private _index: number) {
    super(Context.game);

    const {game} = this;

    const sprite = new Phaser.Sprite(game, 0, 0, 'slotSymbols', `${_index}.png`);
    sprite.scale.set(0.7, 0.7);
    this.addChild(sprite);
  }

  public get index(): number {
    return this._index;
  }
}

export default SlotSymbol;