/* eslint-disable no-undef */
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);


    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);

    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}
// V6ByhikkkxTfvvLZEgMp
window.game = new Game();