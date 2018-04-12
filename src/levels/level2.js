var levelTwo = new Level();

levelTwo.lampNames = LevelUtils.createLampNames(2, 2);

levelTwo.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggg              ggggg                                                ",
    "ggggggggggggggggggggggggggg                     ggg 2                                r              ",
    "g                                                g       gg                              g    b     ",
    "g !                                            b         gggg  f   3 }}}}}     zzzzzzzzzzggggggggggg",
    "gggggg}}}}}zzzzzzzz}}}}}zzzz}}}s s 2gggg 3 gggggggwwwwwggggggggg}}}}}2i  s   ij    3gggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggg>>>gggggggwwwwwggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggggg                 ##   gg                          g",
    "  gggggggggggg                         gggg                  ggggggg   gg                          g",
    "    gggggg                                @           }}}}}}}   g       g                          g",
    "                        zzzzzzzzzzz       @           g         @    d  g                          g",
    "ssssssss i       zzzzzzzgggggggggggzzzzzzzg           g         ggggggggg                          g",
    "ggggggggggzzzzzzzgggggggggggggggggggggggggggggggggggggg                ggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggg                ggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
], 9);

levelTwo.dialogue = [];
levelTwo.redDragDirections = [RedDragDirections.RIGHT];