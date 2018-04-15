var levelThree = new Level();

levelThree.lampNames = LevelUtils.createLampNames(3, 1);

levelThree.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                 ##   gg                 ggggggggggggg",
    "ggg                                             gggggggggggg                      gggg                  ggggggg   gg 2               ggggggggggggg",
    "ggg                            r                  gggggg                             @           }}}}}}}   g       ggggwwg d  b@     i s s i  gggg",
    "g                                  g    b                             zzzzzzzz       @           g         @    d  ggggwwgggggggggg>gggggggg  gggg",
    "gl   !  f    3 }}}}}     zzzzzzzzzzggggggggggg s s s s i       zzzzzzzggggggggzzzzzzzg           g   b  gggggggggggggggwwggl   @              gggg",
    "gggggggggg}}}}}2i  s   ij    3ggggggggggggggggggggggggggzzzzzzzgggggggggggggggggggggggggggggggggggwwwwww              gww gggggggggg             g",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwww                  ggggggt2 i      d      g",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg        i d     #       gggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggzzzzggggggggggggggggggggggggggg"
]);

var hideTree = new DialogueTree("If you have a way to camouflage yourself (If you can it's by pressing H) then it should be easy. Otherwise maybe you can just push for a long time. Now I think I want to go back to crying.", [
    new DialogueOption("Okay. Bye.", DIALOGUE_DONE)
])

var flowerTree = new DialogueTree("You're right, it's likely they will be, but I still don't completely trust flowers. Have you noticed that after you are revived, some things go back to how they were when you saved, but other things go back to how they were when you first saw them?", [
    new DialogueOption("Yes, I have noticed that.", new DialogueTree("You must be very observant.", [
        new DialogueOption("Uh, how do I get out of here?", hideTree)
    ])),
    new DialogueOption("No, I haven't noticed that.", new DialogueTree("I notice these things, but nobody seems to care.", [
        new DialogueOption("Uh, how do I get out of here?", hideTree)
    ]))
])

var adviceTrees = [
    new DialogueTree("*Sob* Oh noo... Oh no.. *Sob*", [
        new DialogueOption("What's up?", new DialogueTree("I just wanted to take my friends on a nice day trip to Slime City, but then this disaster happened. I don't know if they survived. It's all my fault. Why did this happen?", [
            new DialogueOption("How did you end up here?", new DialogueTree("After the humming started I could still move for a couple of seconds. These deer are crazy, and they always have been. Once they see you they won't stop chasing you. So anyway that one over there chased me in here. But I'm more worried about my friends.", [
                new DialogueOption("Maybe they can be resurrected at a flower?", flowerTree)
            ])),
            new DialogueOption("Can boingbugs be resurrected by those flowers?", flowerTree)
        ])),
        new DialogueOption("Bye", DIALOGUE_DONE)
    ]),
    new DialogueTree("*Sob* NNNNOOOOOOOooooooo....oooo... *Sob*", [
        new DialogueOption("Goodbye", DIALOGUE_DONE)
    ])
];

var adviceDeciders = [
    DEFAULT_FIRST_DECIDER,
    function (game, owner, currentDialogue) {
        return 1;
    },
    function (game, owner, currentDialogue) {
        return 1;
    }
];

levelThree.redDragDirections = [RedDragDirections.RIGHT];
levelThree.leafPointers = [1, 3];
levelThree.dialogue = [new DialogueController("crying", adviceTrees, adviceDeciders)];