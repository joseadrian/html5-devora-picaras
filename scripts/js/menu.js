Picaras.Menu.prototype = {
  preload: function()
  {

  },
  create: function()
  {
    this.add.sprite(0, 0, 'background');

    var title = this.add.sprite(this.world.centerX, this.world.centerY - 100, 'title');
    title.anchor = { x: 0.5, y: 0.5 };

    this.add.tween(title).to({ y: this.world.centerY - 50 }, 1000).to({ y: this.world.centerY - 100 }, 1000).yoyo().loop().start();

    var btnJugar = this.add.button(this.world.centerX, this.world.centerY + 70, 'btn-play', this.play, this);
    btnJugar.anchor = { x: 0.5, y: 0.5 };
  },
  play: function()
  {
    this.state.start('Game');
  }
}
