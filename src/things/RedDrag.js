function RedDrag(game, x, y, direction) {
        var SPEED_X = 100;
        var MAX_Y = 150;
        var INC_Y = 10;
        this.sprite = game.groups.redDrags.create(x * 50, y * 50, "red_drag");
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = game.gravityLevel * -1;
        var animationArray = direction === "right" ? [4, 5, 6, 7] : [0, 1, 2, 3];
        this.sprite.animations.add("fly", animationArray, 7, true);
        this.sprite.play("fly");
        this.activated = false;
        this.blockedUp = false;
        this.done = false;
        this.direction = direction;

        this.update = function() {
            if (this.activated) {
                var touchingGround = false;
                game.physics.arcade.collide(this.sprite, game.groups.grounds, function (redDragSprite, groundSprite) {
                    touchingGround = true;
                }, null, this);
                this.blockedUp = this.sprite.body.touching.up;
                if ((this.sprite.body.touching.right || this.sprite.body.touching.left) && touchingGround) {
                    this.activated = false;
                    game.snail.curRedDrag = null;
                    this.done = true;
                    var destinationX = this.direction == "right" ? game.getLevelWidth() : -1 * this.sprite.width;
                    game.add.tween(this.sprite).to({ y: -100, x: destinationX }, 2000, Phaser.Easing.Linear.None, true, 0);
                }
            }
        };

        this.flyAway = function () {};
    }