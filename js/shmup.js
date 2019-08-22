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
        game.load.image('rain', 'pixel_rain.png');
		game.load.image('snowflake', 'snowflake.png');
		game.load.image('bubble', 'bubble.png');
		game.load.image('spot', 'spot.png');
		game.load.image('spike', 'spike.png');
		game.load.image('flare', 'flare.png');
		game.load.image('explosion_burst', 'explosion_burst.png');
    },
    create: function() {
    	this.color_spectrum = Phaser.Color.HSVColorWheel();
        noise.seed(Math.random());

        // pick a background color you like
        game.stage.backgroundColor = "#4523D0";

		this.physics.startSystem(Phaser.Physics.ARCADE);


		this.speed = 300;


		// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		
		this.plane = game.add.sprite(200, 150, 'eightball');
		game.physics.arcade.enable(this.plane);
		this.plane.anchor = new Phaser.Point(0.5,0.5);


		let gravity = new Phaser.Point(0,0);
		this.flare = game.add.emitter(0, 0, 600);
		this.flare.makeParticles('flare', 0);
        this.flare.setAngle(0, 0, 0, 0);
        this.flare.gravity = gravity;
        this.flare.setRotation(-3,3);
        this.flare.setScale(3, 15, 1, 4, 200, Phaser.Easing.Cubic.Out, false);
		this.flare.setAlpha(0.5, 1, 200, Phaser.Easing.Sinusoidal.Out);
        this.flare.blendMode = Phaser.blendModes.SCREEN;
        this.flare.start(false, 200, 30);


		this.jet = game.add.emitter(0, 0, 600);
        this.jet.makeParticles('spot', 0);
        this.jet.setAngle(87, 92, 130, 180);
        this.jet.blendMode = Phaser.blendModes.SCREEN;
        //this.jet.minParticleSpeed.setTo(-200, -300);
    	//this.jet.maxParticleSpeed.setTo(200, -400);
    	this.jet.width = 3;
    	this.jet.minParticleScale = 0.25;
    	this.jet.maxParticleScale = 1.5;
    	//(minX, maxX, minY, maxY, rate, ease, yoyo)
    	this.jet.setScale(2, 3.5, 0.25, 2.5, 900, Phaser.Easing.Cubic.Out, true);
		// (min, max, rate, ease, yoyo)
    	this.jet.setAlpha(0.5, 0.1, 900, Phaser.Easing.Sinusoidal.In);
        this.jet.start(false, 1200, 10);
        
       
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        this.spawnExplosion(100,400);

    },
    update: function() {
    	this.flare.forEachAlive(function(particle) {
        	particle.tint = 0xffcc11;
        });
        this.jet.forEachAlive(function(particle) {
        	particle.tint = 0xffcc11;
        });

        this.flare.position.x = this.plane.world.x;
		this.flare.position.y = this.plane.world.y + 30;
		this.jet.position.x = this.plane.world.x;
		this.jet.position.y = this.plane.world.y + 30;
		
        this.plane.body.velocity.set(0);
        if (this.cursors.left.isDown) {
        	this.plane.body.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown) {
            this.plane.body.velocity.x = this.speed;
        }
        
        if (this.cursors.up.isDown) {
            this.plane.body.velocity.y = -this.speed;
        }
        else if (this.cursors.down.isDown) {
            this.plane.body.velocity.y = this.speed;
        }

		if(this.plane.body.velocity.x != 0 || this.plane.body.velocity.y != 0) {
			this.flare.setScale(10,35, 3, 9);
			this.jet.width = 25;
		} else {
			this.flare.setScale(3,15, 1, 4);
			this.jet.width = 1;
		}

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.createRocket();
        }
    },
    createRocket: function() {
    	if(this.rocket) {
    		return;
    	}
    	this.rocket = game.add.sprite(this.plane.position.x, this.plane.position.y,'ball');
    	this.rocket.scale.setTo(0.4,0.4);
    	this.rocket.anchor = {x: 0.5,  y: 0.5};
    	game.physics.arcade.enable(this.rocket);
        this.rocket.body.velocity.y = 125;
        this.rocket.body.acceleration.y = -250;
        this.rocket.body.gravity = new Phaser.Point(0,0);
        this.rocket.body.velocity.x = 32.0 * (game.rnd.frac() - 0.5);
        this.rocket.lifespan = 1800 + game.rnd.integerInRange(0, 800);

		this.rocket.rocket_trail = game.add.emitter(this.rocket.worldPosition.x, this.rocket.worldPosition.y, 100);
        
        this.rocket.rocket_trail.makeParticles('spot', 0);
        this.rocket.rocket_trail.setAngle(87, 92, 130, 180);
        this.rocket.rocket_trail.blendMode = Phaser.blendModes.SCREEN;
        this.rocket.rocket_trail.width = 3;
    	//(minX, maxX, minY, maxY, rate, ease, yoyo)
    	this.rocket.rocket_trail.setScale(3, 1, 1, 3, 200);
		// (min, max, rate, ease, yoyo)
    	this.rocket.rocket_trail.setAlpha(0.7, 0.1, 400, Phaser.Easing.Sinusoidal.In);
        this.rocket.rocket_trail.start(false, 400, 10);
		this.rocket.update = function() {
			this.rocket_trail.emitX = this.worldPosition.x;
			this.rocket_trail.emitY = this.worldPosition.y;
		}
		this.rocket.events.onKilled.add((killed) => {
			this.spawnExplosion(killed.worldPosition.x, killed.worldPosition.y);
			killed.rocket_trail.destroy();
			killed.destroy;
			this.rocket = null;
		})
    },
    spawnExplosion: function(x,y) {
    	// *****************************************************************************************
		// Phaser particle properties reference
		// emitter(x, y, maxParticles)
		// makeParticles('keys', frames, quantity, collide?, collideWorldBounds?, particleArguments)
		// start(explode?, lifespan[ms], freq[ms], quantity)
		// *****************************************************************************************

		
    	var smoke = game.add.emitter(x, y, 100);
        smoke.makeParticles('explosion_burst', 0, 50, false, false);
		smoke.setAngle(0, 360, 3, 64);
        smoke.blendMode = Phaser.blendModes.MULTIPLY;
        //(minX, maxX, minY, maxY, rate, ease, yoyo)
    	smoke.setScale(0.01, 1.0, 0.01, 1.0, 1000, Phaser.Easing.Sinusoidal.Out);
    	smoke.gravity = new Phaser.Point(0,0);
		// (min, max, rate, ease, yoyo)
    	smoke.setAlpha(0.9, 0.0, 500);
        
        //smoke.update = function() {
        	//this.forEachAlive(function(particle) {
        	//	particle.tint = Phaser.Color.interpolateColor(0xffffee, 0x442203, 800, Math.min(particle.lifespan, 800), 1, 1);
        	//	});
        //}

        smoke.start(true, 1600, null, 100);	


    	var explosion = game.add.emitter(x, y, 100);
        explosion.makeParticles('explosion_burst', 0, 50, false, false);
		//explosion.setAngle(0, 360, 3, 30);
        explosion.blendMode = Phaser.blendModes.SCREEN;
        //(minX, maxX, minY, maxY, rate, ease, yoyo)
    	explosion.setScale(0.4, 2, 0.2, 2, 600, Phaser.Easing.Sinusoidal.In);
    	//explosion.gravity = new Phaser.Point(0,0);
		// (min, max, rate, ease, yoyo)
    	explosion.setAlpha(0.7, 0.0, 500);
        
        //explosion.update = function() {
        	//this.forEachAlive(function(particle) {
        	//	particle.tint = Phaser.Color.interpolateColor(0xffffee, 0x442203, 600, Math.min(particle.lifespan, 600), 1, 1);
        	//	});
        //}

        explosion.start(true, 900, null, 100);
    	
    	let gravity = new Phaser.Point(0,0);
		let spark = game.add.emitter(x, y, 60);
		spark.makeParticles('flare', 0, 60, false, false);
        spark.setAngle(0, 360, 1, 3);
        spark.gravity = gravity;
        spark.setRotation(-6, 6);
        spark.setScale(15, 20, 1, 12, 600, Phaser.Easing.Cubic.Out, false);
		spark.setAlpha(1, 0, 600, Phaser.Easing.Sinusoidal.Out, false);
        spark.blendMode = Phaser.blendModes.SCREEN;
        spark.start(true, 600, null, 40);
        //debugger;


// 		game.time.events.add(3000, (emit_destroy) => {
// 			//explosion.destroy();
// 		}, this);
    },
    render: function() {
        game.debug.text("Edit main.js to create your own particle animations", 25, 32);
    },
}

game = new Phaser.Game(450, 600, Phaser.AUTO);
game.state.add('ParticleExample', ParticleExample);
game.state.start('ParticleExample');
