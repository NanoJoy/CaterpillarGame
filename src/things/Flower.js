function Flower(game, x, y, key, name) {
    this.sprite = game.groups.flowers.create(x, y, key);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    this.sprite.body.immovable = true;
    this.name = name;
    this.isOn = false;
    
    var wasOverlapping = false;

    var dialogueTree = new DialogueTree("Save game?", [
        new DialogueOption("YES", DIALOGUE_DONE),
        new DialogueOption("NO", DIALOGUE_DONE)
    ], true);
    dialogueTree.onFinish = function (game, character, selectedOption) {
        if (selectedOption === "YES") {
            game.goToSaves();
        }
    }

    var responseBox = null;

    this.update = function () {
        var overlapping = false;
        game.physics.arcade.overlap(this.sprite, game.snail.sprite, function () {
            overlapping = true;
            this.sprite.frame = 1;
            this.isOn = true;
        }, null, this);
        if (overlapping && !wasOverlapping) {
            wasOverlapping = true;
            responseBox = new ResponseBox(game, dialogueTree, this);
        }
        if (!overlapping && this.isOn) {
            this.sprite.frame = 0;
            this.isOn = false;
            wasOverlapping = false;
        }
    };

    this.boxDone = function (selectedOption) {
        dialogueTree.onFinish(game, this, selectedOption);
    }
}