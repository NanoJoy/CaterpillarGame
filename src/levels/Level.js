function Level(layout, dialogue, redDragDirections, lampNames) {
    this.layout = layout;
    this.dialogue = dialogue;
    this.redDragDirections = redDragDirections;
    this.lampNames = lampNames;
}

LevelUtils = {
    transformOldToNewLevel: function(newLevel) {
        var oldLevel = [];
        newLevel.forEach(function (it) {
            oldLevel.push(it.split(""));
        })
        console.log(oldLevel);
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


