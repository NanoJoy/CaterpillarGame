function StinkbugBlocker(game, x, y) {
    this.sprite = game.groups.invisibles.create(x * 50, y * 50, spriteKeys.stinkbugBlocker);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    this.sprite.body.immovable = true;
}