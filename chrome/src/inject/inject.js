var sweetAlertVersion = "0.2.0";

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

      var actualCode = '(' + function() {
        // To overwrite a global variable, prefix `window`:
        window.alert = function(message){
          swal(message);
        };
      } + ')();';
      var script = document.createElement('script');
      script.textContent = actualCode;
      (document.head||document.documentElement).appendChild(script);
      script.parentNode.removeChild(script);

      // Inject SweetAlert
      var script = document.createElement('script');
      script.src = "https://cdn.rawgit.com/t4t5/sweetalert/v"+sweetAlertVersion+"/lib/sweet-alert.min.js";
      (document.head||document.documentElement).appendChild(script);
      var style = document.createElement('link');
      style.rel = "stylesheet";
      style.href = "https://cdn.rawgit.com/t4t5/sweetalert/v"+sweetAlertVersion+"/lib/sweet-alert.css";
      (document.head||document.documentElement).appendChild(style);

  	}
	}, 10);
});