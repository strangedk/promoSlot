import Context from "../context/Context";

class WinText extends Phaser.Group {
  private readonly winText: Phaser.Text;
  private readonly loseText: Phaser.Text;
  constructor() {
    super(Context.game);

    const style = {
      fontWeight: 'bold',
      fontSize: 60,
      fill: 'white',
      stroke: 'gray',
      strokeThickness: 5,
    }

    this.winText = new Phaser.Text(Context.game, 0, 0, 'You Win!', style);
    this.loseText = new Phaser.Text(Context.game, 0, 0, 'You Lose!', style);

    this.winText.position.set(16, 0);

    this.addChild(this.winText);
    this.addChild(this.loseText);

    this.hide();
  }

  public show(isWin: boolean): void {
    this.winText.visible = isWin;
    this.loseText.visible = !isWin;
  }

  public hide(): void {
    this.winText.visible = this.loseText.visible = false;
  }
}

export default WinText;