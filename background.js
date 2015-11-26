// background.js
var successURL = 'https://www.facebook.com/connect/login_success.html';

// Get the access token
function onFacebookLogin() {
	chrome.tabs.getAllInWindow(null, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url.indexOf(successURL) == 0) {
				var params = tabs[i].url.split('#')[1];
				access = params.split('&')[0]
				localStorage.accessToken = access;
				chrome.tabs.remove(i, function() { });
				return;
			}
		}
	});
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);


