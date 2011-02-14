var ps = {}
ps.server = ""

function psconsole_notify(res) {
    console.log( res );
}

ps.eval = function ( cmd ) {    
    
    var script = document.createElement('script');    
    script.src = "http://" + ps.server + ":35/?cmd=" + escape(cmd) + "&callback=psconsole_notify&_=" + Math.floor( Math.random() * 1000000000 ).toString();
     
    document.body.appendChild( script );
    return "Running...";
}