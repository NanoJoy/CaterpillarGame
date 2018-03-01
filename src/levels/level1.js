
var levelOne = new Level();


var levelOneL = [
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g               3gggggg                                       g",
    "g 2        gwwwwwgggggg                                       g",
    "ggggggggg  gggggggggggg                                       g",
    "ggggggggg        gggggg                                       g",
    "ggggggggg        gggg          gggggggggggggggg               g",
    "gggggggggj >>>   g          gggg                              g",
    "ggggggggg   gg   g         gg                                 g",
    "ggggggggg        g   r             zzzz     r                 g",
    "ggggggggg       jg                 ggggzz     !               g",
    "ggggggggg        g           zzzzzzggggggzzzggg   ggggggggggggg",
    "ggggggggg        gzzzzzzzzzzzg                    ggggggggggggg",
    "gggggggggj   gggggg      gg   t b                jggggggggggggg",
    "gggggggggg   t   @i   s  i#   ggg   s    gggb    is    i      g",
    "gggggggggggggggggggggggggggggggggzzzzzzzzgggggggggggggggggggggg"
];

levelOne.layout = [];
levelOneL.forEach(function (row) {
    levelOne.layout.push(row.split(""));
});

var jumpTree = new DialogueTree("Thank you. I don't know if you can jump. If you can, it's by pressing UP.", [
    new DialogueOption("Ok", DIALOGUE_DONE)
]);

var whatHappenedToBoingbugTree = new DialogueTree("Two days ago this low vibration started Fluttertown. You probably can't hear it, but it seems " +
    "to have some physiological effect on Boingbugs. None of us can move! It's really a disaster. On top of that, our Stinkbugs have been driven mad by it and escaped. " +
    "My keys are upstairs. If you get them you can get out of here and explore.", [
        new DialogueOption("I'll see what I can do.", jumpTree),
        new DialogueOption("What's a Stinkbug?", new DialogueTree("They are gentle beasts we use for labor, but since the vibrations have started they seem wild. I would be careful around them.", [
            new DialogueOption("I'll see what I can do.", jumpTree)
        ]))
    ]);

var whatHappenedToMeTree = new DialogueTree("Wow. Well, get some rest I guess. I don't know if I'll have food for you anytime soon.", [
    new DialogueOption("You don't have any food? I'm pretty hungry.",
        new DialogueTree("Yeah, I'm hungry too. In fact I'm starving, but I can't move. I'm stuck vibrating like this.", [
            new DialogueOption("Why? What's going on?", whatHappenedToBoingbugTree),
            new DialogueOption("That's terrible.", whatHappenedToBoingbugTree)
        ])),
    new DialogueOption("Why are you shaking up and down like that? Is that what bugs around here do?", whatHappenedToBoingbugTree)
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
    ]),
    new DialogueTree("Great! Thank you so much! I think I left some lichens in the next room over. Can you please bring some to me? I'm starving.", [
        new DialogueOption("I don't think I can eat lichen.", new DialogueTree("I know... I know you come from far away and I'm sorry but what else are you going to do. It would be even better if you could find the source of that terrible vibration.", [
            new DialogueOption("I'll see what I can do.", DIALOGUE_DONE),
            new DialogueOption("Screw you. I don't owe you anything.", DIALOGUE_DONE)
        ])),
        new DialogueOption("I'll see what I can do.", DIALOGUE_DONE),
        new DialogueOption("I'm on it.", DIALOGUE_DONE)
    ]),
    new DialogueTree("... Uuugghhh... So hungry...", [
        new DialogueOption("...", DIALOGUE_DONE)
    ])
];

var lookAheadTrees = [
    new DialogueTree("If you are unsure what to do, it is wise to pause and take a look around. You can look around by holding SHIFT and using the arrow keys.", [
        new DialogueOption("Do you need food also?", new DialogueTree("Food would be nice, but I try to appreciate my memories of when I wasn't starving.", [
            new DialogueOption("Ok.", DIALOGUE_DONE)
        ])),
        new DialogueOption("Thanks for the advice.", DIALOGUE_DONE)
    ]),
    new DialogueTree("Not being able to move is fine. It lets me focus on my surroundings for a very long time.", [
        new DialogueOption("Ok.", DIALOGUE_DONE)
    ])
];

var levelOneDeciders = [
    function (game, owner, currentDialogue) {
        return 0;
    },
    function (game, owner, currentDialogue) {
        var numKeys = 0;
        for (var i = 0; i < game.snail.areaKeys.counts.length; i++) {
            numKeys += game.snail.areaKeys.counts[i];
        }
        return numKeys === 2 ? currentDialogue + 2 : currentDialogue + 1;
    },
    function (game, owner, currentDialogue) {
        var numKeys = 0;
        for (var i = 0; i < game.snail.areaKeys.counts.length; i++) {
            numKeys += game.snail.areaKeys.counts[i];
        }
        return numKeys === 2 ? currentDialogue + 1 : currentDialogue;
    },
    function (game, owner, currentDialogue) {
        return currentDialogue + 1;
    },
    null
];

var lookAheadDeciders = [
    function (game, owner, currentDialogue) {
        return 0;
    },
    function (game, owner, currentDialogue) {
        return 1;
    },
    null
]

levelOne.dialogue = [
    new DialogueController(lookAheadTrees, lookAheadDeciders),
    new DialogueController(levelOneTrees, levelOneDeciders)
];

levelOne.redDragDirections = ["right", "left"];