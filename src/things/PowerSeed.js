function PowerSeed(game, x, y, name, location, description, keyCounters, map, areaNumber, fileMap) {
    this.sprite = game.groups.powerups.create(x, y, spriteKeys.powerSeed);
    this.sprite.x += 25 - this.sprite.width / 2;
    this.sprite.y += 25 - this.sprite.height / 2;
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    this.sprite.body.immovable = true;
    this.sprite.animations.add('glimmer', Snail.makeAnimationArray(0, 2, false), 10, true);
    this.sprite.play('glimmer');
    this.location = location;
    var textbox = null;
    var textboxShown = false;

    this.update = function () {
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function (powerupSprite, snailSprite) {
            if (!textboxShown) {
                switch (name) {
                    case 'hide':
                        game.snail.hiding.canHide = true;
                        break;
                    case 'shoot':
                        game.snail.shooting.canShoot = true;
                        keyCounters.ammo = new CountDisplay(game, 90, 10, "flower_bullet", 0);
                        break;
                    case "pull":
                        game.snail.canPull = true;
                        break;
                }
                game.snail.powerups.push(name);
                console.log(game.snail.powerups);
                game.snail.tempPowerups.push(name);
                SaveData.powerups.push(name);
                this.sprite.destroy();
                Snail.removeFromLevel(map, areaNumber, this, fileMap);
                var tree = new DialogueTree(description, [new DialogueOption("Ok.", DIALOGUE_DONE)]);
                textbox = new ResponseBox(game, tree, this);
                textboxShown = true;
                game.sound.play("powerup");
            }
        }, null, this);
        this.boxDone = function (a) {
        };
    };
}