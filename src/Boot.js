var States = window.States || {};
var Snail = window.Snail || Initialize();
States.Boot = function (game) {
  this.preload = function() {
    game.load.image('loading_bar', 'assets/visual/loading_bar.png');
  };
  
  this.create = function() {
    game.scale.setGameSize(Snail.GAME_WIDTH, Snail.GAME_HEIGHT);
    game.state.start('Preloader');
  };
};