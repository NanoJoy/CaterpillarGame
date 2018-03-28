function SpeedBoost(game, x, y, direction, layout) {
    this.direction = direction;
    this.amount = 0;
    this.sprite = game.groups.speedBoosts.create(x * 50, y * 50, spriteKeys.speedboost);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    this.sprite.body.immovable = true;
    var keyToAnims = {
        ground_top_1: [0, 1, 2, 3, 4],
        ground_top_2: [0, 1, 2, 3, 4],
        ground_both: [5, 6, 7, 8, 9],
        ground_top_left: [10, 11, 12, 13, 14],
        ground_top_right: [15, 16, 17, 18, 19],
        ground_both_left: [20, 21, 22, 23, 24],
        ground_both_right: [25, 26, 27, 28, 29],
        ground_top_both: [30, 31, 32, 33, 34],
        ground_both_both: [35, 36, 37, 38, 39]
    };
    var key = Snail.getGroundKey(x, y, layout);
    if (direction === "left") {
        this.sprite.scale.x = -1;
        this.sprite.x -= this.sprite.width;
        key = key.replace("left", "right");
    }
    this.sprite.animations.add("move", keyToAnims[key], 10, true);
    this.sprite.play("move");
}