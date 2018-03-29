var States = window.States || {};
States.Intro = function (game) {
    var pressEnterText;
    var enterKey;
    var skipText
    var skipKey;
    var storyText;
    var storyCount = 0;

    var story = [
        "At the end of spring young caterpillars are ready to leave their life on the ground and try to make it as butterflies. Like other caterpillars, Sim was nervously heading toward the Wrapping Tree, where they would attach themselves to a leaf and start the metamorphosis process.",
        "While climbing, Sim gave a nod of respect to the guard butterflies surrounding the tree. These were the strongest and sharpest insects around, ready to swarm and fight against any danger from above. While Sim had fantasized about being a guard butterfly before, it was not really a realistic goal.",
        "\"Hey Sim,\" shouted Sim's friend Droopl from a few branches over, \"See you on the other side! There's nothing to worry about, okay?\" Droopl knew that Sim was a worrier. \n\"Yeah, I know. Good luck!\" Sim replied.",
        "Some commotion caught Sim's attention. High above the tree the guard butterflies started shouting and bunching together into a tactical net. Yet a shadow blocking the morning sun could be seen through the flurry of wings.",
        "In an instant, tremendous talons emerged through the net, shredding several butterflies. A strange eagle, with coloring Sim had never seen before, was piercing toward the Wrapping Tree. Before Sim could scream, another much smaller talon grabbed them from behind and tore them from the tree.",
        "Droopl and Sim screamed each other's names as the sparrow carrying Sim flew higher and farther from the tree. Sim turned to see the eagle pursuing his attacker. The tiny sparrow, finally realizing what was happening, began flapping furiously and dove closer to the ground.",
        "The eagle's shriek of victory was followed by the sparrow's yelp of death as the small bird's blood splattered across Sim's face. The sparrow's grip loosened, and Sim fell to the ground, father from home than they'd ever been before.",
        "When Sim woke it was nighttime. Nothing looked familiar..."
    ];

    function enterPressed() {
        if (storyCount < story.length - 1) {
            storyCount++;
            displayStory();
        } else {
            game.state.start("Midload");
        }
    }

    function displayStory() {
        if (storyText != null) {
            storyText.destroy();
        }
        storyText = game.add.text(50, 50, story[storyCount], { fill: "white", font: "20px VT323" });
        storyText.wordWrap = true;
        storyText.wordWrapWidth = Snail.GAME_WIDTH - 100;
        Snail.centerThing(storyText);
    }

    this.create = function() {
        game.stage.backgroundColor = 0x280051;

        pressEnterText = game.add.text(0, 0, "Press Enter", { fill: "white", font: "30px VT323" });
        Snail.centerThing(pressEnterText);
        pressEnterText.y = Snail.GAME_HEIGHT - 50;

        skipText = game.add.text(0, 0, "Press S to skip", { fill: "white", font: "12px VT323" });
        Snail.centerThing(skipText);
        skipText.y = Snail.GAME_HEIGHT - 20;

        displayStory();

        enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(enterPressed);

        skipKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
        skipKey.onUp.add(function () {
            game.state.start("Midload");
        });
    };

};