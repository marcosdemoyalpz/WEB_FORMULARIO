$( document ).ready(function(){
  $(".button-collapse").sideNav();
})

$("#showFormulario").click(function() {
  showHideFormulario();
});

function showHideFormulario()
{
  hideFormularios();
  $("#formularioContainer").fadeIn("slow");
}

function showHideRegister()
{
  hideFormularios();
  $("#registerContainer").fadeIn("slow");
}

function showHideListado()
{
  hideFormularios();
  $("#listadoContainer").fadeIn("slow");
}

function hideFormularios(){
  $("#loginContainer").hide();
  $("#listadoContainer").hide();
  $("#formularioContainer").hide();
}

function submitLogin(){
  var data = {
    username: $("#username").val(),
    password: $("#password").val()
  }

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/login',
    data: data,
    dataType: 'json',
    success: function (result, error) {
            //console.log(JSON.stringify(result));

            if(result){

              sessionStorage.setItem("user", JSON.stringify(result));
              alert("You have logged in successfully!");
              $("#loginContainer").hide();
              $("#mainContainer").fadeIn("slow");
              $("#listadoContainer").fadeIn("slow");
              $("#navMenu").fadeIn("slow");

              getUserList();
            }

          },

          error: function (error) {
            alert("Invalid Credentials");
          }
          
        });
  event.preventDefault();
}

function getUserList()
{
  var data = [];
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/getAllUsers',
    data: data,
    dataType: 'json',
    success: function (result, error) {
      if(result){
        console.log(JSON.stringify(result));
        for (var i = 0; i < result.length; i++) {
          $("#usersTable tbody").append(
            '<tr><td>' + result[i].username + '</td><td>'+ result[i].active +'</td></tr>'
            );
        }
      }

    },
    error: function (error) {
      alert("No users found!");
    }

  });
  event.preventDefault();
}