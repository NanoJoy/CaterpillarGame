var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 2);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggg              ggggg                                                ",
    "ggggggggggggggggggggggggggg                     ggg 2                                               ",
    "g                                                g       gg                      r                  ",
    "g !                                            b         gggg  f   3 }}}}}          gggggggggggggggg",
    "gggggg}}}}}zzzzzzzz}}}}}zzzz}}}s s 2gggg 3 gggggggwwwwwggggggggg}}}}}2i  s   ij     gggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggg>>>gggggggwwwwwggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    //"gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    //"gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    //"                                                                                                    ",
    //"                                                                                                    ",
    //"                                                    j    zzzzz                                      ",
    //"    f           zzgggzz       bi s s s i                                  zzzzzzzzz   f             ",
    //"gggggg}}}}}}}}}}gggggggzzz}}}}}zzzzzzzzzggg}}}}ggggggggggzzzzzzzzzzzzzzzzzgggggggggggggggggggggggggg",
    //"gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    //"gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
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