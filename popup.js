console.log("Is this even running?");

if (localStorage.accessToken) {
	alert("in popup.js");
	var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
	console.log(graphUrl);
 
	var script = document.createElement("script");
	script.src = graphUrl;
	document.body.appendChild(script);
 
	function displayUser(user) {
		console.log(user);
	}
}
/**
console.log("Inside popup.js");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
    	if (request.message === "clicked_browser_action") {
    		console.log("Inside the if block");
    		FB.getLoginStatus(function(response) {
    			if (response.status === 'connected') {
    				console.log("Connected!");
    			} else {
    				console.log("Not connected.");
    			}
    		});

			for (var i = 0; i < $("a[href^='http']").length; i++) {
				console.log($("a[href^='http']").eq(i).attr("href"));
			}
    	}
  	}
);**/