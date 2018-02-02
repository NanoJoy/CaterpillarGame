var States = window.States || {};
var Snail = window.Snail || Initialize();
var SaveState = function (game) {
    var titleText = null;
    var background = null;
    var border = null;
    var newGameButton = null;
    var loadGameButton = null;
    var selectedButton = null;
    var currentStorage = null;
    var file = {
        map: [],
        lampName: "newgame",
        lampPos: [],
        powerups: [],
        keysHad: {
            colors: [],
            counts: []
        }
    };
    var keys = {
        up: null,
        down: null,
        enter: null
    }

    function Button(y, text) {
        var TINT_COLOR = "#8c8c8c";
        var WHITE = "#3cc60c";
        var displayText = game.add.text(0, 0, text, { fill: WHITE, stroke: "#000000", strokeThickness: 2, font: "30px VT323" });
        var that = this;
        displayText.y = y - displayText.height / 2;
        displayText.x = (Snail.GAME_WIDTH - displayText.width) / 2;
        displayText.inputEnabled = true;
        displayText.events.onInputDown.add(enterPressed);
        this.select = function () {
            var f = displayText.style;
            f.fill = WHITE;
            displayText.setStyle(f);
            if (that === newGameButton && loadGameButton) {
                loadGameButton.unselect();
            } else if (that === loadGameButton) {
                newGameButton.unselect();
            }
            selectedButton = that;
            game.sound.play("menu_beep");
        };
        this.unselect = function () {
            var f = displayText.style;
            f.fill = TINT_COLOR;
            displayText.setStyle(f);
        };
        displayText.events.onInputOver.add(this.select);
        displayText.events.onInputOut.add(this.unselect);
        displayText.events.onInputDown.add(enterPressed);
    }

    function enterPressed() {
        if (currentStorage === null || selectedButton === newGameButton) {
            Snail.file = file;
        } else {
            Snail.file = JSON.parse(currentStorage);
        }
        Snail.areaNumber = Snail.cleanMap.lampNames.indexOf(Snail.file.lampName);
        if (Snail.areaNumber === -1) {
            Snail.areaNumber = 0;
        }
        if (selectedButton === newGameButton) {
            game.state.start("Intro");
        } else {

            game.state.start("Midload");
        }
    }

    function upOrDownPressed() {
        if (selectedButton === newGameButton) {
            newGameButton.unselect();
            loadGameButton.select();
            selectedButton = loadGameButton;
        } else {
            loadGameButton.unselect();
            newGameButton.select();
            selectedButton = newGameButton;
        }
    }

    this.create = function () {
        currentStorage = localStorage.getItem("CaterpillarGame");
        background = game.add.tileSprite(0, 0, Snail.GAME_WIDTH, Snail.GAME_HEIGHT, "menu_background");
        background.tint = 0xc6c6c6;
        border = game.add.image(0, 0, "start_border");
        titleText = game.add.sprite(0, 50, "logo");
        titleText.x = (Snail.GAME_WIDTH - titleText.width) / 2;
        newGameButton = new Button(300, 'New Game');
        if (currentStorage !== null) {
            loadGameButton = new Button(350, 'Continue');
            keys.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            keys.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            keys.up.onDown.add(upOrDownPressed);
            keys.down.onDown.add(upOrDownPressed);
            newGameButton.unselect();
            selectedButton = loadGameButton;
        } else {
            selectedButton = newGameButton;
        }
        keys.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        keys.enter.onDown.add(enterPressed);
        game.sound.play("menu_music", 1, true);
    };

    this.update = function () {
        background.tilePosition.y -= 0.25;
    };
};

States.Saves = function (game) {
    var saveState = new SaveState(game);
    this.create = function () {
        saveState.create();
    };
    this.update = function () {
        saveState.update();
    };
};