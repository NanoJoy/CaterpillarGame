var States = window.States || {};
States.PartEnd = function (game) {
    var topText = null;
    var bottomText = null;
    var scarfSprite = null;
    var enterKey = null;
    var textStyle = { fill: "white", font: "30px VT323" };
    var savesHelper = new SavesHelper();

    function enterPressed() {
        game.state.start("Saves");
    }

    this.create = function () {
        SaveData.partsBeaten += 1;
        savesHelper.setPartEndData();

        game.stage.backgroundColor = 0x280051;
        scarfSprite = game.add.sprite(0, 0, spriteKeys.caterpillarScarf);
        Snail.centerThing(scarfSprite);
        topText = game.add.text(0, 0, "End of Part 1" +
        "Coming soon: Caterpillar Game Part 2: Slime City\n", textStyle);
        Snail.centerThing(topText);
        topText.y = 50;
        bottomText = game.add.text(0, 0, "You can now replay Part 1 wearing a scarf!\n" +
            "Press Enter to return to main menu", textStyle);
        Snail.centerThing(bottomText);
        bottomText.y = Snail.GAME_HEIGHT - 100;

        enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(enterPressed);
    }
};