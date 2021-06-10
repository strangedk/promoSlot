import Context from "../context/Context";
import SlotSymbol from "./SlotSymbol";
import Reel from "./Reel";

class Slot extends Phaser.Group {
  public static get GRID_SIZE(): number {
    return 3;
  };

  private readonly maskWidth: number = 0;
  private readonly maskHeight: number = 0;

  private readonly reels: Reel[];

  constructor(private onComplete: (isWin: boolean) => void) {
    super(Context.game);

    this.maskWidth = SlotSymbol.WIDTH * Slot.GRID_SIZE;
    this.maskHeight = SlotSymbol.HEIGHT * Slot.GRID_SIZE;

    // You can also disable mask to see how it's working under hood
    this.setMask();

    this.reels = this.createReels();
    this.reset();
  }

  /**
   * The public method
   * @param reelIndex
   */
  public spin() {
    let reelIndex = 0;
    let intervalId = 0;

    intervalId = window.setInterval(() => {
      if (reelIndex === Slot.GRID_SIZE)
        clearInterval(intervalId);
      else
        this.spinReel(reelIndex++);
    }, 450);
  }

  /**
   * Restore the reels positions and reset the symbol state
   * @param changeSymbols define that symbols is will be still in the same condition or not
   */
  public reset() {
    let randomizer = -1;
    if (Math.random() > Context.randomizer) {
      randomizer = Phaser.Math.between(1,6);
    }

    this.reels.forEach(reel => {
      reel.y = (-reel.height) + this.maskHeight;
      reel.reset(randomizer);
    });
  }

  /**
   * One reel spin event
   * @param index of reel
   * @private
   */
  private spinReel(index: number) {
    const tween = this.game.add.tween(this.reels[index]).to({y: 16}, 1300, Phaser.Easing.Power0, true, 500, 0, false);

    if (index === Slot.GRID_SIZE - 1)
      tween.onComplete.add(() => this.complete());
  }

  /**
   * All spins complete event
   * @private
   */
  private complete() {
    const currents = this.getCurrents();
    const [first,v2,v3] = currents;

    const isWin = currents.filter(v => v === first).length === Slot.GRID_SIZE;
    this.onComplete(isWin);

    this.reset();
  }

  /**
   * Create and return new reels with
   * @private
   */
  private createReels() {
    return new Array(Slot.GRID_SIZE).fill(1).map((v, i) => {
      const reel = new Reel();
      reel.x = i * (SlotSymbol.WIDTH + 10);
      reel.y = (-reel.height) + this.maskHeight;
      this.addChild(reel);
      return reel;
    });
  }

  /**
   * Just to crop visible area and avoid to see all reel spinnings
   * @private
   */
  private setMask() {
    const mask = new Phaser.Graphics(this.game);
    mask.beginFill(0xff0000);
    mask.drawRect(0, 0, this.maskWidth * 2, this.maskHeight);
    mask.endFill();
    this.addChild(mask);
    this.mask = mask;
  }

  private getCurrents(): number[] {
    const {reels} = this;
    return [reels[0].current, reels[1].current, reels[2].current];
  }
}

export default Slot;