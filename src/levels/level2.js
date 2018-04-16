function getLevelTwo() {
    var levelTwo = new Level();

    levelTwo.lampNames = LevelUtils.createLampNames(2, 1);

    levelTwo.layout = LevelUtils.transformOldToNewLevel([
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggggggggggg              ggggg            g",
        "ggggggggggggggggggggggggggg                     ggg 2           g",
        "g                                                g       gg     g",
        "g ! f                                t         b         gggg l g",
        "gggggg}}}}}zzzzzzzz}}}}}zzzz}}}s s 2gggg 3 gggggggwwwwwgggggggggg",
        "gggggggggggggggggggggggggggggggggggggggg>>>gggggggwwwwwgggggggggg",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ]);

    var slimeCityTree = new DialogueTree("Slime City is to the east. Most of the bugs there are of the squishier types, like slugs or worms. I don't think the vibrations would harm them like it does us boingbugs. Most of the lichen we eat in FlutterTown is grown there.", [
        new DialogueOption("Do you have any idea where these vibrations are coming from?", new DialogueTree("Now that you mention it, last time I was in Slime City I met this superstitious slug who kept saying how it's been 100 years since the last Great Breeding, and we're due for another one. No idea what that means though. Probably nothing.", [
            new DialogueOption("Welp, thanks for the info.", DIALOGUE_DONE)
        ])),
        new DialogueOption("Welp, I'm on my way.", DIALOGUE_DONE)
    ]);

    var highwayTrees = [
        new DialogueTree("I was just about to set out to Slime City when this terrible shaking started. From what I can see it destroyed the whole highway. Not that it matters to me anyway.", [
            new DialogueOption("What is Slime City?", slimeCityTree),
            new DialogueOption("Are you okay?", new DialogueTree("Yes, I've been around a lot, and I've survived worse than this. But, if you want to help, you can travel to Slime City and try to figure out what's going on.", [
                new DialogueOption("Tell me more.", slimeCityTree),
                new DialogueOption("Honestly I don't care.", new DialogueTree("Well, I don't know where you think you're going then. This road only leads to Slime City.", [
                    new DialogueOption("Uh, cool.", DIALOGUE_DONE)
                ]))
            ]))
        ], true),
        new DialogueTree("Try to enjoy the trip.", [
            new DialogueOption("I will.", DIALOGUE_DONE),
            new DialogueOption("I won't.", DIALOGUE_DONE)
        ])
    ];

    var highwayDeciders = [
        DEFAULT_FIRST_DECIDER,
        function (game, owner, currentDialogue) {
            return 1;
        },
        function (game, owner, currentDialogue) {
            return 1;
        }
    ];

    levelTwo.dialogue = [new DialogueController("slimeCity", highwayTrees, highwayDeciders)];
    levelTwo.leafPointers = [2];
    return levelTwo;
}