var ps = {}
ps.server = ""

ps.eval = function ( cmd ) {    
    
    $.getJSON( "http://" + ps.server + ":35/?cmd=" + cmd + "&callback=?" )
    .success( function (res) {
        console.log( res );
    });
    
    return "Running...";
}