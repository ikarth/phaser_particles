// Nathan Altice
// Updated: 4/30/19
// Particles
// Minimum viable particle emitter

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
		game.load.image('bball', 'bball_tiny.png');
	},
	create: function() {
		// 'minimum viable' emitter
		// randomly chuck out basketballs (max 50) every quarter second from position 0,0
		// emitter(x, y, maxParticles)
		emitter = game.add.emitter(0,0);
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		emitter.makeParticles('bball');
		// start(explode?, lifespan[ms], freq[ms], quantity)
		emitter.start(false);
	},
	update: function() {
		// no need for update - Phaser's Particle Manager handles its own updates
	},
	render: function() {
		game.debug.text('Press \'P\' to Pause', 32, 32);
	}
};

game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');