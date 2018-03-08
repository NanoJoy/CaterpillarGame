function ResponseBox(game, diTree, parent) {
    var TRANSPARENCY = 0.9;
    var MARGIN_X = 30;
    var MARGIN_Y = 30;
    var OPTION_SPACING = 20;
    var origTree = diTree;
    var backSprite = game.add.sprite(0, 0, 'text_back');
    var prompt = game.add.text(MARGIN_X, MARGIN_Y, diTree.prompt, Snail.textStyles.boingbox);
    var helper = game.add.text((Snail.GAME_WIDTH / 2) + game.camera.x, Snail.GAME_HEIGHT + game.camera.y - MARGIN_Y - 30,
        "Use UP and DOWN to move cursor, ENTER to choose", Snail.textStyles.boingbox);
    var numOptions = diTree.options.length;
    var selectedOption = 0;
    var options = [];
    this.showing = true;
    game.physics.arcade.isPaused = true;
    pauseAnimations(true);
    backSprite.fixedToCamera = true;
    backSprite.alpha = TRANSPARENCY;
    prompt.fixedToCamera = true;
    prompt.wordWrap = true;
    prompt.wordWrapWidth = Snail.GAME_WIDTH - MARGIN_X * 2;
    helper.anchor.x = 0.5;
    for (var i = 0; i < numOptions; i++) {
        options[i] = game.add.text(prompt.x + 20, prompt.bottom + (OPTION_SPACING * (i + 1)), diTree.options[i].text, Snail.textStyles.boingbox);
        options[i].fixedToCamera = true;
    }
    var textPointer = game.add.sprite(game.camera.x + prompt.x, prompt.bottom + OPTION_SPACING + game.camera.y, 'text_pointer');
    game.cursors.down.onDown.add(function () {
        if (selectedOption < numOptions - 1) {
            textPointer.y += OPTION_SPACING;
            selectedOption++;
            game.sound.play("menu_beep");
        }
    });
    game.cursors.up.onDown.add(function () {
        if (selectedOption > 0) {
            textPointer.y -= OPTION_SPACING;
            selectedOption--;
            game.sound.play("menu_beep");
        }
    });
    game.keys.enterKey.onDown.add(function () {
        if (diTree.options[selectedOption].tree === DIALOGUE_DONE) {
            game.physics.arcade.isPaused = false;
            pauseAnimations(false);
            backSprite.destroy();
            prompt.destroy();
            helper.destroy();
            for (i = 0; i < options.length; i++) {
                options[i].destroy();
            }
            textPointer.destroy();
            game.cursors.up.onDown.removeAll();
            game.cursors.down.onDown.removeAll();
            game.keys.enterKey.onDown.removeAll();
            this.showing = false;
            diTree = origTree;
            parent.boxDone(diTree.options[selectedOption].text);
        } else {
            game.sound.play("menu_beep");
            for (i = 0; i < options.length; i++) {
                options[i].destroy();
            }
            diTree = diTree.options[selectedOption].tree;
            prompt.text = diTree.prompt;
            options = [];
            numOptions = diTree.options.length;
            for (var i = 0; i < numOptions; i++) {
                options[i] = game.add.text(prompt.x + 20, prompt.bottom + (OPTION_SPACING * (i + 1)), diTree.options[i].text, Snail.textStyles.boingbox);
                // options[i].fixedToCamera = true;
            }
            selectedOption = 0;
            textPointer.y = prompt.bottom + OPTION_SPACING;
        }
    });
    

    function pauseAnimations(paused) {
        game.snail.sprite.animations.paused = paused;
        game.groups.stinkbugs.forEach(function (stinkbugSprite) {
            stinkbugSprite.animations.paused = paused;
        }, this, true);
        game.groups.boingbugs.forEach(function (boingbugSprite) {
            boingbugSprite.animations.paused = paused;
        }, this, true);
    }
}