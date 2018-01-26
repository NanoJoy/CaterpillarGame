function getLevelOne() {
    var levelOne = new Level();


    var levelOneL = [
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "g               3g                                            g",
        "g 2        gwwwwwg                                            g",
        "ggggggggg  ggggggg                                            g",
        "ggggggggg        g                                            g",
        "ggggggggg        g                                            g",
        "gggggggggj >>>   g                                            g",
        "ggggggggg   gg   g                                            g",
        "ggggggggg        g                                            g",
        "ggggggggg       jg                                            g",
        "ggggggggg        g                                            g",
        "ggggggggg        g                                            g",
        "gggggggggj       g                                            g",
        "ggggggggggt     !@                                            g",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ];

    levelOne.layout = [];
    levelOneL.forEach(function (row) {
        levelOne.layout.push(row.split(""));
    });

    var whatHappenedToMeTree = new DialogueTree("Wow. Well, get some rest I guess. I don't know if I'll have food for you anytime soon.", [
        new DialogueOption("You don't have any food? I'm pretty hungry.",
            new DialogueTree("Yeah, I'm hungry too. In fact I'm starving, but I can't move. I'm stuck vibrating like this.", [
                new DialogueOption("Why? What's going on?", whatHappenedToBoingbugTree),
                new DialogueOption("That's terrible.", whatHappenedToBoingbugTree)
            ])),
        new DialogueOption("Why are you shaking up and down like that? Is that what bugs around here do?", whatHappenedToBoingbugTree)
    ]);

    var whatHappenedToBoingbugTree = new DialogueTree("get key", [
        new DialogueOption("Ok.", DIALOGUE_DONE)
    ]);

    var levelOneTrees = [
        new DialogueTree("Oh man, you're awake. What happened to you? Where did you come from?", [
            new DialogueOption("I come from CaterHill", new DialogueTree("That's very far from here - farther than I've ever even been from FlutterTown. What are you doing here?", [
                new DialogueOption("I almost just got eaten but an eagle killed the bird trying to eat me.", whatHappenedToMeTree)
            ])),
            new DialogueOption("I was just almost killed by a sparrow but I got dropped here.", whatHappenedToMeTree)
        ]),
        new DialogueTree("Hurry up and get those keys. I don't know if water will hurt you. I guess you'll just have to see.", [
            new DialogueOption("Ok.", DIALOGUE_DONE)
        ])
    ];

    var levelOneDeciders = [
        function (game, owner, currentDialogue) {
            return 0;
        },
        function (game, owner, currentDialogue) {
            return currentDialogue + 1;
        },
        null
    ];

    levelOne.dialogue = new DialogueController(levelOneTrees, levelOneDeciders);
    return levelOne;
}