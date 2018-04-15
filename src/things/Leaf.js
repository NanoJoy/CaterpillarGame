function Leaf(game, mapChanges, x, y, key, pointer) {
    this.sprite = game.groups.leaves.create(x, y, key);
    game.physics.arcade.enable(this.sprite);
    this.sprite.animations.add('shine', Snail.makeAnimationArray(0, 9, false));
    this.sprite.animations.play('shine', 8, true);
    game.add.tween(this.sprite).to({ y: this.sprite.y + 5 }, 300, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    this.pointer = pointer;
    this.update = function () {
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function (leafSprite, playerSprite) {
            var oldY = playerSprite.y;
            var oldX = playerSprite.x;
            var cocAnim = null;
            playerSprite.destroy();
            game.snail.sprite = game.add.sprite(oldX, oldY - 20, "coccoon");
            cocAnim = game.snail.sprite.animations.add("make");
            game.snail.sprite.play("make", 20, false);
            if (game.snail.direction === "left") {
                game.snail.sprite.x += game.snail.sprite.width;
                game.snail.sprite.scale.setTo(-1, 1);
            }
            cocAnim.onComplete.addOnce(function () {
                betweenLevelInfo = new BetweenLevelInfo(mapChanges, game.snail.keysHad, game.snail.lichenCount, game.snail.powerups);
                Snail.areaNumber = this.pointer;
                if (Snail.loadedMusics.indexOf(Snail.cleanMap.musics[Snail.areaNumber]) === -1) {
                    game.state.start("Midload");
                } else {
                    game.state.start("Game");
                }
            }, this);
            game.sound.play("leaf");
            game.snail.alive = false;
            this.sprite.destroy();
            delete this.update;
        }, null, this);
    };
}