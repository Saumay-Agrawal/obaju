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

var USER;
var cartrow=0,oCell;

function validateEmail(email) {
	var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    return true;
}


function register() {
	var email=document.getElementById("email").value;
	var password=document.getElementById("password").value;
	var name=document.getElementById("name").value;
	localStorage.name=name;
	//alert(email);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
  // ...
		alert(errorMessage);
	});
	localStorage.method="email";
}

function login() {
	var email=document.getElementById("emaillogin").value;
	//alert(email);
	var password=document.getElementById("passwordlogin").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		alert(errorMessage);
  		// ...
	});
	//alert("logged in!!");
}

function login_modal() {
	var email=document.getElementById("email-modal").value;
	var password=document.getElementById("password-modal").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage);
		// ...
	});
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
		alert("Session User: " + user.displayName);
        USER=user;
		localStorage.user=user;
        if(localStorage.method=="google") {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
                // alert(user.displayName);
                usersRef=databaseURL.ref("users");
        		usersRef.once('value', function(snapshot) {
  				if (snapshot.hasChild(user.uid)) {
    				//alert('exists');
					}
				else {
					writeuserdata(user);
					}
				});

    	    }
    	else {
            	user.updateProfile({
            		displayName: localStorage.name
            	}).then(function() {
                	}, function(error) {
        	    // An error happened.
                	});
            	alert(user.displayName);
            	usersRef=databaseURL.ref("users");
        		usersRef.once('value', function(snapshot) {
  					if (snapshot.hasChild(user.uid)) {
    					//alert('exists');
						}
					else {
						writeuserdata(user);
						}
					});
    	       	//alert("inside");
    		}
		}
    else {
        // User is signed out.
        // ...
          }
});

function logout() {
	firebase.auth().signOut().then(
		function() {
		//alert("logged out!!");
		},
		function(error) {
			console.error('Sign Out Error', error);
		}
	);
	alert("logged out!!");
}

function subscribe() {
	var email=document.getElementById("subsemail").value;
		if(validateEmail(email)) {

		}
}

function googleLogin() {
	var provider=new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result){
		if(result.credential) {		
		}
		//alert("logged in!!");
		localStorage.method="google";
		
	}).catch(function(error){
			var errorCode=error.code;
			var errorMessage=error.message;
			var email=error.email;
			alert(errorMessage);
		});	
}

function writeuserdata(user) {
	//alert("writedata!!");
	//alert(user.displayName);
	databaseURL.ref("users/"+user.uid).set({
		name:user.displayName
	});
}

function wishlist(prodid,user) {

	prodRef=databaseURL.ref("products");
	wishlistRef=databaseURL.ref("users/"+user.uid+"/wishlist");
    wishlistRef.once('value', function(snapshot) {
  		if (snapshot.hasChild(prodid)) {
  			wishlistRef.child(prodid).remove();
  			alert("Removed from wishlist");
    
			}
		else {
				prodRef.child(prodid+"/name").on("value",function(snapshot){
   				databaseURL.ref("users/"+user.uid+"/wishlist").set({
					[prodid]:snapshot.val()
					});
				});
				alert("Added to wishlist");
			}
		});

    
}
function abc(prodid,user,name,cost){
	var cartRef=databaseURL.ref("users/"+user.uid+"/cart/"+prodid);
	cartRef.set({
				"qty":1,
				"cost":cost,
				"name":name,
				"discount":0
	});
	alert(name + " has been added to cart.");
}

function fetchCart(user)
{	//alert("fetching");
	var prodid,qty,name="abc",cost,total=0.00,cartrow=0;
	document.getElementById("cart").innerHTML="";
	var cartRef=databaseURL.ref("users/"+user.uid+"/cart");
	cartRef.once("value").then(function(snapshot) {
    if(!snapshot.exists())
		{
			document.getElementById("cart").innerHTML="no item in cart";
			document.getElementById("final_total").innerHTML="";
		}
	});
	cartRef.on("child_added",function(snapshot){
		//alert(snapshot);
		prodid=snapshot.key;
		qty=snapshot.child("qty").val();
		name=snapshot.child("name").val();
		cost=snapshot.child("cost").val();
		total+=cost;
		var newRow = document.all("cart").insertRow(cartrow++);
    var oCell = newRow.insertCell();
    oCell.innerHTML = "<a href='#''>"+name+"</a>";
    
    oCell = newRow.insertCell();
    oCell.innerHTML = "<input type='number' value='"+qty+"' class='form-control'>";
    
    oCell = newRow.insertCell();
    oCell.innerHTML = "&#x20b9;"+cost; 
	
    oCell = newRow.insertCell();
    oCell.innerHTML = "0.00";

    oCell = newRow.insertCell();
    oCell.innerHTML = "&#x20b9;"+qty*cost;

    oCell = newRow.insertCell();
    oCell.innerHTML = "<a href='#'' id='"+prodid+"' onclick='removerow(this,id)'><i class='fa fa-trash-o'></i></a>";
	document.getElementById("final_total").innerHTML="&#x20b9;"+total;
	
	var shipping = 50;
	var tax = 0.1*total;
	
	document.getElementById("subtotal").innerHTML = "&#x20b9;" + total;
	document.getElementById("shipping").innerHTML = "&#x20b9;" + shipping;
	document.getElementById("tax").innerHTML = "&#x20b9;" + tax;
	document.getElementById("total").innerHTML = "&#x20b9;" + (total+shipping+tax);
	
	});
	
}

