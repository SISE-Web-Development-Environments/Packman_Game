function showRegister(){
   
    $(document.getElementById("Register")).show();
    $(document.getElementById("Login")).hide();
    $(document.getElementById("GamePlay")).hide();
    $(document.getElementById("Settings")).hide();
    //$(document.getElementById("Welcome")).hide();
}
function showLogin(){
   
    $(document.getElementById("Register")).hide();
    $(document.getElementById("Login")).show();
    $(document.getElementById("GamePlay")).hide();
    $(document.getElementById("Settings")).hide();
    //$(document.getElementById("Welcome")).hide();
}