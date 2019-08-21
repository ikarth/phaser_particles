// Nathan Altice
// Updated: 4/30/19
// Particles
// Particle collisions

// STRICC
"use strict";

// global variables
var game, emitter, platforms;

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
		game.load.image('fball', 'football_small.png');
		game.load.image('platform', 'platformindustrial.png');
	},
	create: function() {
		// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		// collidable particles, note *yet another* quantity parameter to create conflicts
		emitter = game.add.emitter(game.world.centerX, game.world.centerY, 500);
		emitter.makeParticles(['bball', 'fball'], 0, 500, true, true);
		emitter.start(false, 7000, 100);

		// create randomized platforms for collisions
		platforms = game.add.group();
		platforms.enableBody = true;
		for (let x=0; x<4; x++) {
			let sign = Math.random() < 0.5 ? -1 : 1;
			let bufferX = Math.random() * 200 * sign;
			let bufferY = Math.random() * 150 * -sign;
			let platform = platforms.create(game.world.centerX+bufferX, game.world.width/4*3+bufferY, 'platform');
			platform.body.immovable = true;
		}

	},
	update: function() {
		// check collisions btwn emitter (ie, particles) and platforms
		game.physics.arcade.collide(emitter, platforms);
		// checks collision btwn particles in emitter
		game.physics.arcade.collide(emitter);	
	},
	render: function() {
		game.debug.text('Press \'P\' to Pause', 32, 32);
	}
};

game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');