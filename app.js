//3/5/20 update 1.1
var context;
var remain;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var food_remain;
var userKeys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
};

//where packman face tend to. 
var packmanLeft = false;
var packmanRight = true;
var packmanUp = false;
var packmanDown = false;


function GetKeyPressed() {
	if (flagRandom) {

		if (keysDown[38]) {
			packmanUp = true;
			packmanLeft = false;
			packmanRight = false;
			packmanDown = false;
			return 1;
		}
		if (keysDown[40]) {
			packmanDown = true;
			packmanLeft = false;
			packmanRight = false;
			packmanUp = false;
			return 2;
		}
		if (keysDown[37]) {
			packmanLeft = true;
			packmanRight = false;
			packmanUp = false;
			packmanDown = false;
			return 3;
		}
		if (keysDown[39]) {
			packmanRight = true;
			packmanLeft = false;
			packmanUp = false;
			packmanDown = false;
			return 4;
		}
	}

	else {
		// var tmpUp=document.getElementById("upKey").value.charCodeAt(0);
		// var tmpDown=document.getElementById("downKey").value.charCodeAt(0);
		// var tmpRight=document.getElementById("rightKey").value.charCodeAt(0);
		// var tmpLeft=document.getElementById("leftKey").value.charCodeAt(0);
		//	alert(String.fromCharCode(evt.keyCode));

		if (keysDown[userKeys.up]) {
			packmanUp = true;
			packmanLeft = false;
			packmanRight = false;
			packmanDown = false;
			return 1;
		}
		if (keysDown[userKeys.down]) {
			packmanDown = true;
			packmanLeft = false;
			packmanRight = false;
			packmanUp = false;
			return 2;
		}
		if (keysDown[userKeys.left]) {
			packmanLeft = true;
			packmanRight = false;
			packmanUp = false;
			packmanDown = false;
			return 3;
		}
		if (keysDown[userKeys.right]) {
			packmanRight = true;
			packmanLeft = false;
			packmanUp = false;
			packmanDown = false;
			return 4;
		}
	}
}



function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 19; i++) {
		for (var j = 0; j < 13; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//is packman
			if (board[i][j] == 2) {
				if (packmanRight) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanLeft) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanUp) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				if (packmanDown) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				// circle to eat 5p
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color5; //color
				context.fill();
				// circle to eat 15p
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color15; //color
				context.fill();
				// circle to eat 25p
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color25; //color
				context.fill();
				//the wall
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}

			//need to add manster and pills.
		}
	}
}




