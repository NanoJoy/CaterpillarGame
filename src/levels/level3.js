var levelThree = new Level();

levelThree.lampNames = LevelUtils.createLampNames(3, 1);

levelThree.layout = LevelUtils.transformOldToNewLevel([
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                 ##   gg                 ggggggggggggg",
    "ggg                                             gggggggggggg                      gggg                  ggggggg   gg 2               ggggggggggggg",
    "ggg                            r                  gggggg                             @           }}}}}}}   g       ggggwwg d  b@     i s s i  gggg",
    "g                                  g    b                             zzzzzzzz       @           g         @    d  ggggwwgggggggggg>gggggggg  gggg",
    "gl   !  f    3 }}}}}     zzzzzzzzzzggggggggggg s s s s i       zzzzzzzggggggggzzzzzzzg           g   b  gggggggggggggggwwgg                   gggg",
    "gggggggggg}}}}}2i  s   ij    3ggggggggggggggggggggggggggzzzzzzzgggggggggggggggggggggggggggggggggggwwwwww               ww gggggggggg             g",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggwwwwww                  gggggggggg      d      g",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg        i d     #       gggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggzzzzggggggggggggggggggggggggggg"
]);


levelThree.redDragDirections = [RedDragDirections.RIGHT];
levelThree.leafPointers = [1, 3];