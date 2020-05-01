var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;



 

function clearAll(){
	document.getElementById("form_username").value='';
	document.getElementById("form_fname").value='';
	document.getElementById("form_sname").value='';
	document.getElementById("form_email").value='';
	document.getElementById("form_password").value='';
	datepicker._clearDate("datepickerform");
	
	//document.getElementById("form_username").value='';
}
function clearAllErrorMsg(){
	document.getElementById("userName_error_message").innerHTML="";
	    // 	$("#password_error_message").hide();
		//    $("#password_error_message").css("border-bottom","2px solid #34F458");
		//    $("#userName_error_message").hide();
		//    $("#userName_error_message").css("border-bottom","2px solid #34F458");
		//    $("#fname_error_message").hide();
		//    $("#fname_error_message").css("border-bottom","2px solid #34F458");
		//    $("#sname_error_message").hide();
		//    $("#sname_error_message").css("border-bottom","2px solid #34F458");
		//    $("#email_error_message").hide();
		//    $("#email_error_message").css("border-bottom","2px solid #34F458");

	

	// $("#userName_error_message").hide();
	// $("#fname_error_message").hide();
	// $("#sname_error_message").hide();
	// $("#email_error_message").hide();
	// $("#password_error_message").hide();
	// datepicker.getEditor().clear();
	//document.getElementById("form_username").value='';
}



function loginFunc(){
	var loguserName = document.getElementById("login_username");
	var logpassward = document.getElementById("login_password"); 
	//var temp=localStorage.getItem(loguserName);
		// if(userName===userAndPassArray[i][0] && passward===userAndPassArray[i][1]){
		if(loguserName.value===""||logpassward.value===""){
				window.alert("register failed null");
				return false;
		}
		
		if(localStorage.getItem(loguserName.value)==logpassward.value){
			window.alert("confirm");
			return true;
		}
	
	window.alert("wrong pass");
	return false;
}


function registerFunc(){
	let userName = document.getElementById("form_username").value;
	console.log(userName);
	let passward = document.getElementById("form_password").value; 
	console.log(passward);
	if(userName===""|| passward===""){
		window.alert("please fill the");
		return;
	}
	if(checkIfExist()===false){
		localStorage.setItem(userName,passward);
		window.alert("succses");
		showLogin();
		clearAll();
		clearAllErrorMsg();
		
		
		
	}
	else{
		window.alert("register failed");
	}
	
}

$(document).ready(function() {
	
	localStorage.setItem("p","p");
});





