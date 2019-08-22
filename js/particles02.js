// Nathan Altice
// Updated: 4/30/19
// Particles
// Tweaking emitter parameters

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
		game.load.path = 'assets/img/';
		game.load.image('star', 'star.png');
		game.load.image('bball', 'bball_tiny.png');
		game.load.image('stop', 'stop_btn_small.png');
		game.load.image('fball', 'football_small.png');
	},
	create: function() {
		// multiple examples - comment/uncomment to test

		// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		// EXAMPLE 1: center emitter, emit 15 balls, one every 250ms, short lifespan (1 second)
		//emitter = game.add.emitter(game.world.centerX, game.world.centerY);
		//emitter.makeParticles('bball');
		//emitter.start(false, 5000, 250, 15);

		// EXAMPLE 2: center emitter, explode from center
		// NOTE: emitter's maxParticles parameter default (50) overrides
		//		.start's quantity parameter, so we get 50 balls, not 250
		//emitter = game.add.emitter(game.world.centerX, game.world.centerY);
		//emitter.makeParticles('bball');
		//emitter.start(true, 0, null, 250);

		// EXAMPLE 3: center emitter, explode from center
		// matching maxParticles to quantity properly explodes 1250 balls
		//emitter = game.add.emitter(game.world.centerX, game.world.centerY, 1250);
		//emitter.makeParticles('bball');
		//emitter.start(true, 0, null, 1250);

		// EXAMPLE 4: center emitter, intermittent 'fireworks' style, capped to 15 balls
		//emitter = game.add.emitter(game.world.centerX, game.world.centerY, 15);
		//emitter.makeParticles('bball');
		//emitter.start(false, 5000, 15);

		// EXAMPLE 5: raise maxParticles, constant 'fountain' style, multiple particle types
		emitter = game.add.emitter(game.world.centerX, game.world.centerY, 500);
		emitter.makeParticles(['bball', 'star', 'stop', 'fball']);
		emitter.start(false, 5000, 10);
	},
	update: function() {
		// empty, like your soul
	},
	render: function() {
		game.debug.text('Press \'P\' to Pause', 32, 32);
	}
};

game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');