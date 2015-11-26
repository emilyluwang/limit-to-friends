// To give credit where credit is due: thank you to github user nobuf
// This extension builds off the structure of https://github.com/nobuf/facebook-connect-for-chrome-extension
// content.js
// Listen for the status being entered
document.getElementById("status_button").addEventListener("click", saveStatus);

// Save the entered status into local storage
function saveStatus() {
	localStorage.newStatus = document.getElementById("status").value;
	localStorage.shouldUpdate = true;
}

// If the status is new and the access token is valid, request info from the FB graph api
if (localStorage.accessToken && localStorage.shouldUpdate) {

	// Prepare FB graph api request.
	// NOTE: Because of the updated graph api settings, the only friend ids accessible will be limited
	// Only friends using the app will have their ids appear in this list.
	var graphUrl = "https://graph.facebook.com/me/friends?" + localStorage.accessToken + "&callback=displayUser";
	var friendIds = new Array();
	localStorage.friendString = ""

	// Execute FB graph api request to get friend ids.
	var script = document.createElement("script");
	script.src = graphUrl;
	document.body.appendChild(script);

	// Callback function once data has been returned.
	function displayUser(info) {

		// Format friend ids into comma separated string
		for (var i = 0; i < info.data.length; i++) {
			localStorage.friendString = localStorage.friendString.concat(",");
			localStorage.friendString = localStorage.friendString.concat(info.data[i].id);
		}
		localStorage.friendString = localStorage.friendString.substring(1);
		localStorage.friendString = localStorage.friendString.substring(0, localStorage.friendString.length - 1);
		
		// Prepare FB graph api POST request to post FB status with sharing permissions.
		// If the friend id list is empty, the status will be private.
		// Else, the status will be visible to only friends using the extension. 
		var form = document.createElement("form");
    	form.setAttribute("method", "post");
    	form.setAttribute("action", "https://graph.facebook.com/me/feed?" + localStorage.accessToken);

    	var statusField = document.createElement("input");
    	statusField.setAttribute("name", "message");
    	statusField.setAttribute("value", localStorage.newStatus);
    	form.appendChild(statusField);

    	var sharingField = document.createElement("input");
    	sharingField.setAttribute("name", "privacy");
    	if (localStorage.friendString.length == 0) {
    		privacyObject = '{"value": "SELF"}';
    	} else {
    		var privacyObject = '{"value": "CUSTOM", "allow":"';
    		privacyObject = privacyObject.concat(localStorage.friendString);
    		privacyObject = privacyObject.concat('"}');
    	}

    	sharingField.setAttribute("value", privacyObject);
    	form.appendChild(sharingField);

    	localStorage.shouldUpdate = false;
    	form.submit();
		}
}