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
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggg                 ##   gg                 ggggggggggggg",
    "  gggggggggggg                      gggg                  ggggggg   gg 2               ggggggggggggg",
    "    gggggg                             @           }}}}}}}   g       ggggwwg d  b@   i i s s i  gggg",
    "                        zzzzzzzz       @           g  b      @    d  ggggwwggggggggggggggggggg  gggg",
    " s s s s i       zzzzzzzggggggggzzzzzzzg           gwwwwww   ggggggggggggwwgg                   gggg",
    "ggggggggggzzzzzzzggggggggggggggggggggggggggggggggggg                     ww gggggggggg             g",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggg                        gggggggggg      d      g",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggg        i d     #       gggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggzzzzggggggggggggggggggggggggggg"
], 10);

levelTwo.dialogue = [];
levelTwo.redDragDirections = [RedDragDirections.RIGHT];