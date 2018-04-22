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
    powerups: [],
    partsBeaten: 0
};

var betweenLevelInfo = null;

function BetweenLevelInfo(mapChanges, keysHad, lichenCount, powerups) {
    this.mapChanges = mapChanges;
    this.keysHad = keysHad;
    this.lichenCount = lichenCount;
    this.powerups = powerups;
}

function SavesHelper() {
    var REGULAR_KEY = "SamIsAnIdiot";
    var PART_END_KEY = "RosieTime";

    function setSaveData(key) {
        localStorage.setItem(key, JSON.stringify(SaveData));
    };

    function retrieveSaveData(key) {
        return JSON.parse(localStorage.getItem(key));
    };

    this.setRegularData = function () {
        setSaveData(REGULAR_KEY);
    };

    this.retrieveRegularData = function () {
        return retrieveSaveData(REGULAR_KEY);
    };

    this.setPartEndData = function () {
        setSaveData(PART_END_KEY);
    };

    this.retrievePartEndData = function () {
        return retrieveSaveData(PART_END_KEY);
    };

    this.getCleanSaveData = function () {
        return JSON.parse(JSON.stringify({
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
            powerups: [],
            partsBeaten: 0
        }));
    }
};