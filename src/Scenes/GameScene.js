/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }


  create() {
    const background = this.add.image(400, 256, 'background');
    background.setScale(1.6);

    // player
    this.speed = 160;
    this.jump = 330;
    this.player = this.physics.add.sprite(100, 450, 'hero', 'stance');
    this.player.setBounce(0);// 0.2
    this.player.setCollideWorldBounds(true);
    this.hp = 100;
    this.hpText = this.add.text(350, 16, 'Hp: 100', { fontSize: '32px', fill: '#f00' });

    this.coins = this.physics.add.group();
    for (let i = 0; i < 12; i += 1) {
      const coin = this.coins.create(60 + i * 60, 120 + Math.random() * 200, 'coin', 'coin1');
      coin.setCollideWorldBounds(true);
    }

    // scores
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

    // Bombs
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    // fireball
    // this.fireball = this.physics.add.sprite(100, 450, 'fireball', 'fire1');
    this.fireball = this.physics.add.staticSprite(100, 475, 'fireball', 'fire1');

    this.fireball.disableBody(true, true);

    this.fireball.on('animationcomplete', () => {
      this.fireball.disableBody(true, true);
    });
    this.physics.add.collider(this.fireball, this.bombs, this.burnBomb, null, this);
    this.power = 0;
    this.powerText = this.add.text(500, 16, 'Power: 0', { fontSize: '45px', fill: '#000' });
    this.fireball.anims.create({
      key: 'shoot',
      frames: [
        {
          key: 'fireball',
          frame: 'fire1',
        },
        {
          key: 'fireball',
          frame: 'fire2',
        },
        {
          key: 'fireball',
          frame: 'fire3',
        },
        {
          key: 'fireball',
          frame: 'fire4',
        },
        {
          key: 'fireball',
          frame: 'fire5',
        },
        {
          key: 'fireball',
          frame: 'fire6',
        },
        {
          key: 'fireball',
          frame: 'fire7',
        },
        {
          key: 'fireball',
          frame: 'fire8',
        },
        {
          key: 'fireball',
          frame: 'fire9',
        },
        {
          key: 'fireball',
          frame: 'fire10',
        },
        {
          key: 'fireball',
          frame: 'fire11',
        },
        {
          key: 'fireball',
          frame: 'fire12',
        },
        {
          key: 'fireball',
          frame: 'fire13',
        },
        {
          key: 'fireball',
          frame: 'fire14',
        },
      ],
      frameRate: 5,
      repeat: 1,
    });

    this.player.anims.create({
      key: 'left',
      frames: [
        {
          key: 'hero',
          frame: 'run1',
        },
        {
          key: 'hero',
          frame: 'run2',
        },
        {
          key: 'hero',
          frame: 'run3',
        },
        {
          key: 'hero',
          frame: 'run4',
        },
        {
          key: 'hero',
          frame: 'run5',
        },
        {
          key: 'hero',
          frame: 'run6',
        },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.player.anims.create({
      key: 'right',
      frames: [
        {
          key: 'hero',
          frame: 'run1',
        },
        {
          key: 'hero',
          frame: 'run2',
        },
        {
          key: 'hero',
          frame: 'run3',
        },
        {
          key: 'hero',
          frame: 'run4',
        },
        {
          key: 'hero',
          frame: 'run5',
        },
        {
          key: 'hero',
          frame: 'run6',
        },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.player.anims.create({
      key: 'turn',
      frames: [
        {
          key: 'hero',
          frame: 'stance',
        },
      ],
      frameRate: 20,
    });
    this.player.body.setGravityY(300);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', this.shootFire, this);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-1 * this.speed);// -160
      this.player.flipX = true;
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.speed);// 160
      this.player.flipX = false;
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && (this.player.body.onFloor())) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-1 * this.speed);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.speed);
      }
      this.player.setVelocityY(-1 * this.jump);// -330
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.coins.countActive(true) === 0) {
      this.power += 1;

      this.powerText.setText(`Power: ${this.power}`);
      if (this.speed < 400) {
        this.speed += 40;
      }
      if (this.jump < 540) {
        this.jump += 30;
      }
      this.coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
      // creating bombs

      const bomb = this.bombs.create(800, 500, 'bomb', 'bomb1');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(-150, -200);
    }
  }

  hitBomb(player, bomb) {
    this.score = this.score >= 20 ? this.score - 20 : 0;
    bomb.destroy();
    this.scoreText.setText(`Score: ${this.score}`);
    this.hp = this.hp > 12 ? this.hp - 12 : 0;
    this.hpText.setText(`Hp: ${this.hp}`);
    if (this.hp === 0) {
      this.gameOver();
    }
  }

  shootFire(event) {
    if (this.power < 3 || event.code !== 'Space') {
      return;
    }

    this.power -= 3;
    this.powerText.setText(`Power: ${this.power}`);
    const x = this.player.flipX ? -100 : 100;
    this.fireball.flipX = this.player.flipX;
    this.fireball.enableBody(true, this.player.x + x, 475, true, true);
    this.fireball.anims.play('shoot', true);
  }

  burnBomb(fire, bomb) {
    bomb.destroy();
  }

  gameOver() {
    this.physics.pause();
    this.add.text(400, 250, 'Game Over', { fontSize: '70px', fill: '#f00' });
    this.scene.start('Title');
  }
}