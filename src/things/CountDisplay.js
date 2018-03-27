function CountDisplay(game, x, y, key, count) {
    var countDisplay = game.add.text(x + 26, y + 2, count.toString(), Snail.textStyles.boingbox);
    var icon = game.groups.topLevel.create(x, y, key);
    game.groups.topLevel.add(countDisplay);
    if (key === "flower_bullet") {
        icon.y += (22 - icon.height) / 2;
        countDisplay.x = icon.x + icon.width + 4;
    }
    countDisplay.fixedToCamera = true;
    icon.fixedToCamera = true;
    this.changeAmount = function (amount) {
        count = Math.max(count + amount, 0);
        countDisplay.text = count.toString();
    };
    this.increase = function () {
        this.changeAmount(1);
    };
    this.decrease = function () {
        this.changeAmount(-1);
    };
    this.reset = function () {
        count = 0;
        countDisplay.text = "0";
    }
}