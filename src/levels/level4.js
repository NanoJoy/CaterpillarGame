function getLevelFour() {
    var flowerNames = LevelUtils.createLampNames(4, 1);
    var layout = LevelUtils.transformOldToNewLevel([
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "ggggggggg !                    g       gb         g     g",
        "g       ggggg   f            3 g       ggggg      g     g",
        "g           gggggg          gggg       g               2g",
        "g           gggggg          gggg       #       j       gg",
        "g                     j                ggg   gggg      gg",
        "g                  gggggggg}}}}}}      ggg   gggggggggggg",
        "g                              gg      ggg    ggggggg   g",
        "g                                      gggj       @@  l g",
        "ggggggggggggggggggggggggggggggggg>>>>>>gggggggggggggggggg",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ]);
    var dialogues = [];
    return new Level(layout, dialogues, [], flowerNames, null, [0]);
}