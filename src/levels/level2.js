var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 2);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "g                                                                                                   ",
    "g                                                                                                   ",
    "g                                                   j    zzzzz                                      ",
    "g ! f           zzgggzz       bi s s s i                                  zzzzzzzzz   f             ",
    "gggggg}}}}}}}}}}gggggggzzz}}}}}zzzzzzzzzggg}}}}ggggggggggzzzzzzzzzzzzzzzzzgggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
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