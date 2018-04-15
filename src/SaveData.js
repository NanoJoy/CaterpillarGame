var SaveData = {
    newGame: true,
    dialogueStates: {},
    areaNumber: -1,
    map: [],
    lampName: "",
    lampPos: [],
    keysHad: {
        colors: [],
        counts: []
    },
    lichenCount: 0,
    powerups: []
};

var betweenLevelInfo = null;

function BetweenLevelInfo(mapChanges, keysHad, lichenCount, powerups) {
    this.mapChanges = mapChanges;
    this.keysHad = keysHad;
    this.lichenCount = lichenCount;
    this.powerups = powerups;
}