function getLevelFour() {
    var flowerNames = LevelUtils.createLampNames(4, 1);
    var layout = LevelUtils.transformOldToNewLevel([
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
        "ggggggggg !                    g       gb         ggggggg",
        "ggggggggggggg   f            3 g       ggggg      ggggggg",
        "g           gggggg          gggg       g               2g",
        "g           gggggg          gggg       #       j       gg",
        "g   <<<          g    j                gggggggggg      gg",
        "g   ggg>>> d i   gggggggggg}}}}}}      gggggggggggggggggg",
        "g    3gggggggg    g    g a a a gg     pgggggggggggggg   g",
        "gj    #s is2gg      d                             @@  l g",
        "ggggggggggggggggggggggggggggggggg>>>>>>gggggggggggggggggg",
        "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ]);

    //var gateKeeperTrees = [
    //    new DialogueTree("I am the gatekeeper ")
    //];

    var dialogues = [];
    return new Level(layout, dialogues, [], flowerNames, null, [0]);
}