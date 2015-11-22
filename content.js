chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
    	if(request.message === "clicked_browser_action") {
			for (var i = 0; i < $("a[href^='http']").length; i++) {
				console.log($("a[href^='http']").eq(i).attr("href"));
			}
			console.log($("a"))
    	}
  	}
);