function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		packmanUp = true;



	}
	if (x == 2) {
		if (shape.j < 12 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		packmanDown = true;


	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		packmanLeft = true;

	}
	if (x == 4) {
		if (shape.i < 18 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		packmanRight = true;


	}
	if (board[shape.i][shape.j] == 5) {
		score = score + 5;
	}
	if (board[shape.i][shape.j] == 6) {
		score = score + 15;
	}
	if (board[shape.i][shape.j] == 7) {
		score = score + 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();

	}

}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 18 + 1);
	var j = Math.floor(Math.random() * 12 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 18 + 1);
		j = Math.floor(Math.random() * 12 + 1);
	}
	return [i, j];
}


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	//var cnt = 100;
	var cnt = 13 * 19;
	// var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 19; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 13; j++) {
			if (
				(i == 3 && j == 0) ||
				(i == 15 && j == 0) ||
				(i == 1 && j == 1) ||
				(i == 3 && j == 1) ||
				(i == 5 && j == 1) ||
				(i == 7 && j == 1) ||
				(i == 8 && j == 1) ||
				(i == 9 && j == 1) ||
				(i == 10 && j == 1) ||
				(i == 11 && j == 1) ||
				(i == 13 && j == 1) ||
				(i == 15 && j == 1) ||
				(i == 17 && j == 1) ||
				(i == 1 && j == 2) ||
				(i == 5 && j == 2) ||
				(i == 9 && j == 2) ||
				(i == 13 && j == 2) ||
				(i == 17 && j == 2) ||
				(i == 0 && j == 3) ||
				(i == 1 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||
				(i == 6 && j == 3) ||
				(i == 7 && j == 3) ||
				(i == 9 && j == 3) ||
				(i == 11 && j == 3) ||
				(i == 12 && j == 3) ||
				(i == 13 && j == 3) ||
				(i == 14 && j == 3) ||
				(i == 15 && j == 3) ||
				(i == 17 && j == 3) ||
				(i == 18 && j == 3) ||
				(i == 1 && j == 4) ||
				(i == 5 && j == 4) ||
				(i == 13 && j == 4) ||
				(i == 17 && j == 4) ||
				(i == 1 && j == 5) ||
				(i == 3 && j == 5) ||
				(i == 5 && j == 5) ||
				(i == 7 && j == 5) ||
				(i == 8 && j == 5) ||
				(i == 10 && j == 5) ||
				(i == 11 && j == 5) ||
				(i == 13 && j == 5) ||
				(i == 15 && j == 5) ||
				(i == 17 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 7 && j == 6) ||
				(i == 11 && j == 6) ||
				(i == 15 && j == 6) ||
				(i == 1 && j == 7) ||
				(i == 3 && j == 7) ||
				(i == 5 && j == 7) ||
				(i == 7 && j == 7) ||
				(i == 8 && j == 7) ||
				(i == 9 && j == 7) ||
				(i == 10 && j == 7) ||
				(i == 11 && j == 7) ||
				(i == 13 && j == 7) ||
				(i == 15 && j == 7) ||
				(i == 17 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 5 && j == 8) ||
				(i == 13 && j == 8) ||
				(i == 17 && j == 8) ||
				(i == 0 && j == 9) ||
				(i == 1 && j == 9) ||
				(i == 3 && j == 9) ||
				(i == 4 && j == 9) ||
				(i == 5 && j == 9) ||
				(i == 6 && j == 9) ||
				(i == 7 && j == 9) ||
				(i == 9 && j == 9) ||
				(i == 11 && j == 9) ||
				(i == 12 && j == 9) ||
				(i == 13 && j == 9) ||
				(i == 14 && j == 9) ||
				(i == 15 && j == 9) ||
				(i == 17 && j == 9) ||
				(i == 18 && j == 9) ||
				(i == 1 && j == 10) ||
				(i == 5 && j == 10) ||
				(i == 9 && j == 10) ||
				(i == 13 && j == 10) ||
				(i == 17 && j == 10) ||
				(i == 1 && j == 11) ||
				(i == 3 && j == 11) ||
				(i == 5 && j == 11) ||
				(i == 7 && j == 11) ||
				(i == 8 && j == 11) ||
				(i == 9 && j == 11) ||
				(i == 10 && j == 11) ||
				(i == 11 && j == 11) ||
				(i == 13 && j == 11) ||
				(i == 15 && j == 11) ||
				(i == 17 && j == 11) ||
				(i == 3 && j == 12) ||
				(i == 15 && j == 12)) {
				board[i][j] = 4;
				//var rnd = getRandomInt(3)+5;//(5,6,7)

			}
			else {


				var randomNum = Math.random();
				if (randomNum <= (1 * food_remain) / cnt) {

					var rnd = Math.floor(Math.random() * 3 + 5);
					while (countBalls(rnd) === 0 && (numOfColor5 !== 0 || numOfColor15 !== 0 || numOfColor25 !== 0)) {
						rnd = Math.floor(Math.random() * 3 + 5);
					}
					//food_remain--;
					board[i][j] = rnd;
					if (rnd === 5) {
						numOfColor5--;
						food_remain--;
					}

					else if (rnd === 6) {
						numOfColor15--;
						food_remain--;
					}

					//if(rnd===7 ){
					else {
						numOfColor25--;
						food_remain--;
					}

				}
				else if (randomNum < (1 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				}
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	if (typeof shape.i == "undefined") {
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2;
		pacman_remain--;
	}


	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		// board[emptyCell[0]][emptyCell[1]] = 1;
		// food_remain--;

		var rnd = Math.floor(Math.random() * 3 + 5);
		while (countBalls(rnd) === 0 && (numOfColor5 !== 0 || numOfColor15 !== 0 || numOfColor25 !== 0)) {
			rnd = Math.floor(Math.random() * 3 + 5);
		}

		board[emptyCell[0]][emptyCell[1]] = rnd;
		if (rnd === 5) {
			numOfColor5--;
			food_remain--;
		}

		else if (rnd === 6) {
			numOfColor15--;
			food_remain--;
		}

		//if(rnd===7 ){
		else {
			numOfColor25--;
			food_remain--;
		}
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
}






function countBalls(num) {
	if (num === 5) {
		return numOfColor5;
	}
	if (num === 6) {
		return numOfColor15;
	}
	if (num === 7) {
		return numOfColor25;
	}
}



