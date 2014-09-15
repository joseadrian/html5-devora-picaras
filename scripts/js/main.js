(function() {
  var game = new Phaser.Game(320, 480, Phaser.AUTO, 'game');

  game.state.add('Boot', Picaras.Boot);
  game.state.add('Menu', Picaras.Menu);
  game.state.add('Game', Picaras.Game);
  game.state.start('Boot');
})();
