//3/5/20
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
var color5;
var color15;
var color25;
var numOfColor5;
var numOfColor15;
var numOfColor25;

var flagRandom = false;
var timeLimit;
var numManster;
//where packman face tend to. 
var packmanLeft = false;
var packmanRight = true;
var packmanUp = false;
var packmanDown = false;
//controller keys
var up = 38;
var down = 40;
var right = 39;
var left = 37;

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



$(function () {
	$("#datepickerform").datepicker();
});
$(function () {

	$("#fname_error_message").hide();
	$("#sname_error_message").hide();
	$("#email_error_message").hide();
	$("#password_error_message").hide();
	$("#userName_error_message").hide();
	$("#birthday_error_message").hide();
	var error_fname = false;
	var error_sname = false;
	var error_email = false;
	var error_password = false;
	var error_userName = false;
	var error_birthday = false;
	$("#form_username").focusout(function () {
		check_UserName();
	});
	$("#form_fname").focusout(function () {
		check_fname();
	});
	$("#form_sname").focusout(function () {
		check_sname();
	});
	$("#form_password").focusout(function () {
		check_password();
	});
	$("#form_email").focusout(function () {
		check_email();
	});
	$("#datepicker").focusout(function () {

		check_Birthday();
	});

	function check_UserName() {
		//var pattern = /^[a-zA-Z]*$/;
		var userName = $("#form_username").val();
		if (userName !== '') {
			$("#userName_error_message").hide();
			$("#form_username").css("border-bottom", "2px solid #34F458");
		} else {
			$("#userName_error_message").html("Please insert your user Name ");
			$("#userName_error_message").show();
			$("#form_username").css("border-bottom", "2px solid #F90A0A");
			error_userName = true;
		}
	}


	function check_fname() {
		var pattern = /^[a-zA-Z]*$/;
		var fname = $("#form_fname").val();
		if (pattern.test(fname) && fname !== '' && fname.length > 2) {
			$("#fname_error_message").hide();
			$("#form_fname").css("border-bottom", "2px solid #34F458");
		} else {
			$("#fname_error_message").html("insert only and more then 2 characters");
			$("#fname_error_message").show();
			$("#form_fname").css("border-bottom", "2px solid #F90A0A");
			error_fname = true;
		}
	}

	function check_sname() {
		var pattern = /^[a-zA-Z]*$/;
		var sname = $("#form_sname").val()
		if (pattern.test(sname) && sname !== '' && sname.length > 2) {
			$("#sname_error_message").hide();
			$("#form_sname").css("border-bottom", "2px solid #34F458");
		} else {
			$("#sname_error_message").html("insert only and more then 2 characters");
			$("#sname_error_message").show();
			$("#form_sname").css("border-bottom", "2px solid #F90A0A");
			error_fname = true;
		}
	}

	function check_password() {
		var password_length = $("#form_password").val().length;
		var re = /(?=.*\d)(?=.*[a-zA-Z])/;

		if (password_length < 6 || !re.test($("#form_password").val())) {
			$("#password_error_message").html("Atleast 6 Characters");
			$("#password_error_message").show();
			$("#form_password").css("border-bottom", "2px solid #F90A0A");
			error_password = true;
		} else {
			$("#password_error_message").hide();
			$("#form_password").css("border-bottom", "2px solid #34F458");
		}
	}

	function check_email() {
		var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = $("#form_email").val();
		if (pattern.test(email) && email !== '') {
			$("#email_error_message").hide();
			$("#form_email").css("border-bottom", "2px solid #34F458");
		} else {
			$("#email_error_message").html("Invalid Email");
			$("#email_error_message").show();
			$("#form_email").css("border-bottom", "2px solid #F90A0A");
			error_email = true;
		}
	}

	function check_Birthday() {

		$("#datepickerform").css("border-bottom", "2px solid #34F458");
		$("#datepickerform").html("")
	}


	$("#registration_form").submit(function () {
		error_fname = false;
		error_sname = false;
		error_email = false;
		error_password = false;
		error_userName = false;
		error_birthday = false;
		check_fname();
		check_sname();
		check_email();
		check_password();
		check_UserName();
		check_Birthday();

		if (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false) {
			alert("Registration full");
			//showLogin();

			showLogin();
			//return true;
		} else {
			alert("Please Fill the form Correctly");
			// return false;
		}


	});
});


function allfill() {
	error_fname = false;
	error_sname = false;
	error_email = false;
	error_password = false;
	error_userName = false;
	error_birthday = false;
	check_fname();
	check_sname();
	check_email();
	check_password();
	check_UserName();
	check_Birthday();

	if (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false) {
		alert("Registration full");
		showLogin();
	}
	else {
		alert("Please Fill the form Correctly");
	}

}

