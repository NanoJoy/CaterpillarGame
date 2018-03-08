function Boingbug(game, x, y, dialogueController) {
    var boxShown = false;

    this.sprite = game.groups.boingbugs.create(x, y, "boing");
    this.sprite.x += this.sprite.width / 2;
    this.sprite.anchor.setTo(0.5, 0);
    this.sprite.animations.add('shimmy', [0, 1], 8, true);
    this.sprite.play('shimmy');

    var pressBSprite = game.add.sprite(x, y - 50, "press_b");
    game.world.bringToTop(pressBSprite);
    pressBSprite.alpha = 0.7;
    pressBSprite.visible = false;

    this.textbox = { showing: false };
    dialogueController.gameObject = this;

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity = game.gravityLevel * -1;

    this.update = function () {
        pressBSprite.visible = false;
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function (boingbugSprite, playerSprite) {
            if (!this.textbox.showing) {
                pressBSprite.visible = true;
            }
            if (!this.textbox.showing && (dialogueController.nextIsForced(game) || game.keys.boingbugKey.isDown)) {
                var dialogue = dialogueController.getNextDialogue(game);
                if (dialogue !== DIALOGUE_DONE) {
                    game.sound.play("boingbug");
                    this.textbox = new ResponseBox(game, dialogue, this);
                    boxShown = true;
                }
            }
        }, null, this);
        if (this.sprite.scale.x === 1 && Snail.getSpriteCenter(this.sprite).x < Snail.getSpriteCenter(game.snail.sprite).x) {
            this.sprite.scale.x *= -1;
        } else if (this.sprite.scale.x === -1 && Snail.getSpriteCenter(this.sprite).x > Snail.getSpriteCenter(game.snail.sprite).x) {
            this.sprite.scale.x *= -1;
        }
    };
    this.boxDone = function () {
        boxShown = true;
        this.textbox.showing = false;
    };
}