function Water(game, x, y, spriteKey, above) {
    var frameRate = 5;
    this.type = '';
    this.sprite = game.groups.waters.create(x * 50, y * 50, spriteKey);
    this.sprite.alpha = 0.6;
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    switch (above) {
        case '_':
            this.type = 'BRIDGE';
            this.sprite.animations.add('move', [0, 1, 2, 3], frameRate, true);
            this.sprite.play('move');
            this.sprite.body.checkCollision.down = false;
            this.sprite.body.checkCollision.right = false;
            this.sprite.body.checkCollision.left = false;
            break;
        case 'w':
            this.type = 'MIDDLE';
            this.sprite.frame = 4;
            break;
        default:
            this.type = 'TOP';
            this.sprite.animations.add('move', [0, 1, 2, 3], frameRate, true);
            this.sprite.play('move');
            break;
    }
    this.playerTouch = function (playerSprite, waterSprite) {
        var COVERED = 0.6;
        var DRAG = -0.02;
        var ACCELERATION = 5;
        var JUMP_CUTOFF = 2;
        if (playerSprite.bottom > waterSprite.y + (playerSprite.height * COVERED)) {
            if (!game.snail.water.inWater) {
                game.snail.water.inWater = true;
                game.snail.water.entrySpeed = Math.abs(game.snail.sprite.body.velocity.y);
                game.sound.play("water", game.snail.water.entrySpeed / 300);
            }
            game.snail.sprite.body.velocity.y -= ACCELERATION;
            game.snail.sprite.body.velocity.y += DRAG * game.snail.sprite.body.velocity.y;
        }
        if (game.cursors.up.isDown && playerSprite.body.velocity.y < JUMP_CUTOFF) {
            game.snail.jumping = true;
        }
        game.snail.water.wasIn = true;
    };
    this.blockTouch = function (block) {
        var COVERED = 0.6,
            DRAG = -0.02,
            ACCELERATION = 6;
        if (block.sprite.bottom > this.sprite.y + (block.sprite.height * COVERED)) {
            if (!block.water.inWater) {
                block.water.inWater = true;
                block.water.entrySpeed = block.sprite.body.velocity.y;
                game.sound.play("water", block.water.entrySpeed / 300);
            }
            block.sprite.body.velocity.y -= ACCELERATION;
            block.sprite.body.velocity.y += DRAG * block.sprite.body.velocity.y;
            block.water.wasIn = true;
        }
    }
}