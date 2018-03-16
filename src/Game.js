var States = window.States || {};
var Snail = window.Snail || Initialize();

function GameState(game) {
    var TILE_SIZE = 50;
    var fileMap = null;
    var background = null;
    var midground = null;
    var snail = null;
    var cursors = null;
    var enterKey = null;
    var saveKey = null;
    var killKey = null;
    var hideKey = null;
    var muteKey = null;
    var shiftKey = null;
    var shootKey = null;
    var dropKey = null;
    var boingbugKey = null;
    var pauseKey = null;
    var music = null;
    var musicThing = null;
    var keyCounters = {
        yellow: null,
        blue: null,
        ammo: null
    };
    var inputIsDown = null;
    var map = null;
    var dummyText = null;
    var music = null;
    var firstFrame = false;
    var fromSave = false;
    var fromSaveDeath = false;
    var pauseBack = null;
    var pauseText = null;
    var pauseMainMenu = null;
    var controlsDisp = null;
    var resultsDisp = null;
    var cameraBorder = null;
    var scarfHad = false;
    var startTime = 0;
    var areaNumber = 0;
    var gravityLevel = 300;
    game.gravityLevel = gravityLevel;
    var groups = {
        ammos: null,
        blocks: null,
        boingbugs: null,
        bridges: null,
        bullets: null,
        checkpoints: null,
        cleargrounds: null,
        cornerStones: null,
        decFlows: null,
        topLevel: null,
        midLevel: null,
        deers: null,
        flowers: null,
        grounds: null,
        invisibles: null,
        dragonflies: null,
        keys: null,
        leaves: null,
        locks: null,
        powerups: null,
        redDrags: null,
        rocks: null,
        scarfs: null,
        softGrounds: null,
        speedBoosts: null,
        spikess: null,
        stinkbugs: null,
        waters: null,
        worms: null
    };
    game.groups = groups;
    this.groups = groups;
    var arrays = {
        ammos: [],
        blocks: [],
        boingbugs: [],
        bullets: [],
        cornerStones: [],
        deers: [],
        flowers: [],
        invisibles: [],
        dragonflies: [],
        leaves: [],
        lichens: [],
        keys: [],
        locks: [],
        powerups: [],
        redDrags: [],
        rocks: [],
        scarfs: [],
        speedBoosts: [],
        spikes: [],
        stinkbugs: [],
        waters: [],
        worms: []
    };

    game.getLevelWidth = function() {
        return map.layouts[areaNumber][0].length * TILE_SIZE;
    }

    function Ammo(x, y) {
        this.location = [x, y];
        this.sprite = groups.ammos.create(x * 50, y * 50, "flower_bullet");
        this.sprite.y += 25 - (this.sprite.height / 2);
        this.sprite.x += 25 - (this.sprite.width / 2);
        var origY = this.sprite.y;
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity = gravityLevel * -1;
        var exists = true;
        this.playerTouch = function (playerSprite, ammoSprite) {
            snail.shooting.ammo += 1;
            keyCounters.ammo.increase();
            ammoSprite.destroy();
            exists = false;
            game.sound.play("ammo");
        };
    }

    function Block(x, y, key) {
        var dragSound = game.add.sound("rock_drag", 1, true);
        this.sprite = groups.blocks.create(x, y, key);
        this.sprite.inputEnabled = true;
        this.FRICTION = 2;
        this.beingDragged = false;
        this.dragOffset = 0;
        this.water = {
            entrySpeed: 0,
            wasIn: false,
            inWater: false
        };
        game.physics.arcade.enable(this.sprite);
        var collidesWith = [groups.blocks, groups.grounds, groups.cleargrounds, groups.locks,
             groups.spikess, groups.speedBoosts];  

        this.update = function () {
            var velX = 0;
            var absVelX = 0;
            var velXSign = 0;
            var draggedColor = 0x737373;
            var i = 0;
            var water = null;
            if (!this.beingDragged) {
                game.physics.arcade.collide(this.sprite, snail.sprite, function (blockSprite, snailSprite) {
                    if (cursors.down.isDown && snailSprite.bottom === blockSprite.bottom && snail.canPull) {
                        this.beingDragged = true;
                        blockSprite.tint = draggedColor;
                        if (blockSprite.x > snailSprite.x) {
                            this.dragOffset = snailSprite.width;
                        } else {
                            this.dragOffset = -1 * snailSprite.width;
                        }
                    }
                    if (snailSprite.body.touching.down && cursors.up.isDown) {
                        if (!this.sprite.body.touching.down) {
                            this.sprite.body.velocity.y += 100;
                        }
                        snail.jumping = true;
                    }
                }, null, this);
            } else {
                game.physics.arcade.collide(this.sprite, snail.sprite);
                if (!snail.alive || !snail.sprite.body.touching.down || !cursors.down.isDown) {
                    this.beingDragged = false;
                    this.sprite.tint = 0xFFFFFF;
                } else {
                    this.sprite.body.position.x = snail.sprite.body.position.x + this.dragOffset;
                    this.sprite.body.velocity.x = snail.sprite.body.velocity.x;
                }
            }
            var sprite = this.sprite;
            collidesWith.forEach(function (group) {
                game.physics.arcade.collide(sprite, group);
            });
            velX = this.sprite.body.velocity.x;
            absVelX = Math.abs(velX);
            velXSign = Math.sign(velX);
            if (this.sprite.body.touching.down) {
                dragSound.volume = absVelX / 200;
                if (!dragSound.isPlaying && absVelX > 0) {
                    dragSound.play();
                } else if (dragSound.isPlaying && velX === 0) {
                    dragSound.stop();
                }
                if (absVelX >= this.FRICTION) {
                    this.sprite.body.velocity.x -= this.FRICTION * velXSign;
                } else {
                    this.sprite.body.velocity.x = 0;
                }
            } else if (dragSound.isPlaying) {
                dragSound.stop();
            }
            if (!this.sprite.inCamera && dragSound.isPlaying) {
                dragSound.stop();
            }
            this.water.wasIn = false;
            for (i = 0; i < arrays.waters.length; i++) {
                water = arrays.waters[i];
                game.physics.arcade.overlap(this.sprite, water.sprite, function (blockSprite, waterSprite) {
                    water.blockTouch(this);
                    var velX = blockSprite.body.velocity.x,
                        absVelX = Math.abs(velX),
                        velXSign = velX / absVelX,
                        DRAG = 0.5;
                    if (absVelX >= this.FRICTION) {
                        this.sprite.body.velocity.x -= DRAG * velXSign;
                    } else {
                        this.sprite.body.velocity.x = 0;
                    }

                }, null, this);
            }
            if (!this.water.wasIn) {
                this.water.inWater = false;
            }
        };
    }

    function Bridge(x, y, spriteKey) {
        var frameRate = 7;
        var sprite = groups.bridges.create(x * 50, y * 50, spriteKey);
        sprite.animations.add('shimmer', [0, 1, 2], frameRate, true);
        sprite.play('shimmer');
        game.physics.arcade.enable(sprite);
        sprite.body.immovable = true;
        sprite.body.moves = false;
        sprite.body.checkCollision.up = false;
        sprite.body.checkCollision.right = false;
        sprite.body.checkCollision.left = false;
        this.sprite = sprite;
    }

    function Bullet(x, y, direction) {
        var VELOCITY = 500;
        this.sprite = groups.bullets.create(x, y, 'flower_bullet');
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = -1 * gravityLevel;
        this.sprite.y += (snail.sprite.height - this.sprite.height) / 2;
        this.direction = direction;
        this.vel = VELOCITY;
        this.switched = false;
        if (direction === 'right') {
            this.sprite.x += snail.sprite.width;
            this.sprite.body.velocity.x = snail.sprite.body.velocity.x + VELOCITY;
            this.sprite.rotation = Math.PI / 2;
        } else {
            this.sprite.x -= this.sprite.width;
            this.sprite.body.velocity.x = snail.sprite.body.velocity.x - VELOCITY;
            this.sprite.rotation = Math.PI / -2;
        }
        this.update = function () {
            var collidesWith = [groups.blocks, groups.grounds, groups.locks, groups.spikess];
            var toDestroy = false;
            var cornerLapping = false;
            game.physics.arcade.overlap(this.sprite, groups.cornerStones, function (bulletSprite, cornerSprite) {
                cornerLapping = true;
            });
            if (this.switched && !cornerLapping) {
                this.switched = false;
            }
            for (var i = 0; i < collidesWith.length; i++) {
                game.physics.arcade.overlap(this.sprite, collidesWith[i], function (bulletSprite, otherSprite) {
                    toDestroy = true;
                }, null, this);
            }
            if (toDestroy) {
                this.sprite.destroy();
                delete this.update;
            }
        }
    }

    function CornerStone(x, y, direction) {
        var sx = x * 50;
        var sy = y * 50;
        var bx = "";
        var by = "";
        var aboveChar = map.layouts[areaNumber][y - 1][x];
        this.isFiller = "7890".match(aboveChar);
        this.sprite = groups.cornerStones.create(sx, sy, "cornerstone" + (this.isFiller ? "_filler" : ""));
        this.direction = direction;
        var triangle = new Phaser.Polygon();
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        this.isBottom = (map.layouts[areaNumber][y + 1][(direction === "nw" ? x - 1 : x + 1)] === "g") && !this.isFiller;
        switch (direction) {
            case "nw":
                triangle.setTo([new Phaser.Point(sx + 50, sy), new Phaser.Point(sx + 50, sy + 50), new Phaser.Point(sx, sy + 50)]);
                bx = "right";
                by = "bottom";
                break;
            case "se":
                triangle.setTo([new Phaser.Point(sx, sy), new Phaser.Point(sx + 50, sy), new Phaser.Point(sx, sy + 50)]);
                bx = "x";
                by = "y";
                break;
            case "ne":
                triangle.setTo([new Phaser.Point(sx, sy), new Phaser.Point(sx + 50, sy + 50), new Phaser.Point(sx, sy + 50)]);
                bx = "x";
                by = "bottom";
                this.sprite.frame = 1;
                break;
            case "sw":
                triangle.setTo([new Phaser.Point(sx, sy), new Phaser.Point(sx + 50, sy), new Phaser.Point(sx + 50, sy + 50)]);
                bx = "right";
                by = "y";
                break;
        }

        this.update = function () {
            arrays.bullets.forEach(function (bullet) {
                game.physics.arcade.overlap(this.sprite, bullet.sprite, function (cornerSprite, bulletSprite) {
                    if (triangle.contains(bulletSprite[bx], bulletSprite[by]) && !bullet.switched) {
                        if (bullet.direction === "right" || bullet.direction === "left") {
                            switch (direction) {
                                case "nw":
                                case "ne":
                                    bulletSprite.body.velocity.y = bullet.vel * -1;
                                    bulletSprite.rotation = 0;
                                    bullet.direction = "up";
                                    break;
                                case "sw":
                                case "se":
                                    bulletSprite.body.velocity.y = bullet.vel;
                                    bulletSprite.rotation = Math.PI;
                                    bullet.direction = "down";
                                    break;
                            }
                            bulletSprite.body.velocity.x = 0;
                        } else {
                            switch (direction) {
                                case "ne":
                                case "se":
                                    bulletSprite.body.velocity.x = bullet.vel;
                                    bulletSprite.rotation = Math.PI / 2;
                                    bullet.direction = "right";
                                    break;
                                case "nw":
                                case "sw":
                                    bulletSprite.body.velocity.x = bullet.vel * -1;
                                    bulletSprite.rotation = Math.PI / -2;
                                    bullet.direction = "left";
                                    break;
                            }
                            bulletSprite.body.velocity.y = 0;
                        }
                        bullet.switched = true;
                    }

                }, null, this);
            }, this);

        };
    }

    function CountDisplay(x, y, key, count) {
        var countDisplay = game.add.text(x + 26, y + 2, count.toString(), Snail.textStyles.boingbox);
        var icon = groups.topLevel.create(x, y, key);
        groups.topLevel.add(countDisplay);
        if (key === "flower_bullet") {
            icon.y += (22 - icon.height) / 2;
            countDisplay.x = icon.x + icon.width + 4;
        }
        countDisplay.fixedToCamera = true;
        icon.fixedToCamera = true;
        this.increase = function () {
            count += 1;
            countDisplay.text = count;
        };
        this.decrease = function () {
            if (count > 0) {
                count -= 1;
                countDisplay.text = count.toString();
            }
        };
        this.reset = function () {
            count = 0;
            countDisplay.text = "0";
        }
    }

    function DecFlow(x, y) {
        var colors = ['yellow', 'pink'];
        var key = colors[Math.floor(Math.random() * 2)] + '_flow';
        var sprite = groups.decFlows.create(x, y, key);
        sprite.x += Math.floor(Math.random() * (50 - 18)) - 25;
        sprite.animations.add('move', [0, 1], 3, true);
        sprite.play('move');
    }

    function Deer(x, y, key, location) {
        var deerStates = {
            WALKING: 1,
            CHARGING: 2,
            DYING: 3,
            DEAD: 4
        };
        var directions = {
            RIGHT: 1,
            LEFT: 2
        };
        var WALKSPEED = 80;
        var CHARGESPEED = 150;
        var state = deerStates.WALKING;
        var direction = directions.RIGHT;
        var walkSound = game.add.audio("deer_walk", 1, true);
        var runSound = game.add.audio("deer_run", 1, true);
        this.sprite = groups.deers.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('walk_left', [0, 1, 2, 3, 4], 5, true);
        this.sprite.animations.add('walk_right', [5, 6, 7, 8, 9], 5, true);
        this.sprite.animations.add('charge_left', [2, 3], 6, true);
        this.sprite.animations.add('charge_right', [7, 8], 6, true);
        this.sprite.body.velocity.x = WALKSPEED;
        this.sprite.play('walk_right');

        this.charge = function () {
            var sign = (snail.sprite.x > this.sprite.x) ? 1 : -1;
            walkSound.stop();
            if (!runSound.isPlaying && this.sprite.inCamera) {
                runSound.play();
            } else if (runSound.isPlaying && !this.sprite.inCamera) {
                runSound.stop();
            }
            if (state === deerStates.WALKING) {
                state = deerStates.CHARGING;
                this.sprite.body.velocity.x = CHARGESPEED * sign;
                this.sprite.play('charge_' + ((sign > 0) ? 'right' : 'left'));
            } else if (direction === directions.RIGHT && sign === -1) {
                direction = directions.LEFT;
                this.sprite.body.velocity.x = CHARGESPEED * sign;
                this.sprite.play('charge_left');
            } else if (direction === directions.LEFT && sign === 1) {
                direction = directions.RIGHT;
                this.sprite.body.velocity.x = CHARGESPEED * sign;
                this.sprite.play('charge_right');
            }
        };

        this.walk = function () {
            state = deerStates.WALKING;
            runSound.stop();
            if (!walkSound.isPlaying && this.sprite.inCamera) {
                walkSound.play();
            } else if (walkSound.isPlaying && !this.sprite.inCamera) {
                walkSound.stop();
            }
            if (direction === directions.RIGHT && this.sprite.body.touching.right) {
                direction = directions.LEFT;
                this.sprite.body.velocity.x = WALKSPEED * -1;
                this.sprite.play('walk_left');
            } else if (direction === directions.LEFT && this.sprite.body.touching.left) {
                direction = directions.RIGHT;
                this.sprite.body.velocity.x = WALKSPEED;
                this.sprite.play('walk_right');
            }
        };

        this.seesPlayer = function () {
            if (snail.hiding.isHiding || snail.sprite.y > this.sprite.bottom || snail.sprite.bottom < this.sprite.y) {
                return false;
            }
            var levMap = map.layouts[areaNumber];
            var sightBlockers = 'gzb@#';
            var rightApp = (snail.sprite.x > this.sprite.x);
            var playerAbove = (snail.sprite.bottom < this.sprite.y + 20);
            var decVal = rightApp ? 1 : -1;
            var v = Math.floor((this.sprite.y + 20) / 50);
            var h = Math.floor(this.sprite.x / 50);
            var playerH = Math.floor(snail.sprite.x / 50);
            if (!rightApp) {
                playerH += 1;
            }
            if (playerAbove) {
                v -= 1;
            }
            while (h !== playerH && sightBlockers.indexOf(levMap[v][h]) === -1) {
                h += decVal;
            }
            return (h === playerH);
        };

        this.update = function () {
            var collidesWith = [groups.grounds, groups.locks, groups.blocks, groups.cleargrounds, groups.invisibles];
            var newX = 0;
            var newY = 0;
            var lastDeathFrame = 13;
            var dirMult = 0;
            switch (state) {
                case deerStates.CHARGING:
                    dirMult = (direction === directions.RIGHT) ? 1 : -1;
                    this.sprite.body.velocity.x = CHARGESPEED * dirMult;
                case deerStates.WALKING:
                    game.physics.arcade.collide(this.sprite, groups.spikess, function (deerSprite, spikesSprite) {
                        if (deerSprite.bottom < spikesSprite.y + 10) {
                            state = deerStates.DYING;
                        }
                    }, null, this);
                    for (var i = 0; i < collidesWith.length; i++) {
                        game.physics.arcade.collide(this.sprite, collidesWith[i]);
                    }
                    if (state !== deerStates.DYING) {
                        if (this.seesPlayer()) {
                            this.charge();
                        } else {
                            this.walk();
                        }
                    }
                    game.physics.arcade.overlap(this.sprite, groups.bullets, function (deerSprite, bulletSprite) {
                        state = deerStates.DYING;
                        bulletSprite.destroy();
                    }, null, this);
                    break;
                case deerStates.DYING:
                    newX = this.sprite.x;
                    newY = this.sprite.y;
                    runSound.destroy();
                    walkSound.destroy();
                    this.sprite.destroy();
                    this.sprite = groups.deers.create(newX, newY, 'deer_death');
                    if (direction === directions.RIGHT) {
                        this.sprite.x += this.sprite.width;
                        this.sprite.scale.setTo(-1, 1);
                    }
                    this.sprite.animations.add('die', Snail.makeAnimationArray(6, lastDeathFrame, false), 6);
                    this.sprite.play('die');
                    game.sound.play("deer_death");
                    var t = game.add.tween(this.sprite).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 2000);
                    t.onComplete.add(function () {
                        this.sprite.destroy();
                    }, this);
                    state = deerStates.DEAD;
                    delete this.update;
                    break;
            }
        };
    }

    function Healthbar(x, y, key) {
        this.sprite = groups.topLevel.create(0, 0, 'healthbar');
        this.sprite.x = Snail.GAME_WIDTH - this.sprite.width - 25;
        this.sprite.y = 25 - (this.sprite.height / 2);
        this.sprite.fixedToCamera = true;
        this.update = function () {
            this.sprite.frame = (3 - snail.health) * 2;
        };
    }

    function Invisible(x, y) {
        this.sprite = groups.invisibles.create(x * 50, y * 50, 'invisible');
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.moves = false;
        this.sprite.body.immovable = true;
    }

    function Dragonfly(x, y) {
        var BOOST_LEVEL = -380;
        var sprite = groups.dragonflies.create(x * 50, y * 50, "dragonfly");
        game.physics.arcade.enable(sprite);
        sprite.body.gravity = gravityLevel * -1;
        sprite.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
        sprite.animations.add("fly", [8, 9, 10, 11, 12, 13, 14, 15], 12);
        sprite.play("idle");
        this.update = function () {
            game.physics.arcade.overlap(sprite, snail.sprite, function (dragonSprite, playerSprite) {
                snail.sprite.body.velocity.y = BOOST_LEVEL;
                sprite.play("fly");
                sprite.animations.currentAnim.onComplete.add(function () {
                    sprite.play("idle");
                });
                game.sound.play("dragonfly");
            }, function (dragonSprite, playerSprite) {
                return playerSprite.bottom > dragonSprite.bottom - 22 && playerSprite.body.velocity.y > 0;
            }, this);
        };
    }

    function Key(x, y, key, color, location) {
        this.sprite = groups.keys.create(x * 50, y * 50, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        this.sprite.animations.add("shimmer", Snail.makeAnimationArray(0, 7, false), 15, true);
        this.sprite.play("shimmer");
        this.color = color;
        this.location = location;
        this.update = function () {
            game.physics.arcade.overlap(this.sprite, snail.sprite, function (keySprite, playerSprite) {
                var color = this.color;
                var colorIndex = snail.keysHad.colors.indexOf(color);
                game.sound.play("key", 0.6);
                if (colorIndex === -1) {
                    snail.keysHad.colors.push(color);
                    snail.keysHad.counts.push(1);
                } else {
                    snail.keysHad.counts[colorIndex] += 1;
                }
                colorIndex = snail.areaKeys.colors.indexOf(color);
                if (colorIndex === -1) {
                    snail.areaKeys.colors.push(color);
                    snail.areaKeys.counts.push(1);
                } else {
                    snail.areaKeys.counts[colorIndex] += 1;
                }
                keySprite.destroy();
                Snail.removeFromLevel(map, areaNumber, this, fileMap)
                keyCounters[color].increase();
            }, null, this);
        };
    }

    function Leaf(x, y, key, pointerNumber) {
        this.sprite = groups.leaves.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('shine', Snail.makeAnimationArray(0, 9, false));
        this.sprite.animations.play('shine', 8, true);
        game.add.tween(this.sprite).to({ y: this.sprite.y + 5 }, 300, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        this.pointer = map.leafPointers[areaNumber][pointerNumber];
        this.update = function () {
            game.physics.arcade.overlap(this.sprite, snail.sprite, function (leafSprite, playerSprite) {
                var oldY = playerSprite.y;
                var oldX = playerSprite.x;
                var cocAnim = null;
                playerSprite.destroy();
                snail.sprite = game.add.sprite(oldX, oldY - 20, "coccoon");
                cocAnim = snail.sprite.animations.add("make");
                snail.sprite.play("make", 20, false);
                if (snail.direction === "left") {
                    snail.sprite.x += snail.sprite.width;
                    snail.sprite.scale.setTo(-1, 1);
                }
                cocAnim.onComplete.addOnce(function () {
                    Snail.areaNumber = this.pointer;
                    fromSave = false;
                    fromSaveDeath = false;
                    if (Snail.loadedMusics.indexOf(Snail.cleanMap.musics[Snail.areaNumber]) === -1) {
                        Snail.tempSave = {
                            map: fileMap,
                            keysHad: snail.keysHad,
                            powerups: snail.powerups,
                            ammo: snail.shooting.ammo
                        };
                        game.state.start("Midload");
                    } else {
                        areaNumber = Snail.areaNumber;
                        Snail.areaNumber = -1;
                        resetLevel();
                    }
                }, this);
                game.sound.play("leaf");
                snail.alive = false;
                this.sprite.destroy();
                delete this.update;
            }, null, this);
        };
    }

    function Lock(x, y, key, color, location) {
        this.sprite = groups.locks.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        this.sprite.lockObject = this;
        this.color = color;
        this.location = location;
        this.playerTouch = function (lockSprite, playerSprite) {
            var colorIndex = snail.keysHad.colors.indexOf(this.color);
            if (colorIndex !== -1 && snail.keysHad.counts[colorIndex] !== 0) {
                game.sound.play("unlock");
                lockSprite.destroy();
                snail.keysHad.counts[colorIndex] -= 1;
                snail.areaKeys.counts[snail.areaKeys.colors.indexOf(this.color)] -= 1;
                Snail.removeFromLevel(map, areaNumber, this, fileMap);
                keyCounters[color].decrease();
            }

        };
    }

    function Spikes(x, y, key, type) {
        var spikeStates = {
            ON: 1,
            OFF: 2
        };
        var spikeTypes = {
            STATIC: 1,
            START_ON: 2,
            START_OFF: 3
        };
        var rate = 60,
            changeCounter = rate;
        this.sprite = groups.spikess.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        switch (type) {
            case 'STATIC':
                this.type = spikeTypes.STATIC;
                this.state = spikeStates.ON;
                break;
            case 'START_ON':
                this.type = spikeTypes.START_ON;
                this.state = spikeStates.ON;
                break;
            case 'START_OFF':
                this.type = spikeTypes.START_OFF;
                this.state = spikeStates.OFF;
                this.sprite.frame = 1;
                break;
            default:
                throw new Error(type + ' is not a valid spike type.');
        }

        this.update = function () {
            if (this.type !== spikeTypes.STATIC) {
                if (changeCounter === 0) {
                    this.changeState();
                    changeCounter = rate;
                } else {
                    changeCounter--;
                }
            }
        };

        this.playerTouch = function () {
            var MARGIN = 10;
            var rightPos = false;
            var rightHeight = (snail.sprite.bottom <= this.sprite.top);
            var playerLeft = (snail.sprite.x < this.sprite.x);
            if (snail.touchingGround) {
                if (playerLeft) {
                    rightPos = (this.sprite.x - snail.sprite.x < snail.sprite.width - MARGIN);
                } else {
                    rightPos = (snail.sprite.x < this.sprite.right - MARGIN);
                }
            } else {
                rightPos = true;
            }
            if (this.state === spikeStates.ON && !snail.inPain && rightHeight && rightPos) {
                snail.getHurt(1);
            }
        };

        this.changeState = function () {
            if (this.state === spikeStates.ON) {
                this.state = spikeStates.OFF;
                this.sprite.frame = 1;
            } else {
                this.state = spikeStates.ON;
                this.sprite.frame = 0;
            }
        };
    }

    function Player(x, y, key) {
        var jumpCounter = 15;
        var wasTouching = false;
        var curRamp = null;
        var curBoost = null;
        var boostSpeed = 0;
        var rampEntrySpeed = 0;
        this.sliding = false;
        this.slipping = false;
        this.redDrag = null;
        this.sprite = game.add.sprite(x, y, key);
        this.health = 3;
        this.alive = true;
        this.inPain = false;
        this.jumping = false;
        this.curRedDrag = null;
        var runningSpeed = 0;
        this.direction = 'right';
        this.isDragging = false;
        this.touchingGround = false;
        this.firstFrame = true;
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('walk_right', Snail.makeAnimationArray(0, 5, false), 5, true);
        this.sprite.animations.add('walk_left', Snail.makeAnimationArray(6, 11, false), 5, true);
        this.sprite.animations.add('idle_right', Snail.makeAnimationArray(30, 33, false), 3, true);
        this.sprite.animations.add('idle_left', Snail.makeAnimationArray(34, 37, false), 3, true);
        this.sprite.animations.add("fly_right" [0, 1], 8, true);
        this.sprite.animations.add("fly_left" [6, 7], 8, true);
        this.sprite.animations.add("slide_right", [38, 39], 5, true);
        this.sprite.animations.add("slide_left", [40, 41], 5, true);
        this.sprite.animations.play('idle_right');
        this.sprite.inputEnabled = true;
        console.log(SaveData.keysHad);
        this.keysHad = JSON.parse(JSON.stringify(SaveData.keysHad));
        this.areaKeys = {
            colors: [],
            counts: []
        };
        this.lichenCount = 0;
        this.powerups = [];
        this.tempPowerups = [];
        this.hiding = {
            canHide: false,
            isHiding: false,
            startTime: 0
        };
        this.scarf = false;
        this.shooting = {
            canShoot: false,
            lastShot: 0,
            wasDown: false,
            ammo: 0
        };
        this.canPull = false;
        this.water = {
            inWater: false,
            entrySpeed: 0,
            wasIn: false
        }
        this.healthbar = new Healthbar(100 - 96 - 10, 10, 'healthbar');
        this.update = function () {
            var spike = null;
            var lock = null;
            var water = null;
            var rock = null;
            var ammo = null;
            var ramp = null;
            var speedBoost = null;
            var redDrag = null;
            curBoost = null;
            arrays.speedBoosts.forEach(function (boost) {
                var collided = false;
                game.physics.arcade.collide(snail.sprite, boost.sprite, function (playerSprite, blockSprite) {
                    if (Math.floor(playerSprite.bottom) === blockSprite.top && !curBoost) {
                        curBoost = boost
                    }
                }, null, this);
            });
            this.touchingGround = false;
            var groundTouch = function (playerSprite, groundSprite) {
                if (groundSprite.key.indexOf("top") !== -1 || groundSprite.key.indexOf("d_both") !== -1) {
                    this.touchingGround = true;
                }
            };
            game.physics.arcade.overlap(this.sprite, groups.grounds, groundTouch, null, this);
            game.physics.arcade.collide(this.sprite, groups.bridges);
            game.physics.arcade.collide(this.sprite, groups.softGrounds, function () {
                this.touchingGround = true;
            }, null, this);
            for (i = 0; i < arrays.spikes.length; i++) {
                spike = arrays.spikes[i];
                game.physics.arcade.collide(this.sprite, spike.sprite, spike.playerTouch, null, spike);
            }
            game.physics.arcade.collide(this.sprite, groups.grounds, groundTouch, null, this);
            this.water.wasIn = false;
            for (i = 0; i < arrays.waters.length; i++) {
                water = arrays.waters[i];
                if (water.type === 'BRIDGE') {
                    game.physics.arcade.collide(this.sprite, water.sprite, function (playerSprite, waterSprite) {
                        this.touchingGround = true;
                    }, null, this);
                }
                game.physics.arcade.overlap(this.sprite, water.sprite, water.playerTouch, null, water);
            }
            if (!this.water.wasIn) {
                this.water.inWater = false;
            }
            if (this.touchingGround && !wasTouching) {
                game.sound.play("thud_" + (Math.floor(Math.random() * 2) + 1), 0.5);
            }
            wasTouching = this.touchingGround;
            for (i = 0; i < arrays.locks.length; i++) {
                lock = arrays.locks[i];
                game.physics.arcade.collide(lock.sprite, this.sprite, lock.playerTouch, null, lock);
            }
            for (i = 0; i < arrays.rocks.length; i++) {
                rock = arrays.rocks[i];
                game.physics.arcade.overlap(rock.sprite, this.sprite, rock.startBox, function () {
                    return !rock.boxShown;
                }, rock);
            }
            for (i = 0; i < arrays.ammos.length; i++) {
                ammo = arrays.ammos[i];
                game.physics.arcade.overlap(this.sprite, ammo.sprite, ammo.playerTouch, null, ammo);
            }
            if (!firstFrame) {
                game.physics.arcade.overlap(this.sprite, groups.stinkbugs, function (playerSprite, stinkbugSprite) {
                    if (!this.inPain && !this.sliding) {
                        this.getHurt(1);
                    }
                }, null, this);
                game.physics.arcade.overlap(this.sprite, groups.deers, function (playerSprite, deerSprite) {
                    if (!this.inPain) {
                        this.getHurt(1);
                    }
                }, function (playerSprite, deerSprite) {
                    var buffer = 14;
                    var leftOfDeer = playerSprite.x < deerSprite.x;
                    var inHitZone = leftOfDeer ? playerSprite.right > deerSprite.x + buffer : playerSprite.x < deerSprite.right - buffer;
                    return inHitZone;
                }, this);
            }
            if (!this.curRedDrag) {
                for (i = 0; i < arrays.redDrags.length; i++) {
                    redDrag = arrays.redDrags[i];
                    game.physics.arcade.overlap(this.sprite, redDrag.sprite, function (playerSprite, redDragSprite) {
                        if (!dropKey.isDown && !redDrag.done) {
                            this.curRedDrag = redDrag;
                            this.curRedDrag.activated = true;
                            playerSprite.body.position.setTo(redDragSprite.body.position.x, redDragSprite.body.position.y + redDragSprite.height);
                            playerSprite.body.velocity.x = 5;
                            playerSprite.body.gravity.y = gravityLevel * -1;
                            this.sprite.animations.play(redDrag.direction === "right" ? "fly_right" : "fly_left");
                        }
                    }, null, this);
                }
            }
            curRamp = null;
            for (i = 0; i < arrays.cornerStones.length; i++) {
                ramp = arrays.cornerStones[i];
                game.physics.arcade.overlap(this.sprite, ramp.sprite, function (playerSprite, rampSprite) {
                    var isNorthwest = ramp.direction === "nw";
                    var northwestCondition = rampSprite.bottom - playerSprite.bottom <= playerSprite.right - rampSprite.x;
                    var northeastCondition = rampSprite.bottom - playerSprite.bottom <= rampSprite.right - playerSprite.x;
                    if (ramp.isFiller || (isNorthwest && northwestCondition) || (!isNorthwest && northeastCondition)) {
                        curRamp = ramp;
                    }
                }, null, this);
            }
            if ((this.health === 0 || killKey.isDown) && this.alive) {
                this.healthbar.sprite.frame = 6;
                this.die();
            }
            if (this.curRedDrag && this.alive) {
                this.redDragUpdate();
            }
            if (curRamp) {
                if (rampEntrySpeed === 0) {
                    rampEntrySpeed = this.sprite.body.velocity.x;
                }
                this.rampUpdate();
            } else if ((this.sliding || this.slipping) && (cursors.left.isDown && this.sprite.body.velocity.x < 0 || cursors.right.isDown && this.sprite.body.velocity.x > 0)) {
                rampEntrySpeed = 0;
                if (this.slipping) {
                    this.sliding = true;
                    this.slipping = false;
                }
                this.slideUpdate();
            } else {
                rampEntrySpeed = 0;
                this.sliding = false;
                this.slipping = false;
            }
            if (this.alive && !this.curRedDrag && !curRamp && !this.sliding && !game.physics.arcade.isPaused) {
                this.aliveUpdate();
            }
        };
        this.redDragUpdate = function() {
            const MAX_SPEED_X = 300;
            const MAX_SPEED_Y = 150;
            const INCREMENT_X = 5;
            const INCREMENT_Y = 10;
            const SIGN_X = this.curRedDrag.direction === "right" ? 1 : -1;
            if (this.shooting.canShoot && shootKey.isDown && !this.shooting.wasDown) {
                this.shoot();
            }
            if (Math.abs(this.sprite.body.velocity.x) < MAX_SPEED_X) {
                this.sprite.body.velocity.x += INCREMENT_X * SIGN_X;
            }
            if (cursors.up.isDown && !cursors.down.isDown) {
                if (this.sprite.body.velocity.y > MAX_SPEED_Y * -1) {
                    this.sprite.body.velocity.y -= INCREMENT_Y;
                } else {
                    this.sprite.body.velocity.y = MAX_SPEED_Y * -1;
                }
            } else if (cursors.down.isDown && !cursors.up.isDown) {
                if (this.sprite.body.velocity.y < MAX_SPEED_Y) {
                    this.sprite.body.velocity.y += INCREMENT_Y;
                } else {
                    this.sprite.body.velocity.y = MAX_SPEED_Y;
                }
            } else {
                if (Math.abs(this.sprite.body.velocity.y) >= INCREMENT_Y) {
                    this.sprite.body.velocity.y += -1 * INCREMENT_Y * Math.sign(this.sprite.body.velocity.y);
                } else {
                    this.sprite.body.velocity.y = 0;
                }
            }
            if (this.curRedDrag.blockedUp) {
                this.sprite.body.velocity.y = 0;
                this.sprite.body.position.y = this.curRedDrag.sprite.body.position.y + this.curRedDrag.sprite.height * 2 / 3;
            }
            this.curRedDrag.sprite.body.position.x = this.sprite.body.position.x;
            this.curRedDrag.sprite.body.position.y = this.sprite.body.position.y - this.curRedDrag.sprite.height * 2 / 3;
            if (dropKey.isDown) {
                this.curRedDrag.sprite.y = this.sprite.y - this.curRedDrag.sprite.height - 10;
                this.curRedDrag.activated = false;
                this.curRedDrag.flyAway();
                this.curRedDrag = null;
                this.sprite.body.gravity.y = 0;
            }
        };
        this.slideUpdate = function () {
            var MULTIPLIER = this.sprite.body.velocity.x < 0 ? 1 : -1;
            var GROUND_FRICTION = 5;
            var AIR_FRICTION = 1;
            var BOOST_LEVEL = 10;
            var MAX_SPEED = 350;
            this.sprite.body.gravity.y = 0;
            this.sprite.rotation = 0;
            this.slipping = false;
            if (curBoost && ((curBoost.direction === "left" && MULTIPLIER === 1) || (curBoost.direction === "right" && MULTIPLIER === -1))) {
                if (Math.abs(this.sprite.body.velocity.x) < MAX_SPEED) {
                    this.sprite.body.velocity.x -= BOOST_LEVEL * MULTIPLIER;
                } else {
                    this.sprite.body.velocity.x = MAX_SPEED * MULTIPLIER * -1;
                }
            }
            if (this.sprite.body.touching.down) {
                this.sprite.body.velocity.x += GROUND_FRICTION * MULTIPLIER;
                if (this.sprite.anchor.x === 1) {
                    this.sprite.anchor.x = 0;
                    this.sprite.body.position.x -= this.sprite.width;
                }
                if (this.sprite.anchor.y === 1) {
                    this.sprite.anchor.y = 0;
                    this.sprite.body.position.y -= this.sprite.height;
                }
                if (Math.abs(this.sprite.body.velocity.x) < 10) {
                    this.sliding = false;
                }
                if (cursors.up.isDown && !shiftKey.isDown) {
                    this.jumping = true;
                }
                if (this.jumping) {
                    this.jump();
                }
            } else {
                this.sprite.body.velocity.x += AIR_FRICTION * MULTIPLIER;
            }
        };
        this.rampUpdate = function () {
            var MULTIPLIER = curRamp.direction === "nw" ? 1 : -1;
            this.sprite.body.gravity.y = gravityLevel * -1;
            if (this.sliding) {
                this.sliding = false;
            }
            if (this.sprite.anchor.y === 0) {
                this.sprite.anchor.setTo(curRamp.direction === "nw" ? 1 : 0, 1);
                if (!curRamp.isBottom) {
                    this.sprite.rotation = Math.PI / -4 * MULTIPLIER;
                }
                if (curRamp.direction === "nw") {
                    this.sprite.body.position.x += this.sprite.width;
                }
                this.sprite.body.position.y += this.sprite.height;
            }
            var diagHeight = (1 / Math.SQRT2) * this.sprite.width;
            if (curRamp.isBottom && curRamp.sprite.bottom - this.sprite.y < diagHeight) {
                this.sprite.rotation = ((curRamp.sprite.bottom - this.sprite.y) / diagHeight) * Math.PI / -4 * MULTIPLIER;
            }
            if (!this.slipping) {
                if ((curRamp.direction === "nw" ? cursors.right : cursors.left).isDown) {
                    if (rampEntrySpeed !== -2000) {
                        var sp = Math.SQRT1_2 * rampEntrySpeed;
                        this.sprite.body.velocity.setTo(sp, Math.abs(sp) * -1);
                        rampEntrySpeed = -2000;
                    } else if (Math.abs(this.sprite.body.velocity.x) <= 102) {
                        this.sprite.body.velocity.x += 2 * MULTIPLIER;
                        this.sprite.body.velocity.y += 2 * MULTIPLIER;
                        if (this.sprite.animations.currentAnim.name.indexOf("slide") !== -1) {
                            this.sprite.animations.play("walk_" + (MULTIPLIER === 1 ? "right" : "left"));
                        }
                    } else {
                        this.sprite.body.velocity.x -= 2 * MULTIPLIER;
                        this.sprite.body.velocity.y -= 2 * MULTIPLIER;
                    }
                    if (curRamp.direction === "nw") {
                        if (curRamp.isFiller) {
                            this.sprite.body.position.x += 2;
                            this.sprite.body.position.y -= 1;
                        } else if (this.sprite.right - curRamp.sprite.x > 5) {
                            this.sprite.body.position.y = (-1 * this.sprite.right) + curRamp.sprite.x + curRamp.sprite.bottom - this.sprite.height;
                        }
                    }
                } else {
                    this.slipping = true;
                    this.sprite.body.velocity.x = this.sprite.body.velocity.y * -1 * MULTIPLIER;
                }
            } else {
                if (this.sprite.animations.currentAnim.name.indexOf("slide") === -1) {
                    this.sprite.play("slide_" + (MULTIPLIER === 1 ? "left" : "right"));
                }
                if (Math.abs(this.sprite.body.velocity.x) < 300) {
                    this.sprite.body.velocity.x -= 10 * MULTIPLIER;
                }
                this.sprite.body.velocity.y = this.sprite.body.velocity.x * -1 * MULTIPLIER;
                if (cursors.up.isDown && !shiftKey.isDown) {
                    this.jumping = true;
                }
                if (this.jumping) {
                    this.jump();
                }
            }
        }
        this.aliveUpdate = function () {
            var MAXSPEED = 200;
            var ACCELERATION = 8;
            var velocityX = runningSpeed;
            var positionX = this.sprite.body.position.x;
            var absVelX = Math.abs(velocityX);
            var velXSign = velocityX / absVelX;

            this.sprite.body.gravity.y = 0;

            if (this.sprite.anchor.y === 1) {
                this.sprite.body.rotation = 0;
                if (this.sprite.anchor.x === 1) {
                    this.sprite.body.position.x -= this.sprite.width;
                }
                this.sprite.anchor.setTo(0, 0);
                this.sprite.body.position.y -= this.sprite.height;
            }
            if (this.hiding.canHide && hideKey.isDown) {
                this.hide();
            }
            if (this.shooting.canShoot && shootKey.isDown && !this.shooting.wasDown) {
                this.shoot();
            }
            this.shooting.wasDown = shootKey.isDown;
            if (cursors.up.isDown && this.sprite.body.touching.down && !this.isDragging && !shiftKey.isDown) {
                this.jumping = true;
            }

            if (cursors.right.isDown && !cursors.left.isDown && !shiftKey.isDown) {
                runningSpeed = Math.min(runningSpeed + ACCELERATION, MAXSPEED);
            } else if (cursors.left.isDown && !cursors.right.isDown && !shiftKey.isDown) {
                runningSpeed = Math.max(runningSpeed - ACCELERATION, -MAXSPEED)
            } else if (Math.abs(runningSpeed) < 10) {
                runningSpeed = 0;
            } else {
                runningSpeed -= velXSign * ACCELERATION;
            }

            var impartedVelocity = 0;
            var onTop = function (playerSprite, otherSprite) {
                return Math.floor(playerSprite.bottom) === otherSprite.top && otherSprite.body.velocity.x !== 0;
            }
            game.physics.arcade.collide(this.sprite, groups.blocks, function (playerSprite, blockSprite) {
                var friction = 1.0,
                    blockVel = blockSprite.body.velocity.x,
                    playerVel = playerSprite.body.velocity.x;
                impartedVelocity += blockVel;
                var directionButton = runningSpeed < 0 ? cursors.left : cursors.right;
                if (!directionButton.isDown) {
                    runningSpeed = 0;
                }
            }, onTop, this);
            if (curBoost) {
                runningSpeed = 0;
                boostSpeed = Math.min(boostSpeed + 100, 500);
            } else if (this.sprite.body.velocity.x === 0) {
                boostSpeed = 0;
            } else {
                var amount = this.touchingGround ? -10 : -2;
                boostSpeed += amount * Math.sign(boostSpeed);
            }

            this.sprite.body.velocity.x = runningSpeed + impartedVelocity + boostSpeed;

            this.sprite.body.velocity.y = Math.min(this.sprite.body.velocity.y, MAXSPEED);
            if (velocityX === 0) {
                this.sprite.play('idle_' + this.direction);
            } else if (this.direction === 'right' && velocityX < 0) {
                this.direction = 'left';
                this.sprite.play('walk_left');
            } else if (this.direction === 'left' && velocityX > 0) {
                this.direction = 'right';
                this.sprite.play('walk_right');
            }
            if (velocityX !== 0 && this.sprite.animations.currentAnim.name.indexOf('walk_') === -1) {
                this.sprite.play('walk_' + this.direction);
            }
            if (absVelX < 100 && this.sprite.animations.currentAnim.speed !== 10) {
                this.sprite.animations.currentAnim.speed = 10;
            } else if (absVelX > 100 && this.sprite.animations.currentAnim.speed !== 20) {
                this.sprite.animations.currentAnim.speed = 20;
            }
            if (this.jumping) {
                this.jump();
            }
            firstFrame = false;
        };
        this.getHurt = function (amount) {
            var timer = game.time.create();
            if (scarfHad) {
                amount /= 2;
            }
            this.health -= amount;
            if (this.health > 0) {
                game.sound.play("hurt");
            }
            this.inPain = true;
            this.sprite.tint = 0x800000;
            this.healthbar.update();
            timer.add(Phaser.Timer.HALF, function () {
                this.inPain = false;
                if (this.hiding.isHiding) {
                    this.sprite.tint = 0x14143d;
                } else {
                    this.sprite.tint = 0xFFFFFF;
                }
            }, this, null);
            timer.start();
        };
        this.shoot = function () {
            if (this.shooting.ammo > 0) {
                game.sound.play("shoot");
                arrays.bullets.push(new Bullet(this.sprite.x, this.sprite.y, this.direction));
                keyCounters.ammo.decrease();
                this.shooting.ammo -= 1;

            }
        }
        this.hide = function () {
            var curTime = (new Date()).getTime();

            function unhide() {
                snail.hiding.isHiding = false;
                snail.sprite.tint = 0xFFFFFF;
            }
            if (curTime - this.hiding.startTime > 13 * 1000) {
                this.hiding.isHiding = true;
                this.hiding.startTime = curTime;
                this.sprite.tint = 0x14143d;
                setTimeout(unhide, 3 * 1000);
            }
        };
        this.jump = function () {
            if (jumpCounter === 15) {
                game.sound.play("jump");
            }
            if (jumpCounter === 0 || !cursors.up.isDown) {
                this.jumping = false;
                jumpCounter = 15;
            } else {
                this.sprite.body.velocity.y = -140;
                jumpCounter--;
            }
        };
        this.die = function () {
            var timer = game.time.create();
            var y = this.sprite.body.position.y;
            var x = this.sprite.body.position.x;
            var height = this.sprite.height;
            var facingLeft = (this.direction === 'left');
            var spriteStuff = this.touchingGround ? { key: 'caterpillar_death', speed: 10 } : { key: 'banana', speed: 20 };
            var curColor = '';
            var i = 0;
            if (facingLeft) {
                x += this.sprite.width;
            }
            this.alive = false;
            this.inPain = true;
            this.health = -1;
            this.sprite.destroy();
            this.sprite = game.add.sprite(x, y, spriteStuff.key);
            this.sprite.animations.add('death');
            if (facingLeft) {
                this.sprite.scale.setTo(-1, 1);
            }
            this.sprite.play('death', spriteStuff.speed, false);
            map.layouts[areaNumber] = JSON.parse(JSON.stringify(Snail.cleanMap.layouts[areaNumber]));
            for (i = 0; i < this.tempPowerups.length; i++) {
                SaveData.powerups.splice(SaveData.powerups.indexOf(this.tempPowerups[i]), 1);
            }
            this.keysHad = JSON.parse(JSON.stringify(SaveData.keysHad));
            if (keyCounters.ammo) {
                keyCounters.ammo.reset();
            }
            if (this.curRedDrag) {
                this.curRedDrag.flyAway();
            }
            arrays.boingbugs.forEach(function (boingbug) { boingbug.resetDialogueOnPlayerDeath(); });
            this.lichenCount = SaveData.lichenCount;
            timer.add(Phaser.Timer.SECOND * 3, resetLevel);
            timer.start();
        };
        this.loadPowerups = function (powerups) {
            var name = '';
            var i = 0;
            for (i = 0; i < powerups.length; i++) {
                name = powerups[i];

                switch (name) {
                    case 'hide':
                        this.hiding.canHide = true;
                        break;
                    case 'shoot':
                        this.shooting.canShoot = true;
                        if (Snail.tempSave !== null) {
                            this.shooting.ammo = Snail.tempSave.ammo;
                        }
                        break;
                    case "pull":
                        this.canPull = true;
                        break;
                    case "scarf":
                        this.scarf = true;
                }
                this.powerups.push(name);
            }
        };
    }

    function Rock(x, y, miniGameName) {
        this.sprite = groups.rocks.create(x * 50, y * 50 - 10, 'rock');
        this.sprite.animations.add("sparkle", [0, 1], 5, true);
        this.sprite.play("sparkle");
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.moves = false;
        this.sprite.body.immoveable = true;
        this.boxShown = false;
        this.startBox = function () {
            this.boxShown = true;
            new ResponseBox(responseTrees.rock, this);
        };
        this.boxDone = function (result) {
            alert(result);
        };
    }

    function Scarf(x, y) {
        var sprite = groups.scarfs.create(x * 50, y * 50, "scarf");
        game.physics.arcade.enable(sprite);
        sprite.body.moves = false;
        sprite.body.immovable = true;
        this.location = [x, y];
        this.update = function () {
            game.physics.arcade.overlap(sprite, snail.sprite, function (scarfSprite, snailSprite) {
                var oldX = snailSprite.x;
                var oldY = snailSprite.y;
                var oldVelX = snailSprite.body.velocity.x;
                var oldVelY = snailSprite.body.velocity.y;
                snail.powerups.push("scarf");
                snail.tempPowerups.push("scarf");
                scarfSprite.destroy();
                snailSprite.destroy();
                snail.sprite = game.add.sprite(oldX, oldY, "cat_scarf");
                game.physics.arcade.enable(snail.sprite);
                snail.sprite.body.velocity.x = oldVelX;
                snail.sprite.body.velocity.y = oldVelY;
                snail.sprite.body.collideWorldBounds = true;
                snail.sprite.animations.add('walk_right', Snail.makeAnimationArray(0, 5, false), 5, true);
                snail.sprite.animations.add('walk_left', Snail.makeAnimationArray(6, 11, false), 5, true);
                snail.sprite.animations.add('idle_right', Snail.makeAnimationArray(30, 33, false), 3, true);
                snail.sprite.animations.add('idle_left', Snail.makeAnimationArray(34, 37, false), 3, true);
                snail.sprite.animations.play('idle_right');
                snail.sprite.inputEnabled = true;
                scarfHad = true;
                Snail.removeFromLevel(map, areaNumber, this, fileMap);
                game.world.bringToTop(groups.waters);
                game.world.bringToTop(groups.bridges);
                game.world.bringToTop(groups.softGrounds);
                game.world.bringToTop(groups.cleargrounds);
                game.world.bringToTop(groups.topLevel);
                game.sound.play("powerup");
                delete this.update;
            }, null, this);
        };
    }

    function SoftGround(x, y) {
        this.sprite = groups.softGrounds.create(x * 50, y * 50, "soft_ground");
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
    }

    function Stinkbug(x, y, key, location) {
        var WALKSPEED = 100;
        var KILLSPEED = 100;
        var stinkbugStates = {
            WALKING: 1,
            DYING: 2,
            DEAD: 3
        };
        var directions = {
            LEFT: 1,
            RIGHT: 2
        };
        var sound = game.add.audio("stinkbug", 0.6, true);
        var state = stinkbugStates.WALKING;
        var direction = directions.RIGHT;
        sound.play();
        this.sprite = groups.stinkbugs.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.sprite.animations.add('walk_right', Snail.makeAnimationArray(0, 3, false), 5, true);
        this.sprite.animations.add('walk_left', Snail.makeAnimationArray(4, 7, false), 5, true);
        this.sprite.play('walk_right');
        this.location = location;
        this.update = function () {
            switch (state) {
                case stinkbugStates.WALKING:
                    if (!this.sprite.inCamera) {
                        sound.volume = 0;
                    } else {
                        sound.volume = Math.min(50 / Math.sqrt(Math.pow(this.sprite.x - snail.sprite.x, 2) + Math.pow(this.sprite.y - snail.sprite.y, 2)), 1);
                    }
                    game.physics.arcade.collide(this.sprite, groups.spikess);
                    game.physics.arcade.collide(this.sprite, groups.locks);
                    game.physics.arcade.collide(this.sprite, groups.grounds);
                    game.physics.arcade.collide(this.sprite, groups.invisibles);
                    game.physics.arcade.overlap(this.sprite, snail.sprite, function (stinkbugSprite, playerSprite) {
                        if (snail.sliding) {
                            state = stinkbugStates.DYING;
                        }
                    }, null, this);
                    game.physics.arcade.collide(this.sprite, groups.blocks, function (stinkbugSprite, blockSprite) {
                        if ((Math.abs(blockSprite.body.velocity.x) > KILLSPEED || blockSprite.y < stinkbugSprite.y - stinkbugSprite.height + 10) && stinkbugSprite.y > blockSprite.y) {
                            state = stinkbugStates.DYING;
                        }
                    }, null, this);
                    game.physics.arcade.overlap(this.sprite, groups.bullets, function (stinkbugSprite, bulletSprite) {
                        state = stinkbugStates.DYING;
                        bulletSprite.destroy();
                    }, null, this);
                    this.walk();
                    break;
                case stinkbugStates.DYING:
                    sound.stop();
                    sound.destroy();
                    sound = game.add.sound("stinkbug_death");
                    sound.play();
                    var facingLeft = (direction === directions.LEFT);
                    var xOffset = facingLeft ? this.sprite.width : 0;
                    var x = this.sprite.x + xOffset;
                    var y = this.sprite.y - 24;
                    this.sprite.destroy();
                    this.sprite = groups.stinkbugs.create(x, y, 'stinkbug_dead');
                    if (facingLeft) {
                        this.sprite.scale.setTo(-1, 1);
                    }
                    this.sprite.animations.add('death', Snail.makeAnimationArray(8, 45, false), 20, false);
                    game.world.sendToBack(this.sprite);
                    this.sprite.play('death');
                    var t = game.add.tween(this.sprite).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 2000);
                    t.onComplete.add(function () {
                        this.sprite.destroy();
                    }, this);
                    Snail.removeFromLevel(map, areaNumber, this, fileMap);
                    state = stinkbugStates.DEAD;
                    delete this.update;
                    break;

            }
        };
        this.walk = function () {
            if (direction === directions.RIGHT) {
                if (this.sprite.body.touching.right) {
                    direction = directions.LEFT
                    this.sprite.play('walk_left');
                } else if (this.sprite.body.touching.down) {
                    this.sprite.body.velocity.x = WALKSPEED;
                } else {
                    this.sprite.body.velocity.x = 0;
                }
            } else {
                if (this.sprite.body.touching.left) {
                    direction = directions.RIGHT;
                    this.sprite.play('walk_right');
                } else if (this.sprite.body.touching.down) {
                    this.sprite.body.velocity.x = WALKSPEED * -1;
                } else {
                    this.sprite.body.velocity.x = 0;
                }
            }
        };
    }

    game.addPowerup = function (x, y, name, location, description) {
        arrays.powerups.push(new Powerup(x, y, "powerup", name, location, description));
    };

    function Powerup(x, y, key, name, location, description) {
        this.sprite = groups.powerups.create(x, y, key);
        this.sprite.x += 25 - this.sprite.width / 2;
        this.sprite.y += 25 - this.sprite.height / 2;
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = gravityLevel * -1;
        this.sprite.animations.add('glimmer', Snail.makeAnimationArray(0, 2, false), 10, true);
        this.sprite.play('glimmer');
        this.location = location;
        var textbox = null;
        var textboxShown = false;

        this.update = function () {
            game.physics.arcade.overlap(this.sprite, snail.sprite, function (powerupSprite, snailSprite) {
                if (!textboxShown) {
                    switch (name) {
                        case 'hide':
                            snail.hiding.canHide = true;
                            break;
                        case 'shoot':
                            snail.shooting.canShoot = true;
                            keyCounters.ammo = new CountDisplay(90, 10, "flower_bullet", 0);
                            break;
                        case "pull":
                            snail.canPull = true;
                            break;
                    }
                    snail.powerups.push(name);
                    snail.tempPowerups.push(name);
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

    function SpeedBoost(x, y, direction) {
        this.direction = direction;
        this.amount = 0;
        this.sprite = groups.speedBoosts.create(x * 50, y * 50, "speedboost");
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.moves = false;
        this.sprite.body.immovable = true;
        var keyToAnims = {
            ground_top_1: [0, 1, 2, 3, 4],
            ground_top_2: [0, 1, 2, 3, 4],
            ground_bottom: [5, 6, 7, 8, 9],
            ground_top_left: [10, 11, 12, 13, 14],
            ground_top_right: [15, 16, 17, 18, 19],
            ground_both_left: [20, 21, 22, 23, 24],
            ground_both_right: [25, 26, 27, 28, 29],
            ground_top_both: [30, 31, 32, 33, 34],
            ground_both_both: [35, 36, 37, 38, 39]
        };
        var key = Snail.getGroundKey(x, y, map.layouts[areaNumber]);
        if (direction === "left") {
            this.sprite.scale.x = -1;
            this.sprite.x -= this.sprite.width;
            key = key.replace("left", "right");
        }
        this.sprite.animations.add("move", keyToAnims[key], 10, true);
        this.sprite.play("move");
    }

    function Worm(x, y, key) {
        this.sprite = groups.worms.create(x, y, key);
        game.physics.arcade.enable(this.sprite);
        this.activated = false;
        this.sprite.animations.add("wiggle_left", [0, 1], 5, true);
        this.sprite.animations.add("wiggle_right", [2, 3], 5, true);
        this.sprite.play("wiggle_left");
        this.update = function () {
            var dead = false;
            var spikes = null;
            var collidesWith = ["grounds", "locks", "blocks", "cleargrounds"];
            for (var i = 0; i < arrays.spikes.length; i++) {
                spikes = arrays.spikes[i];
                game.physics.arcade.collide(spikes.sprite, this.sprite, function () {
                    if (this.sprite.body.velocity.x > 0) {
                        if (this.sprite.right - spikes.sprite.x < 20) {
                            return;
                        }
                    } else {
                        if (spikes.sprite.right - this.sprite.x < 20) {
                            return;
                        }
                    }
                    if (Math.abs(this.sprite.bottom - spikes.sprite.y) < 5 && spikes.state === 1) {
                        dead = true;
                        game.sound.play("worm_death");
                    }
                }, null, this);
            }
            for (var i = 0; i < collidesWith.length; i++) {
                game.physics.arcade.collide(groups[collidesWith[i]], this.sprite);
            }
            if (!this.activated) {
                game.physics.arcade.overlap(this.sprite, snail.sprite, function (wormSprite, snailSprite) {
                    this.activated = true;
                    game.sound.play("worm");
                }, null, this);
            } else {
                var INCREMENT = 5;
                var MAX_SPEED = 300;
                var diffX = (snail.sprite.x + snail.sprite.width / 2) - (this.sprite.x + this.sprite.width / 2);
                var absDiffX = Math.abs(diffX);
                var sign = (diffX === 0) ? 1 : diffX / absDiffX;
                var maxVel = (absDiffX > MAX_SPEED) ? MAX_SPEED : absDiffX;
                if (this.sprite.body.velocity.x / sign < maxVel) {
                    this.sprite.body.velocity.x += INCREMENT * sign;
                }
                if (this.sprite.animations.currentAnim !== ((sign < 0) ? "wiggle_right" : "wiggle_left")) {
                    this.sprite.play((sign < 0) ? "wiggle_right" : "wiggle_left");
                }
            }
            if (dead) {
                this.die();
            }
        };
        this.die = function () {
            var oldX = this.sprite.x;
            var oldY = this.sprite.y;
            var oldVel = this.sprite.body.velocity.x;
            var t = null;
            this.sprite.destroy();
            this.sprite = game.add.sprite(oldX, oldY, "worm_death");
            if (oldVel < 0) {
                this.sprite.x += 112;
                this.sprite.scale.setTo(-1, 1);
            } else {
                this.sprite.x -= 12;
            }
            this.sprite.animations.add("die");
            this.sprite.play("die", 10, false);
            var t = game.add.tween(this.sprite).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 2000);
            delete this.update;
        };
    }

    game.goToSaves = function(name) {
        SaveData.newGame = false;
        SaveData.map = JSON.parse(JSON.stringify(fileMap));
        SaveData.lampName = name;
        SaveData.lampPos = [areaNumber, Math.floor(arrays.flowers[0].sprite.y / 50) + 1, Math.floor(arrays.flowers[0].sprite.x / 50) - 2];
        SaveData.keysHad = JSON.parse(JSON.stringify(snail.keysHad));
        SaveData.lichenCount = snail.lichenCount;
        SaveData.powerups = snail.powerups;
        SaveData.dialogueStates = {};
        Snail.dialogues[areaNumber].forEach(function (controller) {
            SaveData.dialogueStates[controller.name] = controller.currentDialogue;
        });
        console.log(SaveData);
        localStorage.setItem("SamIsAnIdiot", JSON.stringify(SaveData));
        var saveDisplayText = game.add.text(0, 0, "Game saved", { font: "50px VT323", fill: "white" });
        Snail.centerThing(saveDisplayText);
        saveDisplayText.fixedToCamera = true;
        game.sound.play("save");
        var timer = game.time.create();
        timer.add(Phaser.Timer.SECOND * 2, function () {
            saveDisplayText.destroy();
        });
        timer.start();
        fromSaveDeath = true;
    };

    function setUpLevel(levelLayout) {
        var currentTile = null;
        var noUps = ["ground_inside_left", "ground_inside_right", "ground_top_left", "ground_top_right", "ground_inside_both"];
        var noDowns = ["ground_inside_left", "ground_inside_right", "ground_bottom_left", "ground_bottom_right", "ground_bottom_both", "ground_inside_both"];
        var spriteKey = '';
        var boingbugCounter = 0;
        var leafCounter = 0;
        var powerupCounter = 0;
        var redDragCounter = 0;
        var lampCounter = 0;
        var groundType = '';
        var savePos = {
            x: 0,
            y: 0
        };
        var soundsToStop = ["stinkbug", "rock_drag", "deer_walk", "deer_run"];
        soundsToStop.forEach(function (value, index) {
            game.sound.removeByKey(value);
        });
        for (var i = 0; i < levelLayout.length; i += 1) {
            while (levelLayout[i].length < Snail.GAME_WIDTH / 50) {
                levelLayout[i].push('g');
            }
        }
        while (levelLayout.length < Snail.GAME_HEIGHT / 50) {
            levelLayout.push([]);
            while (levelLayout[levelLayout.length - 1].length < levelLayout[0].length) {
                levelLayout[levelLayout.length - 1].push('g');
            }
        }
        game.world.setBounds(0, 0, levelLayout[0].length * 50, levelLayout.length * 50);
        for (i = 0; i < levelLayout.length; i += 1) {
            for (var j = 0; j < levelLayout[0].length; j += 1) {
                spriteKey = null;
                switch (levelLayout[i][j].toLowerCase()) {
                    case '!':
                        spriteKey = (SaveData.powerups.indexOf("scarf") > -1) ? "cat_scarf" : "caterpillar";
                        snail = new Player(j * 50, i * 50, spriteKey);
                        game.snail = snail;
                        snail.loadPowerups(SaveData.powerups);
                        break;
                    case '.':
                        currentTile = new DecFlow(j * 50, i * 50);
                        break;
                    case '2':
                        spriteKey = 'yellow_key';
                        currentTile = new Key(j, i, spriteKey, 'yellow', [i, j]);
                        arrays.keys.push(currentTile);
                        break;
                    case '@':
                        spriteKey = 'yellow_lock';
                        currentTile = new Lock(j * 50, i * 50, spriteKey, 'yellow', [i, j]);
                        arrays.locks.push(currentTile);
                        break;
                    case '3':
                        spriteKey = 'blue_key';
                        currentTile = new Key(j, i, spriteKey, 'blue', [i, j]);
                        arrays.keys.push(currentTile);
                        break;
                    case '#':
                        spriteKey = 'blue_lock';
                        currentTile = new Lock(j * 50, i * 50, spriteKey, 'blue', [i, j]);
                        arrays.locks.push(currentTile);
                        break;
                    case '>':
                        spriteKey = Snail.getSpikesKey(j, i, levelLayout);
                        currentTile = new Spikes(j * 50, i * 50, spriteKey, 'START_ON');
                        arrays.spikes.push(currentTile);
                        break;
                    case '<':
                        spriteKey = Snail.getSpikesKey(j, i, levelLayout);
                        currentTile = new Spikes(j * 50, i * 50, spriteKey, 'START_OFF');
                        arrays.spikes.push(currentTile);
                        break;
                    case '_':
                        spriteKey = 'bridge';
                        currentTile = new Bridge(j, i, spriteKey);
                        break;
                    case "}":
                        spriteKey = spriteKey ? spriteKey : "right";
                    case "{":
                        spriteKey = spriteKey ? spriteKey : "left";
                        currentTile = new SpeedBoost(j, i, spriteKey);
                        arrays.speedBoosts.push(currentTile);
                        break;
                    case ")":
                        spriteKey = "boy_worm";
                    case "(":
                        spriteKey = "girl_worm";
                        currentTile = new Worm(j * 50, i * 50, spriteKey);
                        arrays.worms.push(currentTile);
                        break;
                    case "7":
                        spriteKey = spriteKey ? spriteKey : "nw";
                    case "8":
                        spriteKey = spriteKey ? spriteKey : "ne";
                    case "9":
                        spriteKey = spriteKey ? spriteKey : "se";
                    case "0":
                        spriteKey = spriteKey ? spriteKey : "sw";
                        currentTile = new CornerStone(j, i, spriteKey);
                        arrays.cornerStones.push(currentTile);
                        break;
                    case 'a':
                        currentTile = new Ammo(j, i);
                        arrays.ammos.push(currentTile);
                        break;
                    case 'j':
                        currentTile = new Dragonfly(j, i);
                        arrays.dragonflies.push(currentTile);
                        break;
                    case 'b':
                        spriteKey = 'block';
                        currentTile = new Block(j * 50, i * 50, spriteKey);
                        arrays.blocks.push(currentTile);
                        break;
                    case 'c':
                        spriteKey = ("gz<>c".indexOf(levelLayout[i + 1]) > 0) ? "clear_ground" : "clear_ground_bottom";
                        currentTile = new Ground(game, j * 50, i * 50, spriteKey, 'clear');
                        break;
                    case 'd':
                        spriteKey = 'deer';
                        currentTile = new Deer(j * 50, i * 50 - 10, spriteKey, [i, j]);
                        arrays.deers.push(currentTile);
                        break;
                    case 'f':
                        spriteKey = spriteKeys.flowerLamp;
                        currentTile = new Flower(game, j * 50, (i - 1) * 50, spriteKey, map.lampNames[areaNumber][lampCounter]);
                        arrays.flowers.push(currentTile);
                        if (parseInt(SaveData.lampName.split(".")[1], 10) === lampCounter + 1) {
                            savePos.x = currentTile.sprite.body.position.x - 50;
                            savePos.y = currentTile.sprite.body.position.y + 50;
                        }
                        lampCounter += 1;
                        break;
                    case 'g':
                        spriteKey = Snail.getGroundKey(j, i, levelLayout);
                        if (noUps.indexOf(spriteKey) > -1 && noDowns.indexOf(spriteKey) > -1) {
                            groundType = 'noboth';
                        } else if (noUps.indexOf(spriteKey) > -1) {
                            groundType = 'noup';
                        } else if (noDowns.indexOf(spriteKey) > -1) {
                            groundType = "nodown";
                        } else {
                            groundType = 'solid';
                        }
                        currentTile = new Ground(game, j * 50, i * 50, spriteKey, groundType);
                        break;
                    case 'i':
                        currentTile = new Invisible(j, i);
                        arrays.invisibles.push(currentTile);
                        break;
                    case '%':
                        console.log(keyCounters.lichens);
                        currentTile = new Lichen(game, j, i, map, areaNumber, fileMap);
                        arrays.lichens.push(currentTile);
                        break;
                    case 'l':
                        spriteKey = 'leaf';
                        currentTile = new Leaf(j * 50 + 10, i * 50 + 11, spriteKey, leafCounter);
                        leafCounter += 1;
                        arrays.leaves.push(currentTile);
                        break;
                    case 'p':
                        spriteKey = 'powerup';
                        currentTile = new Powerup(j * 50, i * 50, spriteKey, map.powerupNames[areaNumber][powerupCounter], [i, j], powerupCounter);
                        powerupCounter++;
                        arrays.powerups.push(currentTile);
                        break;
                    case 'r':
                        currentTile = new RedDrag(game, j, i, map.redDragDirections[areaNumber][redDragCounter]);
                        arrays.redDrags.push(currentTile);
                        redDragCounter++;
                        break;
                    case 's':
                        spriteKey = 'stinkbug_walking';
                        currentTile = new Stinkbug(j * 50, i * 50, spriteKey, [i, j]);
                        arrays.stinkbugs.push(currentTile);
                        break;
                    case 't':
                        spriteKey = 'boing';
                        currentTile = new Boingbug(game, j * 50, i * 50, Snail.dialogues[areaNumber][boingbugCounter]);
                        boingbugCounter += 1;
                        arrays.boingbugs.push(currentTile);
                        break;
                    case "u":
                        if (!scarfHad) {
                            currentTile = new Scarf(j, i);
                            arrays.scarfs.push(currentTile);
                        }
                        break;
                    case 'w':
                        spriteKey = 'water';
                        currentTile = new Water(game, j, i, spriteKey, levelLayout[i - 1][j]);
                        arrays.waters.push(currentTile);
                        break;
                    case 'x':
                        currentTile = new SoftGround(j, i);
                        break;
                    case 'z':
                        spriteKey = Snail.getSpikesKey(j, i, levelLayout);
                        currentTile = new Spikes(j * 50, i * 50, spriteKey, 'STATIC');
                        arrays.spikes.push(currentTile);
                        break;
                    default:
                        break;
                }
            }
        }
        if (fromSave) {
            snail.sprite.x = savePos.x;
            snail.sprite.y = savePos.y;
        }
        game.world.bringToTop(groups.waters);
        game.world.bringToTop(groups.bridges);
        game.world.bringToTop(groups.softGrounds);
        game.world.bringToTop(groups.cleargrounds);
        game.world.bringToTop(groups.topLevel);
        dummyText.destroy();
        game.camera.x = snail.sprite.x - ((Snail.GAME_WIDTH - snail.sprite.width) / 2);
        game.camera.y = snail.sprite.y - ((Snail.GAME_HEIGHT - snail.sprite.height) / 2);
        firstFrame = true;
    }

    function resetLevel() {
        game.state.start("Game");
        // snail.sprite.destroy();
        // snail = null;
        // Object.keys(groups).forEach(function (keyy) {
        //     if (keyy !== "topLevel") {
        //         groups[keyy].destroy(true, true);
        //     }
        // });
        // Object.keys(arrays).forEach(function (keyy) {
        //     arrays[keyy] = [];
        // });
        // setUpLevel(map.layouts[areaNumber]);
    }

    function moveCamera() {
        var MARGIN_X = 150;
        var MARGIN_Y = 100;
        var SNAP_DISTANCE = 10;
        var RETURN_INC = 10;
        if (!shiftKey.isDown) {
            cameraBorder.forEach(function (it) { it.visible = false; });            
            var rightLimit = (snail.sprite.x + snail.sprite.width) - (Snail.GAME_WIDTH - MARGIN_X);
            if (game.camera.x < rightLimit) {
                if (rightLimit - game.camera.x < SNAP_DISTANCE) {
                    game.camera.x = rightLimit;
                } else {
                    game.camera.x += RETURN_INC;
                }
            } else {
                var leftLimit = snail.sprite.x - MARGIN_X;
                if (game.camera.x > leftLimit) {
                    if (game.camera.x - leftLimit < SNAP_DISTANCE) {
                        game.camera.x = leftLimit;
                    } else {
                        game.camera.x -= RETURN_INC;
                    }
                }
            }
            var bottomLimit = (snail.sprite.y + snail.sprite.height) - (Snail.GAME_HEIGHT - MARGIN_Y);
            if (game.camera.y < bottomLimit) {
                if (bottomLimit - game.camera.y < SNAP_DISTANCE) {
                    game.camera.y = bottomLimit;
                } else {
                    game.camera.y += RETURN_INC;
                }
            } else {
                var topLimit = snail.sprite.y - MARGIN_Y;
                if (game.camera.y > topLimit) {
                    if (game.camera.y - topLimit < SNAP_DISTANCE) {
                        game.camera.y = topLimit;
                    } else {
                        game.camera.y -= RETURN_INC;
                    }
                }
            }
        } else {
            cameraBorder.forEach(function (it) { 
                it.visible = true;
                game.world.bringToTop(it);
            });
            if (cursors.right.isDown) {
                game.camera.x += 5;
            }
            if (cursors.left.isDown) {
                game.camera.x -= 5;
            }
            if (cursors.up.isDown) {
                game.camera.y -= 5;
            }
            if (cursors.down.isDown) {
                game.camera.y += 5;
            }
        }
    }

    function pauseKeyPressed() {
        if (!game.paused) {
            var cx = game.camera.x;
            var cy = game.camera.y;
            var controlsText = "LEFT\nRIGHT\nUP\nDOWN\nENTER\nK\nM\nP\nB\nS\n";
            var resultsText = "Move left\nMove right\nJump\nDrag rock\nSelect Dialogue Option\nKill yourself\nMute/Unmute\nPause/Unpause\nRepeat boingbug conversation\nSave (at lamp)\n";
            game.paused = true;
            pauseBack = game.add.sprite(cx, cy, "text_back");
            pauseBack.alpha = 0.9;
            pauseText = game.add.text(Snail.GAME_WIDTH / 2 + cx, cy + 50, "Paused", { fill: "white", font: "30px VT323" });
            pauseText.anchor.setTo(0.5, 0.5);
            if (snail.hiding.canHide) {
                controlsText += "H\n";
                resultsText += "Hide\n";
            }
            if (snail.shooting.canShoot) {
                controlsText += "Q\n";
                resultsText += "Shoot\n";
            }
            controlsDisp = game.add.text(0, cy + 100, controlsText, { fill: "white", font: "16px VT323", align: "left" });
            resultsDisp = game.add.text(0, cy + 100, resultsText, { fill: "white", font: "16px VT323", align: "right" });
            controlsDisp.x = cx + (Snail.GAME_WIDTH - (controlsDisp.width + resultsDisp.width + 50)) / 2;
            resultsDisp.x = controlsDisp.x + controlsDisp.width + 50;
            pauseMainMenu = game.add.text(cx + 30, cy + 30, "Main Menu", { fill: "white", font: "20px VT323" });
            game.input.onDown.add(function (event) {
                if (event.x > pauseMainMenu.x - cx && event.x < pauseMainMenu.x + pauseMainMenu.width - cx
                    && event.y > pauseMainMenu.y - cy && event.y < pauseMainMenu.y + pauseMainMenu.height - cy) {
                    game.paused = false;
                    game.state.start("Saves");
                }
            }, self);
            game.sound.pauseAll();
        } else {
            pauseBack.destroy();
            pauseText.destroy();
            pauseMainMenu.destroy();
            controlsDisp.destroy();
            resultsDisp.destroy();
            game.sound.resumeAll();
            game.paused = false;
        }
    }

    function addKeys() {
        cursors = game.input.keyboard.createCursorKeys();
        game.cursors = cursors;
        enterKey = game.input.keyboard.addKey(13);
        saveKey = game.input.keyboard.addKey(83);
        killKey = game.input.keyboard.addKey(75);
        hideKey = game.input.keyboard.addKey(72);
        muteKey = game.input.keyboard.addKey(77);
        shootKey = game.input.keyboard.addKey(81);
        boingbugKey = game.input.keyboard.addKey(66);
        shiftKey = game.input.keyboard.addKey(16);
        pauseKey = game.input.keyboard.addKey(80);
        dropKey = game.input.keyboard.addKey(68);
        game.keys = {
            enterKey: enterKey,
            saveKey: saveKey,
            killKey: killKey,
            hideKey: hideKey,
            muteKey: muteKey,
            shootKey: shootKey,
            boingbugKey: boingbugKey,
            shiftKey: shiftKey,
            pauseKey: pauseKey,
            dropKey: dropKey
        };
    }

    this.create = function () {
        var startArea = 0;
        var tellToPause = null;
        var timer = null;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = gravityLevel;
        addKeys();
        pauseKey.inputEnabled = true;
        pauseKey.onUp.add(pauseKeyPressed);
        cursors.down.wasDown = false;
        game.input.onDown.add(function () {
            inputIsDown = true;
        }, this);
        game.input.onUp.add(function () {
            inputIsDown = false;
        }, this);
        muteKey.onDown.add(function () {
            game.sound.mute = !game.sound.mute;
        }, this);
        Object.keys(groups).forEach(function (keyy) {
            groups[keyy] = game.add.group();
        });
        background = game.add.tileSprite(0, 0, Snail.GAME_WIDTH, Snail.GAME_HEIGHT, "background");
        midground = game.add.tileSprite(0, 0, Snail.GAME_WIDTH, Snail.GAME_HEIGHT, "stars");
        midground.frame = 1;
        background.fixedToCamera = true;
        game.world.sendToBack(midground);
        midground.fixedToCamera = true;
        midground.tint = 0x4444dd;
        midground.samCounter = 0;

        var BORDER_MARGIN = 40;
        cameraBorder = [
            game.add.sprite(Snail.GAME_WIDTH -  BORDER_MARGIN - 20, Snail.GAME_HEIGHT - BORDER_MARGIN - 20, "camera_border"),
            game.add.sprite(Snail.GAME_WIDTH -  BORDER_MARGIN - 20, BORDER_MARGIN, "camera_border"),
            game.add.sprite(BORDER_MARGIN, BORDER_MARGIN, "camera_border"),
            game.add.sprite(BORDER_MARGIN, Snail.GAME_HEIGHT - BORDER_MARGIN - 20, "camera_border")            
        ];
        cameraBorder.forEach(function (it, index) {
            it.frame = index;
            it.fixedToCamera = true;
            it.visible = false;
        });

        game.world.sendToBack(background);
        map = JSON.parse(JSON.stringify(Snail.cleanMap));
        fileMap = JSON.parse(JSON.stringify(SaveData.map));
        startTime = (new Date()).getTime();
        dummyText = game.add.text(0, 0, "hi", Snail.textStyles.boingbox);
        if (!SaveData.newGame) {
            fromSave = true;
            var saveAreaInfo = SaveData.lampName.split(".");
            startArea = parseInt(saveAreaInfo[0], 10);
            for (var i = 0; i < fileMap.length; i++) {
                map.layouts[fileMap[i].a][fileMap[i].y][fileMap[i].x] = 'o';
            }
            Snail.dialogues[areaNumber].forEach(function (it) {
                var savedDialogueNumber = SaveData.dialogueStates[it.name];
                if (savedDialogueNumber === undefined) {
                    it.reset();
                } else {
                    it.setTo(savedDialogueNumber);
                }
            });
        }
        if (Snail.areaNumber === -1) {
            areaNumber = startArea;
        } else {
            areaNumber = Snail.areaNumber;
        }
        if (SaveData.powerups.indexOf("scarf") > -1) {
            scarfHad = true;
        }
        game.sound.destroy();
        setUpLevel(map.layouts[areaNumber]);
        keyCounters.yellow = new CountDisplay(10, 10, "yellow_key_icon", SaveData.keysHad.counts[SaveData.keysHad.colors.indexOf("yellow")] || 0);
        keyCounters.blue = new CountDisplay(50, 10, "blue_key_icon", SaveData.keysHad.counts[SaveData.keysHad.colors.indexOf("blue")] || 0);
        keyCounters.lichen = new CountDisplay(90, 10, "yolo", SaveData.lichenCount);
        arrays.lichens.forEach(function (lichen) { lichen.counter = keyCounters.lichen; });
        if (SaveData.powerups.indexOf("shoot") > -1) {
            keyCounters.ammo = new CountDisplay(90, 10, "flower_bullet", SaveData.ammo || 0);
        }
        game.sound.play(Snail.cleanMap.musics[areaNumber], 1, true);
    };

    this.update = function () {
        snail.update();
        background.tilePosition.set(game.camera.x * -0.3, game.camera.y * -0.3);
        midground.tilePosition.set(game.camera.x * -0.5, game.camera.y * -0.5);
        Object.keys(arrays).forEach(function (keyy) {
            var arr = arrays[keyy];
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i].hasOwnProperty('update')) {
                    arr[i].update();
                }
            }
        });
        moveCamera();
        cursors.down.wasDown = cursors.down.isDown;
    };
}

States.Game = function (game) {
    var gameState = null;
    this.create = function () {
        gameState = new GameState(game);
        gameState.create();
    };
    this.update = function () {
        gameState.update();
    };
};