class Checkpoint {
    constructor(gameState, x, y, id) {
        this.sprite = gameState.groups.checkpoints.create(x, y, spriteKeys.flowerLamp);
        this.id = id;
    }
}