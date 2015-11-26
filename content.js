
//alert("In content.js");
if (localStorage.accessToken) {
	alert(document.getElementById("status").value);

	//alert("in content.js");
	var graphUrl = "https://graph.facebook.com/me/taggable_friends?" + localStorage.accessToken + "&callback=displayUser";
	alert(graphUrl);
	var friendIds = new Array();

	var script = document.createElement("script");
	script.src = graphUrl;
	document.body.appendChild(script);

	function displayUser(info) {
		console.log(info);
		for (var i = 0; i < info.data.length; i++) {
			friendIds.push(info.data[i].id);
		}
		console.log(friendIds);
		console.log(document.getElementById("status").value);
	}
}