var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 1);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggg              ggggg            g",
    "ggggggggggggggggggggggggggg                     ggg 2           g",
    "g                                                g       gg     g",
    "g ! f                                          b         gggg l g",
    "gggggg}}}}}zzzzzzzz}}}}}zzzz}}}s s 2gggg 3 gggggggwwwwwgggggggggg",
    "gggggggggggggggggggggggggggggggggggggggg>>>gggggggwwwwwgggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
]);

levelTwo.dialogue = [];
levelTwo.leafPointers = [2];