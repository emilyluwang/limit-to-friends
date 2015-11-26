document.getElementById("status_button").addEventListener("click", saveStatus);

function saveStatus() {
	localStorage.newStatus = document.getElementById("status").value;
}
//alert("In content.js");
if (localStorage.accessToken && localStorage.newStatus) {
	alert(localStorage.newStatus);

	//alert("in content.js");
	var graphUrl = "https://graph.facebook.com/me/taggable_friends?" + localStorage.accessToken + "&callback=displayUser";
	alert(graphUrl);
	var friendIds = new Array();
	localStorage.friendString = ""

	var script = document.createElement("script");
	script.src = graphUrl;
	document.body.appendChild(script);

	function displayUser(info) {
		console.log(info);
		for (var i = 0; i < info.data.length; i++) {
			localStorage.friendString = localStorage.friendString.concat(",");
			localStorage.friendString = localStorage.friendString.concat(info.data[i].id);
		}
		localStorage.friendString = localStorage.friendString.substring(1);
		localStorage.friendString = localStorage.friendString.substring(0, localStorage.friendString.length - 1);
		
		console.log(localStorage.friendString);

		var form = document.createElement("form");
    	form.setAttribute("method", "post");
    	form.setAttribute("action", "https://graph.facebook.com/me/feed?" + localStorage.accessToken);

    	var hiddenField1 = document.createElement("input");
    	hiddenField1.setAttribute("name", "message");
    	hiddenField1.setAttribute("value", localStorage.newStatus);

    	form.appendChild(hiddenField1);

    	document.body.appendChild(form);
    	form.submit();

    	localStorage.newStatus = null;
		
		}
}