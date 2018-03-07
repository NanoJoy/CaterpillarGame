function Ground(game, x, y, key, type) {
    if (type !== 'clear') {
        this.sprite = game["groups"].grounds.create(x, y, key);
    } else {
        this.sprite = game["groups"].cleargrounds.create(x, y, key);
    }
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    if (type === 'nodown' || type === 'noboth') {
        this.sprite.body.checkCollision.up = false;
    }
    if (type === 'noup' || type === 'noboth') {
        this.sprite.body.checkCollision.down = false;
    }
}