var States = window.States || {};
States.Midload = function (game) {
    this.preload = function () {
        var key = Snail.cleanMap.musics[Snail.areaNumber];
        var banana = game.add.sprite(0, 0, "ldr", 26);
        var t = game.add.text(0, 0, "Loading music...", {font: "20px VT323", fill: "white"});
        banana.x = (Snail.GAME_WIDTH - banana.width) / 2;
        banana.y = (Snail.GAME_HEIGHT - banana.height) / 2;
        t.x = (Snail.GAME_WIDTH - t.width) / 2;
        t.y = Snail.GAME_HEIGHT / 2 + banana.height;
        game.add.tween(banana).to({ y: banana.y + 10 }, 300, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        game.sound.destroy();
        if (Snail.loadedMusics.indexOf(Snail.cleanMap.musics[Snail.areaNumber]) === -1) {
            game.stage.backgroundColor = 0x4d3112;
            game.load.audio(key, "assets/audio/" + key + ".mp3");
            Snail.musicToLoad = "";
            Snail.musicTime = 0;
            Snail.loadedMusics.push(key);
        }
    };
    this.create = function () {
        game.state.start("Game");
    };
};