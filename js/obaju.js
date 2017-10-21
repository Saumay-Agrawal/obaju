var config = {
    apiKey: "AIzaSyD8sdRfOVnghYY73jFqtvSbRXAcuE_bkWQ",
    authDomain: "obaju-37cfd.firebaseapp.com",
    databaseURL: "https://obaju-37cfd.firebaseio.com",
    projectId: "obaju-37cfd",
    storageBucket: "obaju-37cfd.appspot.com",
    messagingSenderId: "652382473710"
  };
  firebase.initializeApp(config);

var databaseURL=firebase.database();
function validateEmail(email) {
	var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    return true;
}
function register()
{	var email=document.getElementById("email").value;
	var password=document.getElementById("password").value;
	var name=document.getElementById("name").value;
	localStorage.name=name;
	alert(email);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert(errorMessage);
});
	localStorage.method="email";

}
function login()
{
	var email=document.getElementById("email").value;
	var password=document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
});
	alert("logged in!!");
	 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  		alert(user.displayName);
  }
});
}
function login_modal()
{	var email=document.getElementById("email-modal").value;
	var password=document.getElementById("password-modal").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
});
	alert("logged in!!");
	 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  		alert(user.displayName);
  }
});
}
function subscribe()
{ var email=document.getElementById("subsemail").value;
	if(validateEmail(email))
	{

	}
}

function googleLogin()
{
	
	var provider=new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result){
		if(result.credential)
		{		
		}
		alert("logged in!!");
		localStorage.method="google";
		
	}).catch(function(error){
		var errorCode=error.code;
		var errorMessage=error.message;
		var email=error.email;
		alert(errorMessage);
	});

	
}


function writeuserdata(user)
{	alert("writedata!!");
	alert(user.displayName);
	databaseURL.ref("users/"+user.uid).set({
		name:user.displayName
	});
}