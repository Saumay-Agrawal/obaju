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

function subscribe()
{ var email=document.findElementById("subsemail");
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
			var user=result.user;
			writeuserdata(user);
		
	}).catch(function(error){
		var errorCode=error.code;
		var errorMessage=error.message;
		var email=error.email;
		alert(errorMessage);
	});

	
}


function writeuserdata(user)
{	alert(user.displayName);
	databaseURL.ref("users/test").set({
		name:user.displayName
	});
}