//console.log("Inside content.js");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
    	if (request.message === "clicked_browser_action") {
    		console.log("Inside the if block");
    		alert("Setting to null");
    		localStorage.accessToken = null;
    		alert(localStorage.accessToken);

			//for (var i = 0; i < $("a[href^='http']").length; i++) {
			//	console.log($("a[href^='http']").eq(i).attr("href"));
			//}
    	}
  	}
);
//alert("In content.js");
if (localStorage.accessToken) {
	//alert("in content.js");
	var graphUrl = "https://graph.facebook.com/me/friendlists?" + localStorage.accessToken + "&callback=displayUser";
	alert(graphUrl);
 
	var script = document.createElement("script");
	script.src = graphUrl;
	document.body.appendChild(script);
 
	function displayUser(user) {
		alert("Hello from the outside");
		console.log(user.name);
		console.log(user.id);
	}
}