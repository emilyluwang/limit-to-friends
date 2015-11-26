// To give credit where credit is due: thank you to github user nobuf
// This extension builds off the structure of https://github.com/nobuf/facebook-connect-for-chrome-extension
// background.js
var successURL = 'https://www.facebook.com/connect/login_success.html';
var redirectURL = 'https://www.facebook.com/connect/blank.html#_=_'

// Get the access token when the extension is in use.
function onFacebookLogin() {
	chrome.tabs.getAllInWindow(null, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url.indexOf(successURL) == 0) {
				var params = tabs[i].url.split('#')[1];
				access = params.split('&')[0]
				localStorage.accessToken = access;
				chrome.tabs.onUpdated.removeListener(onFacebookLogin);
				alert("Now close this tab and click the cat again to confirm your post!");
				return;
			}
		}
	});
}

// Close the tab after redirection.
function onReloaded() {
	if (request.farewell == "close_tab") {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].url.indexOf(redirectURL) == 0) {
	 				chrome.tabs[i].remove(tabs[i].id, function() {});
					chrome.tabs.onUpdated.removeListener(onReloaded);
					return;
				}
			}
		});
	}
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);
chrome.runtime.onMessage.addListener(onReloaded);