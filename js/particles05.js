// Nathan Altice
// Updated: 4/30/19
// Particles
// Particle prefab with custom animation

// STRICC
"use strict";

// global variables
var game, emitter;

// bind pause key to browser window event
window.onkeydown = function(event) {
	// capture keycode (event.which for Firefox compatibility)
	var keycode = event.keyCode || event.which;	
	if(keycode === Phaser.Keyboard.P) {
		pauseGame();
	}
}

function pauseGame() {
	// toggle game pause
	game.paused ? game.paused = false : game.paused = true;
}

var Play = function(game){};
Play.prototype = {
	preload: function() {
		game.load.path = '../assets/img/';
		game.load.spritesheet('coin', 'coinflip.png', 16, 16, 12);
	},
	create: function() {
		// multiple examples - comment/uncomment to test

		// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		// central emitter with coin, random selection of frames from spritesheet
		// emitter = game.add.emitter(game.world.centerX, game.world.centerY);
		// emitter.makeParticles(['coin'], [0,1,2,3,4,5,6,7,8,9,10,11], 500);
		// emitter.start(false, 5000, 10);

		// central emitter with coin, each coin animated
		emitter = game.add.emitter(game.world.centerX, game.world.centerY, 1000);
		emitter.particleClass = Coin; // need to set our new Coin class
		emitter.makeParticles();
		emitter.start(false, 5000, 10);

	},
	render: function() {
		game.debug.text('Press \'P\' to Pause', 32, 32);
	}
};

// Coin prefab (listed inline for convenience)
// adapted from http://codetuto.com/2016/02/phaser-animated-particles/
var Coin = function(game, x, y) {
	// make Coin inherit from Particle - new Particle(game, x, y, key, frame)
	Phaser.Particle.call(this, game, x, y, 'coin');
	// add an animation - add(name [,frames][,frameRate][,loop][,useNumericIndex])]
	this.animations.add("flip");	
};

// define our prefab prototype and constructor
Coin.prototype = Object.create(Phaser.Particle.prototype);
Coin.prototype.constructor = Coin;

// override Particle's onEmit function
Coin.prototype.onEmit = function() {
	// play animation - play(name [,frameRate][,loop])
	this.animations.play('flip', 60, true);
	// start at a random frame in the animation array so all particles aren't identical
	// frameTotal is the total # of frames in the currently loaded FrameData
	this.animations.getAnimation('flip').frame = Math.floor(Math.random() * this.animations.getAnimation('flip').frameTotal);
}

game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');