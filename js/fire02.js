// Isaac Karth
// 8/21/2019
// Particles!

'use strict';

// define game
var game;

var ParticleExample = function(game) {};

ParticleExample.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';

        // chose your own image to use
        game.load.image('ball', '1F3C0.png');
        game.load.image('eightball', '1F3B1.png');
        game.load.image('glow', 'glow_big.png');
        game.load.image('glow_dark', 'glow_dark.png');
    },
    create: function() {
    	this.color_spectrum = Phaser.Color.HSVColorWheel();
        noise.seed(Math.random());

        // pick a background color you like
        game.stage.backgroundColor = "#000000";

        // *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

        this.emitter = game.add.emitter(game.world.width / 2, game.world.height, 500);
        this.emitter.gravity = new Phaser.Point(0, -5);
        this.emitter.setAngle(-70, -110, 5, 195);
        this.emitter.makeParticles('glow');
        //this.emitter.setScale(1, 1, 500);
        this.emitter.setScale(1, 5, 1, 5, 4500);
        this.emitter.setAlpha(0.15, 0.0, 4500, Phaser.Easing.Cubic.In);
        this.emitter.blendMode = Phaser.blendModes.SCREEN;
        this.emitter.start(false, 4600, 15);

        this.emitter_bright = game.add.emitter(game.world.width / 2, game.world.height, 500);
        this.emitter_bright.gravity = new Phaser.Point(0, -5);
        this.emitter_bright.setAngle(-70, -110, 5, 195);
        this.emitter_bright.makeParticles('glow');
        //this.emitter.setScale(1, 1, 500);
        this.emitter_bright.setScale(1, 5, 1, 5, 4500);
        this.emitter_bright.setAlpha(0.11, 0.0, 2100, Phaser.Easing.Cubic.In);
        this.emitter_bright.blendMode = Phaser.blendModes.SCREEN;
        this.emitter_bright.start(false, 2800, 15);

		for(let i = 1; i <=3; i+=2) {
        	let pos_x = game.world.width * (i / 4);
        	console.log(i);
        	let negative_space = game.add.emitter(pos_x, game.world.height, 500);
        	negative_space.gravity = new Phaser.Point(0, -15);
        	negative_space.width = 70;
        	negative_space.height = 40;
        	negative_space.setAngle(-80, -100, 35, 475);
        	negative_space.setScale(0.0, 1, 0.0, 1.1, 2500, Phaser.Easing.Sinusoidal.InOut);
        	negative_space.blendMode = Phaser.blendModes.MULTIPLY;
        	negative_space.makeParticles('glow_dark');
        	negative_space.start(false, 6000, 2);
		}

        for(let i = -1; i <= 1; i += 2) {
            let pos_x = i < 0 ? game.world.width / 6 : game.world.width - (game.world.width / 6);
            let negative_space = game.add.emitter(pos_x, game.world.height, 700);
            negative_space.gravity = new Phaser.Point(0, -15);
            negative_space.width = 30;
            negative_space.setAngle(-70, -110, 35, 275);
            negative_space.setScale(2, 3.6, 2, 3.6, 3500, Phaser.Easing.Cubic.In);
            negative_space.blendMode = Phaser.blendModes.MULTIPLY;
            negative_space.makeParticles('glow_dark');
            negative_space.start(false, 6000, 30);
        }

        this.emitter_sparks = game.add.emitter(game.world.width / 2, game.world.height, 500);
        this.emitter_sparks.gravity = new Phaser.Point(0, -25);
        this.emitter_sparks.setAngle(-70, -110, 120, 255);
        this.emitter_sparks.makeParticles('glow');
        this.emitter_sparks.width = 100;
        this.emitter_sparks.height = 600;
        this.emitter_sparks.setScale(0, 0.1, 0, 0.1, 700);
        this.emitter_sparks.setAlpha(0, 0.9, 1200, Phaser.Easing.Cubic.In, true);
        this.emitter_sparks.blendMode = Phaser.blendModes.SCREEN;
        this.emitter_sparks.start(false, 1800, 5);
    },
    update: function() {
        this.emitter.forEachAlive(function(particle) {
        	particle.tint = 0xff5511;
        });
        this.emitter_bright.forEachAlive(function(particle) {
        	particle.tint = 0xaaaaff;
        });
        this.emitter_sparks.forEachAlive(function(particle) {
        	particle.tint = 0xff5511;
        });

    },
    render: function() {
        game.debug.text("Edit main.js to create your own particle animations", 25, 32);
    },
}

game = new Phaser.Game(450, 600, Phaser.AUTO);
game.state.add('ParticleExample', ParticleExample);
game.state.start('ParticleExample');