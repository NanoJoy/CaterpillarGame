function Level(layout, dialogue, redDragDirections, lampNames, musicName, leafPointers) {
    this.layout = layout;
    this.dialogue = dialogue;
    this.redDragDirections = redDragDirections;
    this.lampNames = lampNames;
    this.musicName = musicName;
    this.leafPointers = leafPointers;
}

var LevelUtils = {
    transformOldToNewLevel: function(newLevel, levelHeight) {
        if (levelHeight !== undefined) {
            var numSpans = newLevel.length / levelHeight;
            var temp = [];
            for (var i = 0; i < levelHeight; i++) {
                temp[i] = "";
                for (var j = 0; j < numSpans; j++) {
                    temp[i] += newLevel[(j * levelHeight) + i];
                }
            }
            newLevel = temp;
        }
        var oldLevel = [];
        newLevel.forEach(function (it) {
            oldLevel.push(it.split(""));
        })
        return oldLevel;
    },
    createLampNames: function(levelNumber, numLamps) {
        var lampNames = [];
        for (var i = 1; i <= numLamps; i++) {
            lampNames.push(levelNumber + "." + i);
        }
        return lampNames;
    }
}

RedDragDirections = {
    RIGHT: "right",
    LEFT: "left"
};


