;(function(){

	var Game = function(canvasId){
		//console.log("Hello world!");
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		var gameSize = {
			x: canvas.width,
			y: canvas.height
		};

		this.bodies = [new Player(this, gameSize)];

		var self = this;
		var tick = function(){
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		}

		tick();
	}

	Game.prototype = {

		update: function(){
			// console.log("Hello");
			for (var i = 0; i < this.bodies.length; i++) {
				this.bodies[i].update();
			}
		},
		draw: function(screen, gameSize){
			//screen.fillRect(150, 150, 32, 32);
			clearCanvas(screen, gameSize);
			for (var i = 0; i < this.bodies.length; i++) {
				drawRect(screen, this.bodies[i]);
			}
		}
	}

	var Player = function(game, gameSize){
		this.game = game;
		this.size = {width:16, height:16};
		this.position = {x: gameSize.x/2 - this.size.width/2, y: gameSize.y/2 - this.size.height/2};
		this.keyboarder = new Keyboarder();
	}

	Player.prototype = {
		update: function(){
			if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
				if (this.position.x < 0) this.position.x=0;
				this.position.x -=5;
			};
			if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGTH)) {
				if (this.position.x > 784) this.position.x=784;
				this.position.x +=5;
			};
			if(this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)){
				
			}; 
		}
	}


	var Keyboarder = function(){
		var keyState = {};

		window.onkeydown = function(e){
			keyState[e.keyCode] = true;
		}

		window.onkeyup = function(e){
			keyState[e.keyCode] = false;
		}

		this.isDown = function(keyCode){
			return keyState[keyCode] === true;
		}

		this.KEYS = {LEFT: 37, RIGTH: 39, SPACE: 32};
	}

	var drawRect = function(screen, body){
		screen.fillRect(body.position.x, body.position.y, body.size.width, body.size.height);
	}

	var clearCanvas = function(screen, gameSize){
		screen.clearRect(0, 0, gameSize.x, gameSize.y);
	}

	window.onload = function(){
		new Game("screen");
	}

})();