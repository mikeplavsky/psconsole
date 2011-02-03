function inject(src) {
    
     var script = document.createElement('script');    
     script.src = src;
     
     document.body.appendChild( script ); 
     
}

inject( chrome.extension.getURL( '/lib/jquery-1.5.js' ) );
inject( chrome.extension.getURL( '/agent.js' ) );
