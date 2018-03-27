var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 1);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g                                                                                                   ",
    "g! f                                                                                                ",
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
console.log(levelTwo.layout);

levelTwo.dialogue = [];
levelTwo.redDragDirections = [RedDragDirections.RIGHT];