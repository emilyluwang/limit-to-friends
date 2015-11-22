// content.js
var href0 = $("a[href^='http']").eq(0).attr("href");
var href1 = $("a[href^='http']").eq(1).attr("href");
var allHref = $("a[href^='http']").attr("href");

console.log('0');
console.log(href0);
console.log('1');
console.log(href1);
console.log('all');
console.log(allHref);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "clicked_browser_action") {
		for (var i = 0; i < $("a[href^='http']").length; i++) {
			console.log($("a[href^='http']").eq(i).attr("href"));
		}
    }
  }
);