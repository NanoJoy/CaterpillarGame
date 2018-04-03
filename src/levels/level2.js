var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 0);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g                                                                                                   ",
    "g                                                                                                   ",
    "g                                                  ggggggggggggggggg                                ",
    "g                                                                                                   ",
    "g                                                                                                   ",
    "g                                                   j    zzzzz                                      ",
    "g !             zzgggzz       bi s s s i                                                            ",
    "gggggg}}}}}}}}}}gggggggzzz}}}}}zzzzzzzzz}}}}}}}ggggggggggggggggggggggggggggggggggggggggggggggggggggg",
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