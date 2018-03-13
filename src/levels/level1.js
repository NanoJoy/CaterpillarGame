
var levelOne = new Level();

levelOne.layout = transformOldToNewLevel([
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g               2gggggg3                                      g",
    "g 2        gwwwwwgggggg  wwwww                                g",
    "gggggggg   gggggggggggg  wwwww                                g",
    "gggggggg         gggggg                                       g",
    "gggggggg         gggg          gggggggggggggggggggg           g",
    "ggggggggj  >>>   gg         gggg                  g           g",
    "ggggggggg        g         gg                     g           g",
    "ggggggggg        g   r             zzzz     r     g           g",
    "ggggggggg      j g                 ggggzz         g           g",
    "ggggggggg        #t          zzzzzzggggggzzzggg   ggggggggggggg",
    "ggggggggg        gggzzzzzzzzzg                    ggggggggggggg",
    "gggggggggj   gggggg      gg   t b         f      jggggggggggggg",
    "gggggggggg   t ! @i   s  i@   ggg   s    gggb    is    i      g",
    "gggggggggggggggggggggggggggggggggzzzzzzzzgggggggggggggggggggggg"
]);

var jumpTree = new DialogueTree("Thank you. I don't know if you can jump. If you can, it's by pressing UP.", [
    new DialogueOption("Ok", DIALOGUE_DONE)
]);

var whatHappenedToBoingbugTree = new DialogueTree("Two days ago this low vibration started in Fluttertown. You probably can't hear it, but it seems " +
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
    ], true),
    new DialogueTree("Hurry up and get those keys. I don't know if water will hurt you. I guess you'll just have to see.", [
        new DialogueOption("Ok.", DIALOGUE_DONE)
    ], false),
    new DialogueTree("Great! Thank you so much! I think I left some lichens in the next room over. Can you please bring some to me? I'm starving.", [
        new DialogueOption("I don't think I can eat lichen.", new DialogueTree("I know... I know you come from far away and I'm sorry but what else are you going to do. It would be even better if you could find the source of that terrible vibration.", [
            new DialogueOption("I'll see what I can do.", DIALOGUE_DONE),
            new DialogueOption("Screw you. I don't owe you anything.", DIALOGUE_DONE)
        ])),
        new DialogueOption("I'll see what I can do.", DIALOGUE_DONE),
        new DialogueOption("I'm on it.", DIALOGUE_DONE)
    ], true),
    new DialogueTree("... Uuugghhh... So hungry...", [
        new DialogueOption("...", DIALOGUE_DONE)
    ], false)
];

levelOneTrees[0].onFinish = function (game, character, selectedOption) { 
    console.log("You chose " + selectedOption);
}

var lookAheadTrees = [
    new DialogueTree("If you are unsure what to do, it is wise to pause and take a look around. You can look around by holding SHIFT and using the arrow keys.", [
        new DialogueOption("Do you need food also?", new DialogueTree("Food would be nice, but I try to appreciate my memories of when I wasn't starving.", [
            new DialogueOption("Ok.", DIALOGUE_DONE)
        ])),
        new DialogueOption("Thanks for the advice.", DIALOGUE_DONE)
    ], false),
    new DialogueTree("Not being able to move is fine. It lets me focus on my surroundings for a very long time.", [
        new DialogueOption("Ok.", DIALOGUE_DONE)
    ])
];

var flowerTree = new DialogueTree("I'm going to let you in on a secret since times are so strange here. There are special flowers that grow here in FlutterTown. When you walk past them it feels like they are asking your permission for something. If you let them in... If you just say yes then if something bad happens to you you will wake up and find yourself as you were when you first passed the flower. Did you pass a flower like this by any chance?", [
    new DialogueOption("Yes.", new DialogueTree("Good. Well, you can press K, or there are some spikes right there.", [new DialogueOption("Ok.", DIALOGUE_DONE)])),
    new DialogueOption("No.", new DialogueTree("Well, I suppose you could wait here and we could die together. But I don't know how long that will take. I just ate a whole lot.", [
        new DialogueOption("See ya.", DIALOGUE_DONE),
        new DialogueOption("Where did you get the food?", new DialogueTree("It's over that ledge up there and down a bit. There's still a lot left.", [new DialogueOption("Ok", DIALOGUE_DONE)])),
        new DialogueOption("How long will it take for me to die if I just sit here?", new DialogueTree("I have no idea.", [new DialogueOption("Ok.", DIALOGUE_DONE)]))
    ]))
])

var stuckTrees = [
    new DialogueTree("I don't think you should have come down here. I mean, I'm stuck here no matter what, but I think you are too now unless you can walk on spikes.", [
        new DialogueOption("Uh oh. What should I do?", flowerTree),
        new DialogueOption("Good thing I can walk on spikes.", new DialogueTree("Cool! Can you show me?", [
            new DialogueOption("Yes, I will!", DIALOGUE_DONE),
            new DialogueOption("Just kidding. I'm screwed. Can you help me?", flowerTree)
        ]))
    ]),
    new DialogueTree("I guess you can't walk on spikes.", [
        new DialogueOption("*Resigned sigh*", flowerTree),
        new DialogueOption("*Defiant sigh*", flowerTree)
    ]),
    new DialogueTree("Still here, huh? Okay, I'll sing you a song.", [
        new DialogueOption("Sounds good.", DIALOGUE_DONE),
        new DialogueOption("Please don't.")
    ])
]

stuckTrees[0].onFinish = function (game, bug, selectedOption) {
    bug.useSecondDialogue = selectedOption == "Yes, I will!";
}

var stuckDeciders = [
    function (game, owner, currentDialogue) {
        return 0;
    },
    function (game, owner, currentDialogue) {
        return owner.useSecondDialogue ? 1 : 2;
    },
    null,
    null
]

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
    new DialogueController("stuck", stuckTrees, stuckDeciders),
    new DialogueController("lookAhead", lookAheadTrees, lookAheadDeciders),
    new DialogueController("firstBoingbug", levelOneTrees, levelOneDeciders)
];

levelOne.redDragDirections = ["right", "left"];