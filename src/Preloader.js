var States = window.States || {};
var Snail = window.Snail || Initialize();
var spriteKeys = {
    flowerLamp: "flower_lamp",
    lichen: "lichens",
    lichenIcon: "lichen_icon",
    pressB: "press_b",
    speedboost: "speedboost"
};
var soundKeys = {
    boingbugSong: "boingbug_song",
    mainMusic1: "game_music"
};
States.Preloader = function(game) {
    var spriteInfos = [
        {
            key: spriteKeys.pressB,
            width: 50,
            height: 50
        },
        {
            key: "background",
            width: 64,
            height: 32
        },
        {
            key: "banana",
            width: 52,
            height: 30
        },
        {
            key: 'block',
            width: 50,
            height: 50
        }, {
            key: 'blue_key',
            width: 50,
            height: 50
        }, {
            key: 'blue_key_icon',
            width: 22,
            height: 22
        }, {
            key: 'blue_lock',
            width: 50,
            height: 50
        }, {
            key: 'boing',
            width: 50,
            height: 50
        }, {
            key: "boy_worm",
            width: 100,
            height: 100
        }, {
            key: 'bridge',
            width: 50,
            height: 50
        }, {
            key: "camera_border",
            width: 20,
            height: 20
        }, {
            key: "cat_scarf",
            width: 52,
            height: 30
        }, {
            key: 'caterpillar',
            width: 52,
            height: 30
        }, {
            key: 'caterpillar_death',
            width: 52,
            height: 30
        },
        {
            key: 'clear_ground',
            width: 50,
            height: 50
        }, {
            key: 'clear_ground_bottom',
            width: 50,
            height: 50
        }, {
            key: "coccoon",
            width: 50,
            height: 50
        }, {
            key: "cornerstone",
            width: 50,
            height: 50
        }, {
            key: 'cornerstone_filler',
            width: 50,
            height: 50
        }, {
            key: 'deer',
            width: 52,
            height: 60
        }, {
            key: 'deer_death',
            width: 64,
            height: 60
        }, {
            key: "dragonfly",
            width: 50,
            height: 50
        }, {
            key: 'flower_bullet',
            width: 8,
            height: 12
        }, {
            key: spriteKeys.flowerLamp,
            width: 50,
            height: 100
        }, {
            key: "girl_worm",
            width: 88,
            height: 100
        }, {
            key: 'ground_both',
            width: 50,
            height: 50
        }, {
            key: 'ground_both_both',
            width: 50,
            height: 50
        }, {
            key: 'ground_both_left',
            width: 50,
            height: 50
        }, {
            key: 'ground_both_right',
            width: 50,
            height: 50
        }, {
            key: 'ground_bottom',
            width: 50,
            height: 50
        }, {
            key: 'ground_bottom_both',
            width: 50,
            height: 50
        }, {
            key: 'ground_bottom_left',
            width: 50,
            height: 50
        }, {
            key: 'ground_bottom_right',
            width: 50,
            height: 50
        }, {
            key: 'ground_inside',
            width: 50,
            height: 50
        }, {
            key: 'ground_inside_both',
            width: 50,
            height: 50
        }, {
            key: 'ground_inside_left',
            width: 50,
            height: 50
        }, {
            key: 'ground_inside_right',
            width: 50,
            height: 50
        }, {
            key: 'ground_top_1',
            width: 50,
            height: 50
        }, {
            key: 'ground_top_2',
            width: 50,
            height: 50
        }, {
            key: "ground_top_both",
            width: 50,
            height: 50
        }, {
            key: 'ground_top_left',
            width: 50,
            height: 50
        }, {
            key: 'ground_top_right',
            width: 50,
            height: 50
        }, {
            key: 'healthbar',
            width: 100,
            height: 20
        }, {
            key: 'housey',
            width: 200,
            height: 200
        }, {
            key: 'invisible',
            width: 50,
            height: 50
        }, {
            key: "ldr",
            width: 52,
            height: 50
        }, {
            key: 'leaf',
            width: 20,
            height: 22
        }, {
            key: spriteKeys.lichen,
            width: 50,
            height: 50
        }, {
            key: spriteKeys.lichenIcon,
            width: 22,
            height: 22
        }, {
            key: "logo",
            width: 600,
            height: 200
        }, {
            key: "menu_background",
            width: 64,
            height: 32
        }, {
            key: 'pink_flow',
            width: 50,
            height: 50
        }, {
            key: 'powerup',
            width: 16,
            height: 16
        }, {
            key: 'red_drag',
            width: 70,
            height: 50
        }, {
            key: 'rock',
            width: 100,
            height: 60
        }, {
            key: "scarf",
            width: 50,
            height: 50
        }, {
            key: 'soft_ground',
            width: 50,
            height: 50
        }, {
            key: 'speedboost',
            width: 50,
            height: 50
        }, {
            key: 'spikes',
            width: 50,
            height: 50
        }, {
            key: 'spikes_bottom',
            width: 50,
            height: 50
        }, {
            key: 'spikes_left',
            width: 50,
            height: 50
        }, {
            key: 'spikes_both',
            width: 50,
            height: 50
        }, {
            key: 'spikes_right',
            width: 50,
            height: 50
        }, {
            key: 'spikes_bottom_left',
            width: 50,
            height: 50
        }, {
            key: 'spikes_bottom_right',
            width: 50,
            height: 50
        }, {
            key: 'spikes_bottom_both',
            width: 50,
            height: 50
        }, {
            key: 'menu_button',
            width: 200,
            height: 30
        }, {
            key: "stars",
            width: 100,
            height: 100
        }, {
            key: "start_border",
            width: Snail.GAME_WIDTH,
            height: Snail.GAME_HEIGHT
        }, {
            key: 'stinkbug_dead',
            width: 64,
            height: 64
        }, {
            key: 'stinkbug_walking',
            width: 64,
            height: 40
        }, {
            key: 'text_back',
            width: Snail.GAME_WIDTH,
            height: Snail.GAME_HEIGHT
        }, {
            key: 'text_pointer',
            width: 14,
            height: 14
        }, {
            key: 'water',
            width: 50,
            height: 50
        }, {
            key: "worm_death",
            width: 100,
            height: 100
        }, {
            key: 'yellow_flow',
            width: 50,
            height: 50
        }, {
            key: 'yellow_key',
            width: 50,
            height: 50
        }, {
            key: 'yellow_key_icon',
            width: 22,
            height: 22
        }, {
            key: 'yellow_lock',
            width: 50,
            height: 50
        }];
    var soundKeys = [
        "ammo", "boingbug", "death", "deer_death", "deer_walk", "deer_run", "dragonfly", "hurt", "jump", "key",
        "leaf", "menu_beep", "powerup", "rock_drag", "rock_hit", "save", "shoot",
        "stinkbug", "stinkbug_death", "thud_1", "thud_2",
        "unlock", "water", "worm", "worm_death"
    ];

    this.preload = function() {
        var i = 0;
        var item = null;
        var loadingBar = game.add.sprite(game.width / 2, game.height / 2, 'loading_bar');
        game.stage.backgroundColor = 0x3d2102;
        loadingBar.anchor.setTo(0.5, 1);
        game.load.setPreloadSprite(loadingBar, 0);
        for (i = 0; i < spriteInfos.length; i += 1) {
            item = spriteInfos[i];
            game.load.spritesheet(item.key, 'assets/visual/' + item.key + '.png', item.width, item.height);
        }
        for (i = 0; i < soundKeys.length; i++) {
            game.load.audio(soundKeys[i], "assets/audio/" + soundKeys[i] + ".wav");
        }
        game.load.audio("menu_music", "assets/audio/menu_music.mp3");
        for (i = 0; i < Snail.cleanMap.musics.length; i++) {
            if (Snail.cleanMap.musics[i] === null) {
                j = i - 1;
                while (Snail.cleanMap.musics[j] === null) {
                    j--;
                }
                Snail.cleanMap.musics[i] = Snail.cleanMap.musics[j];
            }
        }
    };

    this.create = function() {
        game.state.start('Saves');
    };
};