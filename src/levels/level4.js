function getLevelFour() {
    var flowerNames = LevelUtils.createLampNames(4, 1);
    var layout = LevelUtils.transformOldToNewLevel([
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "ggggggggg !                    g       gb         ggggggg",
        "ggggggggggggg   f            3 g       ggggg      ggggggg",
        "g           gggggg          gggg       g               2g",
        "g           gggggg          gggg       #       j       gg",
        "g   <<<          g    j                gggggggggg      gg",
        "g   ggg>>> d i   gggggggggg}}}}}}      gggggggggggggggggg",
        "g    3gggggggg    g    g a a a gg     pgggggggggggggg   g",
        "gj    #s is2gg      d                          t  @@  l g",
        "ggggggggggggggggggggggggggggggggg>>>>>>gggggggggggggggggg",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ]);

    var locksTree = new DialogueTree("Alas, my keys have been scattered in this ongoing disaster and I cannot retrieve them. If you are wise and brave enough to get them both I will surely let you through.", [
        new DialogueOption("Relax. I'll get them.", DIALOGUE_DONE),
        new DialogueOption("Hark! It shall be done!", DIALOGUE_DONE)
    ]);

    var gateKeeperTrees = [
        new DialogueTree("Beyond these locks lies the door to Slime City, and I am its noble gatekeeper.", [
            new DialogueOption("Lemme in.", new DialogueTree("Such rudeness displeases me. Do not doubt that I can toss you upon the spikes!", [
                new DialogueOption("Go for it, dummy.", DIALOGUE_DONE),
                new DialogueOption("I apologize, fine bug. May I bypass these locks?", locksTree)
            ])),
            new DialogueOption("May I dare to inconvenience you so much by requesting entry?", locksTree)
        ], true),
        new DialogueTree("I have been practicing some magic. Would you care to be my guinea pig?", [
            new DialogueOption("Certainly.", DIALOGUE_DONE),
            new DialogueOption("No Way.", DIALOGUE_DONE),
            new DialogueOption("I shall decline.", DIALOGUE_DONE)
        ]),
        new DialogueTree("I am eternally grateful to you.", [
            new DialogueOption("It is my honor.", DIALOGUE_DONE),
            new DialogueOption("Leave me alone, weirdo.", DIALOGUE_DONE)
        ], true)
    ];

    gateKeeperTrees[0].onFinish = function (game, character, selectedOption) {
        if (selectedOption === "Go for it, dummy.") {
            game.snail.sprite.x = 35 * 50;
        }
    };

    gateKeeperTrees[1].onFinish = function (game, character, selectedOption) {
        if (selectedOption === "Certainly.") {
            game.snail.sprite.x = 14 * 50;
            game.snail.sprite.y = 2 * 50;
        } else if (selectedOption === "No Way.") {
            game.snail.sprite.x = 35 * 50;            
        }
    };

    gateKeeperTrees[2].onFinish = function (game, character, selectedOption) {
        if (selectedOption === "Leave me alone, weirdo.") {
            game.snail.sprite.x = 35 * 50;
        }
    };

    function getNumberOfYellowKeys(game) {
        return game.snail.areaKeys.counts[game.snail.areaKeys.colors.indexOf("yellow")];
    }

    var gateKeeperDeciders = [
        function (game, owner, currentDialogue) {
            return getNumberOfYellowKeys(game) === 2 ? 2 : 0;
        },
        function (game, owner, currentDialogue) {
            return getNumberOfYellowKeys(game) === 2 ? 2 : 1;
        },
        function (game, owner, currentDialogue) {
            return getNumberOfYellowKeys(game) === 2 ? 2 : 1;
        },
        function (game, owner, currentDialogue) {
            return 2;
        }
    ];

    var dialogues = [new DialogueController("gatekeeper", gateKeeperTrees, gateKeeperDeciders)];
    return new Level(layout, dialogues, [], flowerNames, null, [0]);
}