function checkIfExist() {
	var userName = document.getElementById('form_username').value;
	var passward = document.getElementById('form_password').value;
	for (i = 0; i < userAndPassArray.length; i++) {
		if (userName === userAndPassArray[i][0] && passward === userAndPassArray[i][1]) {
			return true;
		}
	}
	return false;
}

function registerFunc() {
	var userName = document.getElementById('form_username').value;
	var passward = document.getElementById('form_password').value;
	if (userName === "" || passward === "") {
		window.alert("register failed null");
		return false;
	}
	if (!checkIfExist()) {
		//	userAndPassArray.push(["userName","passward"]);
		localStorage.setItem(userName, passward);
		//window.alert("succses")
		return true;
	}
	window.alert("register failed");
	return false;
}

function loginFunc() {
	var loguserName = document.getElementById("login_username").value;
	var logpassward = document.getElementById("login_password").value;
	var temp = localStorage.getItem(loguserName);
	if (temp == logpassward) {
		window.alert("confirm");
		showSetting();
		return true;
	}

	window.alert("wrong pass");
	return false;
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

$(function () {

	// $("#upKey_error_message").hide();
	// $("#downKey_error_message").hide();
	// $("#rightKey_error_message").hide();
	// $("#leftKey_error_message").hide();
	$("#keys_error_message").hide();
	//setting check all fill
	var error_keys = false;
	// var error_upKey = false;
	// var error_downKey = false;
	// var error_rightKey = false;
	// var error_leftKey = false;

	var error_numOfBalls = false;
	var error_timeOfGame = false;
	var error_numberOfMansters = false;

	var error_colors = false;

	$("#upKey").focusout(function () {
		checKeys();
	});
	$("#downKey").focusout(function () {
		checKeys();
	});
	$("#rightKey").focusout(function () {
		checKeys();
	});
	$("#leftKey").focusout(function () {
		checKeys();
	});



	$("#numOfBalls").focusout(function () {
		checkNumOfBalls();
	});
	$("#timeOfGame").focusout(function () {
		checkTimeOfGame();
	});
	$("#numberOfMansters").focusout(function () {
		checkNumberOfMansters();
	});

	$("#color25p").focusout(function () {
		checkColors();
	});
	$("#color15p").focusout(function () {
		checkColors();
	})
	$("#color5p").focusout(function () {
		checkColors();
	})
	function checkColors() {
		var c5 = document.getElementById("color5p").value;
		var c15 = document.getElementById("color15p").value;
		var c25 = document.getElementById("color25p").value;
		if (!(c5 === c15 || c5 === c25 || c15 === c25)) {

			$("#colors_error_message").hide();
			$("#color5p").css("border-bottom", "2px solid #34F458");
			$("#color15p").css("border-bottom", "2px solid #34F458");
			$("#color25p").css("border-bottom", "2px solid #34F458");
			return true;
		}
		else {
			$("#colors_error_message").html("Please select different colors ");
			$("#colors_error_message").show();
			$("#color5p").css("border-bottom", "2px solid #F90A0A");
			$("#color15p").css("border-bottom", "2px solid #F90A0A");
			$("#color25p").css("border-bottom", "2px solid #F90A0A");
			error_colors = true;
			return false;
		}
	}



	function checkNumOfBalls() {

		var numOfBallsIn = $("#numOfBalls").val();
		if (numOfBallsIn !== '') {
			$("#numOfBalls_error_message").hide();
			$("#numOfBalls").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#numOfBalls_error_message").html("Please fill this field ");
			$("#numOfBalls_error_message").show();
			$("#numOfBalls").css("border-bottom", "2px solid #F90A0A");
			error_numOfBalls = true;
			return false;
		}
	}


	function checkTimeOfGame() {

		var timeOfGameIn = $("#timeOfGame").val();
		if (timeOfGameIn !== '') {
			$("#timeOfGame_error_message").hide();
			$("#timeOfGame").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#timeOfGame_error_message").html("Please fill this field ");
			$("#timeOfGame_error_message").show();
			$("#timeOfGame").css("border-bottom", "2px solid #F90A0A");
			error_timeOfGame = true;
			return false;
		}
	}


	function checkNumberOfMansters() {

		var numberOfManstersIn = $("#numberOfMansters").val();
		if (numberOfManstersIn !== '') {
			$("#numberOfMansters_error_message").hide();
			$("#numberOfMansters").css("border-bottom", "2px solid #34F458");
			return true;
		} else {
			$("#numberOfMansters_error_message").html("Please fill this field ");
			$("#numberOfMansters_error_message").show();
			$("#numberOfMansters").css("border-bottom", "2px solid #F90A0A");
			error_numberOfMansters = true;
			return false;
		}
	}


	function checKeys() {

		var upIn = $("#upKey").val();
		var downIn = $("#downKey").val();
		var rightIn = $("#rightKey").val();
		var leftIn = $("#leftKey").val();
		//if (upIn !== '') {
		if (!(upIn === downIn || upIn === rightIn || upIn === leftIn || downIn === rightIn || downIn === leftIn || rightIn === leftIn)
			&& (upIn !== '' && downIn !== '' && rightIn !== '' && leftIn !== '')) {
			$("#keys_error_message").hide();
			$("#upKey").css("border-bottom", "2px solid #34F458");
			$("#downKey").css("border-bottom", "2px solid #34F458");
			$("#rightKey").css("border-bottom", "2px solid #34F458");
			$("#leftKey").css("border-bottom", "2px solid #34F458");
			error_keys = false;
			return true;
		}
		else {
			$("#keys_error_message").html("Please all keys correctly ");
			$("#keys_error_message").show();
			$("#upKey").css("border-bottom", "2px solid #F90A0A");
			$("#downKey").css("border-bottom", "2px solid #F90A0A");
			$("#rightKey").css("border-bottom", "2px solid #F90A0A");
			$("#leftKey").css("border-bottom", "2px solid #F90A0A");
			error_Keys = true;
			return false;
		}
	}


});

//double code ----------------------------------------------------
function checkColors() {
	var c5 = document.getElementById("color5p").value;
	var c15 = document.getElementById("color15p").value;
	var c25 = document.getElementById("color25p").value;
	if (!(c5 === c15 || c5 === c25 || c15 === c25)) {

		$("#colors_error_message").hide();
		$("#color5p").css("border-bottom", "2px solid #34F458");
		$("#color15p").css("border-bottom", "2px solid #34F458");
		$("#color25p").css("border-bottom", "2px solid #34F458");
		return true;
	}
	else {
		$("#colors_error_message").html("Please select different colors ");
		$("#colors_error_message").show();
		$("#color5p").css("border-bottom", "2px solid #F90A0A");
		$("#color15p").css("border-bottom", "2px solid #F90A0A");
		$("#color25p").css("border-bottom", "2px solid #F90A0A");
		error_colors = true;
		return false;
	}
}



function checkNumOfBalls() {

	var numOfBallsIn = $("#numOfBalls").val();
	if (numOfBallsIn !== '') {
		$("#numOfBalls_error_message").hide();
		$("#numOfBalls").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#numOfBalls_error_message").html("Please fill this field ");
		$("#numOfBalls_error_message").show();
		$("#numOfBalls").css("border-bottom", "2px solid #F90A0A");
		error_numOfBalls = true;
		return false;
	}
}


function checkTimeOfGame() {

	var timeOfGameIn = $("#timeOfGame").val();
	if (timeOfGameIn !== '') {
		$("#timeOfGame_error_message").hide();
		$("#timeOfGame").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#timeOfGame_error_message").html("Please fill this field ");
		$("#timeOfGame_error_message").show();
		$("#timeOfGame").css("border-bottom", "2px solid #F90A0A");
		error_timeOfGame = true;
		return false;
	}
}


function checkNumberOfMansters() {

	var numberOfManstersIn = $("#numberOfMansters").val();
	if (numberOfManstersIn !== '') {
		$("#numberOfMansters_error_message").hide();
		$("#numberOfMansters").css("border-bottom", "2px solid #34F458");
		return true;
	} else {
		$("#numberOfMansters_error_message").html("Please fill this field ");
		$("#numberOfMansters_error_message").show();
		$("#numberOfMansters").css("border-bottom", "2px solid #F90A0A");
		error_numberOfMansters = true;
		return false;
	}
}


function checKeys() {

	var upIn = $("#upKey").val();
	var downIn = $("#downKey").val();
	var rightIn = $("#rightKey").val();
	var leftIn = $("#leftKey").val();
	//if (upIn !== '') {
	if (!(upIn === downIn || upIn === rightIn || upIn === leftIn || downIn === rightIn || downIn === leftIn || rightIn === leftIn)
		&& (upIn !== '' && downIn !== '' && rightIn !== '' && leftIn !== '')) {
		$("#keys_error_message").hide();
		$("#upKey").css("border-bottom", "2px solid #34F458");
		$("#downKey").css("border-bottom", "2px solid #34F458");
		$("#rightKey").css("border-bottom", "2px solid #34F458");
		$("#leftKey").css("border-bottom", "2px solid #34F458");
		error_keys = false;
		return true;
	}
	else {
		$("#keys_error_message").html("Please all keys correctly ");
		$("#keys_error_message").show();
		$("#upKey").css("border-bottom", "2px solid #F90A0A");
		$("#downKey").css("border-bottom", "2px solid #F90A0A");
		$("#rightKey").css("border-bottom", "2px solid #F90A0A");
		$("#leftKey").css("border-bottom", "2px solid #F90A0A");
		error_Keys = true;
		return false;
	}
}
//double code ------------------------------------------------------------------------

$("#submitButton").click(function () {
	error_Keys = false;
	error_numOfBalls = false;
	error_numberOfMansters = false;
	error_colors = false;
	error_timeOfGame = false;
	// error_upKey = false;
	// error_downKey = false;
	// error_rightKey = false;
	// error_leftKey = false;
	// checkUpKey();
	// checkDownKey();
	// checkRightKey();
	// checkLeftKey();
	checKeys();
	checkNumberOfMansters();
	checkTimeOfGame();
	checkColors();
	checkNumOfBalls();
	alert("stam");
	// if (error_Keys === false && error_numOfBalls === false && error_numberOfMansters === false && error_colors === false 
	// 	&& error_timeOfGame===false) {
	// 	alert("setting done");
	// 	showGame();
	// }
	// else {
	// 	alert("Please Fill the form Correctly");	
	// }
});



function get_random_color() {
	var color = "";
	for (var i = 0; i < 3; i++) {
		var sub = Math.floor(Math.random() * 256).toString(16);
		color += (sub.length == 1 ? "0" + sub : sub);
	}
	return "#" + color;
}

function randomSetting() {

	flagRandom = true;
	food_remain = Math.floor(Math.random() * 40) + 50;

	remain = food_remain;
	color5 = get_random_color();
	color15 = get_random_color();
	color25 = get_random_color();
	while (color5 === color15 || color5 === color25 || color25 === color15) {
		color5 = get_random_color();
		color15 = get_random_color();
		color25 = get_random_color();
	}
	numOfColor5 = Math.floor(food_remain * 0.6);
	remain = remain - numOfColor5;
	numOfColor15 = Math.floor(food_remain * 0.3);
	remain = remain - numOfColor15;
	numOfColor25 = remain;
	timeLimit = Math.floor(Math.random() * 100 + 60);
	numManster = Math.floor(Math.random() * 4 + 1);
	alert("random   " + "fr:" + food_remain + ".\n c5:" + color5 + ".\n c15:" + color15 + ".\n nc5:" + numOfColor5 + ".\n nc15:" + numOfColor15 + ".\n c25:" + color25 + ".\n nc25:" + numOfColor25 + ".\n limT:" + timeLimit + ".\n nManster:" + numManster);

	$(document).ready(function () {
		context = canvas.getContext("2d");
		Start();
	});
	showGame();
}
function submitSetting() {

	flagRandom = false;
	food_remain = document.getElementById("numOfBalls").value;
	remain = food_remain;
	color5 = document.getElementById("color5p").value;
	color15 = document.getElementById("color15p").value;
	color25 = document.getElementById("color25p").value;

	numOfColor5 = Math.floor(food_remain * 0.6);
	remain = remain - numOfColor5;
	numOfColor15 = Math.floor(food_remain * 0.3);
	remain = remain - numOfColor15;
	numOfColor25 = remain;

	timeLimit = document.getElementById("timeOfGame").value;
	numManster = document.getElementById("numberOfMansters").value;

	var character = document.getElementById("upKey").value.substring(0, 1);
	up = document.getElementById("upKey").value.charCodeAt(0);
	up = up - 32;
	userKeys.up = up;
	down = document.getElementById("downKey").value.charCodeAt(0);
	down = down - 32;
	userKeys.down = down;
	right = document.getElementById("rightKey").value.charCodeAt(0);
	right = right - 32;
	userKeys.right = right;
	left = document.getElementById("leftKey").value.charCodeAt(0);
	left = left - 32;
	userKeys.left = left;

	if (!checkColors() || !checKeys() || !checkTimeOfGame() || !checkNumOfBalls() || !checkNumberOfMansters()) {
		alert("fill correctly the red line!");
	}
	else {
		alert("submit");

		$(document).ready(function () {
			context = canvas.getContext("2d");
			Start();
		});
		showGame();
	}



	$(document).ready(function () {

		localStorage.setItem("p", "p");
	});






}
