function Leaf(game, mapChanges, x, y, key, pointer) {
    this.sprite = game.groups.leaves.create(x * 50 + 5, y * 50, key);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    this.pointer = pointer;
    this.update = function () {
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function (leafSprite, playerSprite) {
            var cocAnim = null;
            playerSprite.destroy();
            game.snail.sprite = game.add.sprite(leafSprite.x - 6, leafSprite.y + 20, spriteKeys.enteringDoor);
            cocAnim = game.snail.sprite.animations.add("make");
            game.snail.sprite.play("make", 4, false);
            game.add.tween(game.snail.sprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            cocAnim.onComplete.addOnce(function () {
                betweenLevelInfo = new BetweenLevelInfo(mapChanges, game.snail.keysHad, game.snail.lichenCount, game.snail.powerups);
                Snail.areaNumber = this.pointer;
                if (Snail.loadedMusics.indexOf(Snail.cleanMap.musics[Snail.areaNumber]) === -1) {
                    game.state.start("Midload");
                } else {
                    game.state.start("Game");
                }
            }, this);
            game.snail.alive = false;
            delete this.update;
        }, function (leafSprite, playerSprite) {
            return game.snail.touchingGround && game.cursors.down.isDown;
        }, this);
    };
}