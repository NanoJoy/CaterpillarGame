var Level = (function () {
    function Level(layout, dialogue, redDragDirections, lampName) {
        this.layout = layout;
        this.dialogue = dialogue;
        this.redDragDirections = redDragDirections;
        this.lampName = lampName;
    }
    return Level;
})();

function transformOldToNewLevel(newLevel) {
    var oldLevel = [];
    newLevel.forEach(function (it) {
        oldLevel.push(it.split(""));
    })
    console.log(oldLevel);
    return oldLevel;
}
