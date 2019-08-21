// Nathan Altice
// Updated: 4/30/19
// Particles
// Playing with more emitter parameters

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
		game.load.image('rain', 'pixel_rain.png');
		game.load.image('snowflake', 'snowflake.png');
		game.load.image('bubble', 'bubble.png');
		game.load.image('saw', 'saw.png');
	},
	create: function() {
		// multiple examples - comment/uncomment to test

		// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		// wide emitter with snow
		// emitter = game.add.emitter(game.world.centerX, 0);
		// emitter.makeParticles(['snowflake'], 0, 500);
		// emitter.start(false, 5000, 10);
		// let area = new Phaser.Rectangle(game.world.centerX, 0, game.world.width, 1);
		// emitter.area = area;

		// narrow emitter with 'rain'
		// emitter = game.add.emitter(game.world.centerX, 0, 5000);
		// emitter.makeParticles(['rain'], 0, 500);
		// emitter.start(false, 750, 1, 5000);
		// emitter.setRotation(0, 0);
		// emitter.setXSpeed(0, 0);
		// emitter.setYSpeed(750, 1500);
		// let area = new Phaser.Rectangle(game.world.centerX, 0, 50, 1);
		// emitter.area = area;

		// horizontal saw emitter :p w/ +x gravity
		// change gravity Point values for MAX FUN
		// emitter = game.add.emitter(0, game.world.centerY, 5000);
		// emitter.makeParticles(['saw'], 0, 500);
		// emitter.start(false, 2000, 1, 5000);
		// let gravity = new Phaser.Point(100,0);
		// emitter.gravity = gravity;
		// emitter.setXSpeed(250, 450);
		// emitter.setYSpeed(0, 0);
		// let area = new Phaser.Rectangle(0, game.world.centerY, 1, 100);
		// emitter.area = area;

		// center radial 'dust' emitter w/ alpha and scale set, zero gravity
		emitter = game.add.emitter(game.world.centerX, game.world.centerY, 5000);
		emitter.makeParticles(['bubble'], 0, 500);
		emitter.start(false, 5000, 1, 5000);
		let gravity = new Phaser.Point(0,0);
		emitter.gravity = gravity;
		emitter.setAlpha(0.25, 1);
		emitter.setScale(1, 5, 1, 5);
	},
	update: function() {
		// updates are for chumps
	},
	render: function() {
		game.debug.text('Press \'P\' to Pause', 32, 32);
	}
};

game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');