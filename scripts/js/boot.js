var Picaras = { Boot: function(){}, Menu: function(){}, Game: function(){} };

function randomForce(force) {
  return (Math.random() < 0.5 ? -1 : 1) * force;
}

Picaras.Boot.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#ffffff';
    this.load.image('sol', 'assets/img/picaras.png');
    this.load.image('background', 'assets/img/background.png');
    this.load.image('title', 'assets/img/title.png');
    this.load.image('btn-play', 'assets/img/btn-play.png');

    this.load.audio('the-end', ['assets/sounds/the-end.wav']);
    this.load.audio('bite', ['assets/sounds/bite.wav']);
    this.load.audio('drop', ['assets/sounds/drop.wav']);

    this.load.bitmapFont('digital', 'assets/fonts/digital.png', 'assets/fonts/digital.xml');
  },
  update: function() {
    this.state.start('Menu');
  }
}
