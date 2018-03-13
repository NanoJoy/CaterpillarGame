function Lichen(game, x, y, map, areaNumber, fileMap) {
    this.sprite = game.add.sprite(x * 50, y * 50, spriteKeys.lichen);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    this.location = [y, x];
    this.counter = null;
    this.update = function() {
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function (lichenSprite, playerSprite) {
            lichenSprite.destroy();
            game.snail.lichenCount += 1;
            Snail.removeFromLevel(map, areaNumber, this, fileMap)
            this.counter.increase();
        }, null, this);
    }
}