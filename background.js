var ps_wnd;

chrome.extension.onRequest.addListener(function() {
    
    if (ps_wnd) {    
        ps_wnd.close();
        delete ps_wnd;        
    }
    
    page = chrome.extension.getBackgroundPage();            
    ps_wnd = page.open( "console.html", "PowerShell Console", "resizable,width=400,height=200,scrollbars=no,alwaysRaised=yes" );
    
});