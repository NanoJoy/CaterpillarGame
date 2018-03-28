var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 0);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g                                                                                                   ",
    "g!                                                                                                  ",
    "gggg}}}}                                                                                            ",
    "g         r                                                                                         ",
    "g                                                                                                   ",
    "g                                                                                                   ",
    "g                                                                                                   ",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "                                                                                                   g",
    "                                                                                                   g",
    "                                                                                                   g",
    "                                                                                                   g",
    "                                                                                                   g",
    "                                                                                                   g",
    "                                                                                                   g",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
], 9);

levelTwo.dialogue = [];
levelTwo.redDragDirections = [RedDragDirections.RIGHT];