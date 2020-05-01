function showRegister(){
   
    $(document.getElementById("RegisterSection")).show();
    $(document.getElementById("LoginSection")).hide();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).hide();
    //$(document.getElementById("Welcome")).hide();
    return true;
}
function showLogin(){
   
   
    $(document.getElementById("RegisterSection")).hide();
    $(document.getElementById("LoginSection")).show();
    $(document.getElementById("GamePlaySection")).hide();
    $(document.getElementById("SettingsSection")).hide();
    //$(document.getElementById("Welcome")).hide();
    return true;
}