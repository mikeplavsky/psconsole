function inject(src) {
    
     var script = document.createElement('script');    
     script.src = src;
     
     document.body.appendChild( script ); 
     
}

inject( chrome.extension.getURL( '/agent.js' ) );
