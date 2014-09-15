Picaras.Game.prototype = {
  preload: function()
  {
    this.sounds    = {};
    this.fontSizes = { '0': 300, '10': 250, '100': 180, '1000': 100 };
    this.eaten     = 0;
    this.force     = 2e3;
  },
  create: function()
  {
    this.add.sprite(0, 0, 'background');

    this.sounds.bite = this.add.audio('bite');
    this.sounds.drop = this.add.audio('drop');
    this.sounds.end  = this.add.audio('the-end');

    this.eatenText       = this.add.bitmapText(this.world.centerX/2, this.world.centerY/2, 'digital', ""+this.eaten, 300);
    this.eatenText.align = "center";
    this.updateText(this.eaten);

    this.timer = this.game.now;
    this.delay = 2000;

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.restitution = 0.95;
    this.game.physics.p2.friction    = 1;

    this.picarascg = this.game.physics.p2.createCollisionGroup();

    this.physics.p2.updateBoundsCollisionGroup();

    this.picaras = this.game.add.group();
    this.picaras.enableBody = true;
    this.picaras.physicsBodyType = Phaser.Physics.P2JS;

    this.game.time.events.loop(2000, this.addSol, this);
    this.game.input.onDown.add(this.onClick, this);

    for(i = 0; i < 5; i++) this.addSol();

    this.clock = this.add.text(315, 5, "0 segundos", { font: "12px Arial", fill: "#ffffff", align: "right" });
    this.clock.seconds = 0;
    this.clock.anchor.set(1, 0);
    this.game.time.events.loop(1000, function() {
      this.clock.setText((++this.clock.seconds) + ' segundos');
    }, this);
  },
  addSol: function()
  {
    var sol = this.picaras.create(this.game.world.randomX, this.game.world.randomY, 'sol');
    sol.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
    sol.body.setCircle(24, 0.5, 0.5);
    sol.body.setCollisionGroup(this.picarascg);
    sol.body.collides([this.picarascg]);
    sol.body.applyForce([randomForce(this.force), randomForce(this.force)], sol.x, sol.y);

    this.sounds.drop.play();
  },
  onClick: function(pointer)
  {
    var bodies = this.game.physics.p2.hitTest(pointer.position);

    if(bodies.length == 0)
    {
      this.addSol();
    }
    else
    {
      var _this = this;
      bodies.forEach(function(body)
      {
        body.parent.sprite.destroy();

        _this.sounds.bite.play('');
        _this.updateText(++_this.eaten);
      });
    }
  },
  update: function()
  {
    if(this.picaras.length > 20)
    {
      this.state.start('Menu');
      this.sounds.end.play();
    }
  },
  updateText: function(eaten)
  {
    this.eatenText.setText(""+eaten);

    if(this.fontSizes[eaten])
    {
      this.eatenText.fontSize = this.fontSizes[eaten];
      this.eatenText.updateTransform();
      this.eatenText.pivot.x = 0.5;
      this.eatenText.x     = this.game.width/2 - this.eatenText.textWidth/2;
      this.eatenText.y     = this.game.height/2 - this.eatenText.textHeight/2 + 30;
    }
  }
}