function checkIfExist(){
	let userName = document.getElementById('form_username').value;
	let  passward = document.getElementById('form_password').value; 
	for(var i=0;i<localStorage.length;i++){
		if(localStorage.getItem(localStorage.key(i))==passward && userName==localStorage.key(i)){	
			return true;
		}
	}
	return false;
}








 $(function() {

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
	var  error_birthday = false;
	$("#form_username").focusout(function(){
		check_UserName();
	 });
	 $("#form_fname").focusout(function(){
		check_fname();
	 });
	 $("#form_sname").focusout(function() {
		check_sname();
	 });
	 $("#form_password").focusout(function() {
		check_password();
	 });
	$("#form_email").focusout(function() {
	   check_email();
	});
	$("#datepicker").focusout(function() {
		
		check_Birthday();
	 });
	
	function check_UserName() {
		//var pattern = /^[a-zA-Z]*$/;
		var userName = $("#form_username").val();
		if ( userName !== '' ) {
		   $("#userName_error_message").hide();
		   $("#form_username").css("border-bottom","2px solid #34F458");
		} else {
		   $("#userName_error_message").html("Please insert your user Name ");
		   $("#userName_error_message").show();
		   $("#form_username").css("border-bottom","2px solid #F90A0A");
		   error_userName = true;
		}
	 }
 

	function check_fname() {
	   var pattern = /^[a-zA-Z]*$/;
	   var fname = $("#form_fname").val();
	   if (pattern.test(fname) && fname !== '' && fname.length>2) {
		  $("#fname_error_message").hide();
		  $("#form_fname").css("border-bottom","2px solid #34F458");
	   } else {
		  $("#fname_error_message").html("insert only and more then 2 characters");
		  $("#fname_error_message").show();
		  $("#form_fname").css("border-bottom","2px solid #F90A0A");
		  error_fname = true;
	   }
	}

	function check_sname() {
	   var pattern = /^[a-zA-Z]*$/;
	   var sname = $("#form_sname").val()
	   if (pattern.test(sname) && sname !== '' && sname.length>2) {
		  $("#sname_error_message").hide();
		  $("#form_sname").css("border-bottom","2px solid #34F458");
	   } else {
		  $("#sname_error_message").html("insert only and more then 2 characters");
		  $("#sname_error_message").show();
		  $("#form_sname").css("border-bottom","2px solid #F90A0A");
		  error_fname = true;
	   }
	}

	function check_password() {
	   var password_length = $("#form_password").val().length;
	   var re = /(?=.*\d)(?=.*[a-zA-Z])/;
	   
	   if (password_length < 6 || !re.test($("#form_password").val())) {
		  $("#password_error_message").html("Atleast 6 Characters");
		  $("#password_error_message").show();
		  $("#form_password").css("border-bottom","2px solid #F90A0A");
		  error_password = true;
	   } else {
		  $("#password_error_message").hide();
		  $("#form_password").css("border-bottom","2px solid #34F458");
	   }
	}

	function check_email() {
	   var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	   var email = $("#form_email").val();
	   if (pattern.test(email) && email !== '') {
		  $("#email_error_message").hide();
		  $("#form_email").css("border-bottom","2px solid #34F458");
	   } else {
		  $("#email_error_message").html("Invalid Email");
		  $("#email_error_message").show();
		  $("#form_email").css("border-bottom","2px solid #F90A0A");
		  error_email = true;
	   }
	}

	 function check_Birthday() {
		$("#datepickerform").css("border-bottom","2px solid #34F458");
	 }


	$("#registration_form").submit(function() {
	   error_fname = false;
	   error_sname = false;
	   error_email = false;
	   error_password = false;
	   error_userName = false;
	  // error_birthday =false;
	   check_fname();
	   check_sname();
	   check_email();
	   check_password();
	   check_UserName();
	  check_Birthday();
		
	   if (error_fname === false && error_sname === false && error_email === false && error_password === false && error_userName === false && checkIfExist()===false) {
		alert("Registration done");
		//showLogin();

		showLogin();
		  return true;
	   } else {
		   if(!checkIfExist()){
			alert("Please Fill the form Correctly");
		   }
		  return false;
	   }
	});
  });

$( function() {
	$( "#datepickerform" ).datepicker();	
  } );

	












function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
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
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
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
































	// var fullNameValidate = function(){
	// 	var fullName= document.getElementById('FullName').value;
	// 	var req=/^[a-zA-Z ]+$/;

	// 	if(!req.test(fullName)){
	// 		window.alert("enter only characters")
	// 	}
	// }


	// validation of Register

	// $.validator.setDefaults({
	// 	submitHandler: function() {
	// 		alert("submitted!");
	// 	}
	// });

	// $().ready(function() {
	// 	// validate signup form on keyup and submit
	// 	$("#Register").validate({
	// 		rules: {
	// 			Username: "required",
	// 			username: {
	// 				required: true,
	// 				minlength: 2
	// 			},
	// 			password: {
	// 				required: true,
	// 				minlength: 6
					
	// 			},
	// 			email: {
	// 				required: true,
	// 				email: true
	// 			},
	// 			FullName:{
	// 				required: true,
					
					
	// 			}
	// 		},
	// 		messages: {
	// 			Username: "Please enter your Username",
	// 			username: {
	// 				required: "Please enter a username",
	// 				minlength: "Your username must consist of at least 2 characters"
	// 			},
	// 			password: {
	// 				required: "Please provide a password",
	// 				minlength: "Your password must be at least 6 characters long"
	// 			},
	// 			email: "Please enter a valid email address",
	// 		}
	// 	});

		// propose username by combining first- and lastname

		// $("#username").focus(function() {
		// 	var Username = $("#Username").val();
		// 	var lastname = $("#lastname").val();
		// 	if (firstname && lastname && !this.value) {
		// 		this.value = firstname + "." + lastname;
		// 	}
		// });

		
		
		// newsletter topics are optional, hide at first
	// 	var inital = newsletter.is(":checked");
	// 	var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
	// 	var topicInputs = topics.find("input").attr("disabled", !inital);
	// 	// show when newsletter is checked
	// 	newsletter.click(function() {
	// 		topics[this.checked ? "removeClass" : "addClass"]("gray");
	// 		topicInputs.attr("disabled", !this.checked);
	// 	});
	// });
	
	
//}
