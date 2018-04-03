function Spikes(game, x, y, key, type) {
    var snail = game.snail;
    var spikeStates = {
        ON: 1,
        OFF: 2
    };
    var spikeTypes = {
        STATIC: "STATIC",
        START_ON: "START_ON",
        START_OFF: "START_OFF"
    };
    var rate = 60;
    var changeCounter = rate;
    this.sprite = game.groups.spikess.create(x, y, key);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    switch (type) {
        case spikeTypes.STATIC:
            this.type = spikeTypes.STATIC;
            this.state = spikeStates.ON;
            break;
        case spikeTypes.START_ON:
            this.type = spikeTypes.START_ON;
            this.state = spikeStates.ON;
            break;
        case spikeTypes.START_OFF:
            this.type = spikeTypes.START_OFF;
            this.state = spikeStates.OFF;
            this.sprite.frame = 1;
            break;
        default:
            throw new Error(type + ' is not a valid spike type.');
    }

    
    if (this.type !== spikeTypes.STATIC) {
        this.update = function () {
            if (changeCounter === 0) {
                this.changeState();
                changeCounter = rate;
            } else {
                changeCounter--;
            }
        };
    }

    this.playerTouch = function () {
        var MARGIN = 10;
        var rightPos = false;
        var rightHeight = (game.snail.sprite.bottom <= this.sprite.top);
        var playerLeft = (game.snail.sprite.x < this.sprite.x);
        if (game.snail.touchingGround) {
            if (playerLeft) {
                rightPos = (this.sprite.x - game.snail.sprite.x < game.snail.sprite.width - MARGIN);
            } else {
                rightPos = (game.snail.sprite.x < this.sprite.right - MARGIN);
            }
        } else {
            rightPos = true;
        }
        if (this.state === spikeStates.ON && !game.snail.inPain && rightHeight && rightPos) {
            game.snail.getHurt(1);
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