// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

var successURL = 'https://www.facebook.com/connect/login_success.html';
var redirectURL = 'https://www.facebook.com/connect/blank.html#_=_'
//alert(successURL);

function onFacebookLogin() {
	chrome.tabs.getAllInWindow(null, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url.indexOf(successURL) == 0) {
				//alert(tabs[i].url);
				var params = tabs[i].url.split('#')[1];
				access = params.split('&')[0]
				alert(access);
				localStorage.accessToken = access;
				chrome.tabs.remove(i, function() { });
				//alert(localStorage.accessToken);
				//chrome.tabs.onUpdated.removeListener(onFacebookLogin);
				return;
			}
		}
	});
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);

