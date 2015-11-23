console.log("Inside content.js");

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
);