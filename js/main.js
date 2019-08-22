// Isaac Karth
// 8/21/2019
// Particles!

'use strict';

// define game
var game;
var emitter;

var ParticleExample = function(game) {};

ParticleExample.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        // chose your own image to use
        game.load.image('ball', '1F3C0.png');
        game.load.image('eightball', '1F3B1.png');
    },
    create: function() {
    	this.color_spectrum = Phaser.Color.HSVColorWheel();
        noise.seed(Math.random());

        // pick a background color you like
        game.stage.backgroundColor = "#4523D0";

        emitter = game.add.emitter();
        emitter.makeParticles('eightball');
        emitter.start(false);

    },
    update: function() {
    },
    render: function() {
        game.debug.text("Edit main.js to create your own particle animations", 25, 32);
    },
}

game = new Phaser.Game(950, 900, Phaser.AUTO);
game.state.add('ParticleExample', ParticleExample);
game.state.start('ParticleExample');