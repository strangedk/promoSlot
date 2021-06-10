import Context from "./context/Context";
import Slot from "./components/Slot";
import WinText from "./components/WinText";

class SlotGame extends Phaser.Group {
  private readonly background: Phaser.Graphics;
  private readonly slot: Slot;
  private readonly foreground: Phaser.Sprite;
  private readonly spinButton: Phaser.Sprite;
  private readonly winText: WinText;

  constructor(game: Phaser.Game, randomizer: number = 0.5, private onComplete: (isWin: boolean) => void = () => {}) {
    super(game);

    Context.setGame(game);
    Context.setRandomizer(randomizer);

    this.background = this.createBackground();
    this.slot = this.createSlot();
    this.foreground = this.createForeground();
    this.spinButton = this.createButton();
    this.winText = this.createWinText();

    this.addChild(this.background);
    this.addChild(this.slot);
    this.addChild(this.foreground);
    this.addChild(this.spinButton);
    this.addChild(this.winText);
  }

  private onCompleteHandler(isWin: boolean): void {
    this.onComplete && this.onComplete(isWin);

    this.winText.show(isWin);
    this.spinButton.inputEnabled = true;
    this.spinButton.tint = 0xffffff;
  }

  // region #Creators
  private createBackground(): Phaser.Graphics {
    const background = new Phaser.Graphics(Context.game);
    background.beginFill(0xffffff);
    background.drawRect(-50,-20,300,210);
    background.endFill();
    return background;
  }

  private createSlot(): Slot {
    const slot = new Slot((isWin) => {
      this.onCompleteHandler(isWin);
    });

    slot.position.set(-20, -80)
    return slot;
  }

  private createForeground(): Phaser.Sprite {
    const fg = new Phaser.Sprite(Context.game, 0, 0, 'foreground');
    fg.scale.set(0.6, 0.6);
    fg.anchor.set(0.5, 0.5);
    fg.position.set(110, 90)
    return fg;
  }

  private createButton(): Phaser.Sprite {
    const button = new Phaser.Sprite(Context.game, 0, 0, 'spinButton');
    button.scale.set(0.5, 0.5);
    button.anchor.set(0.5, 0.5);
    button.position.set(100, 196);
    button.inputEnabled = true;
    button.events.onInputDown.add(() => {
      this.spinButton.inputEnabled = false;
      this.spinButton.tint = 0x888888;

      this.winText.hide();
      this.slot.spin();
    });
    return button;
  }

  private createWinText(): WinText {
    const winText = new WinText();
    winText.x = -40;
    winText.y = -22;
    return winText;
  }
  // endregion
}

export default SlotGame;