function inject(src) {
    
     var script = document.createElement('script');    
     script.src = src;
     
     document.body.appendChild( script ); 
     
}

inject( chrome.extension.getURL( '/agent.js' ) );


document.addEventListener( "keyup", function (e) {	
	
    if (e.altKey && e.shiftKey && e.keyCode === 80) {        
        chrome.extension.sendRequest( {name: "psconsole-open" }, function () {});	        
	}
    
},false);


