/// <reference path="./../node_modules/@azerion/phaser/typescript/p2.d.ts" />
/// <reference path="./../node_modules/@azerion/phaser/typescript/phaser.d.ts" />
/// <reference path="./../node_modules/@azerion/phaser/typescript/phaser.comments.d.ts" />

import * as PIXI from 'pixi.js'
(window as any).p2 = require('@azerion/phaser/build/custom/p2');
(window as any).Phaser = require('@azerion/phaser/build/phaser');
console.log(PIXI); // To avoid pixi

import SlotGame from "./SlotGame";

const [width, height] = [500, 500];

// TODO: Step 1: Make sure that you preload this assets and it was successful before creating new SlotGame().
const preload = () => {
  game.load.atlas('slotSymbols', 'assets/slotGame/atlas.png', 'assets/slotGame/atlas.json');
  game.load.image('spinButton', 'assets/slotGame/button_down.png');
  game.load.image('foreground', 'assets/slotGame/slot1.png');
}

const create = () => {
  const group = game.add.group();

  // TODO: Step 2: Whole slot game module is here. Also you can catch the win state
  // TODO: Second parameter randomizer is between 0 and 1 where 0 is all time win and 1 is never win
  const slotGame = new SlotGame(game, 0.5, isWin => console.log('Win?: ', isWin));
  slotGame.x = 140;
  slotGame.y = 140;
  group.addChild(slotGame);

}

const update = () => { }

const state = { preload, create, update, };
const game = new Phaser.Game(width, height, Phaser.AUTO, '', state);