var srv = localStorage.server;
var last_cmd = localStorage.command;

function run(cmd) {

    var m = cmd.match( "^connect to (.*)$" )
    
    if (m) {
    
        localStorage.server = srv = m[1];
        
        $( "#psconsole-header" ).text( "Connected to " + srv );
        $( "#psconsole-input-ctrl" ).val( "" );
        $( "#psconsole-result" ).text( "" );

        return;
        
    }
    else if (!srv) {
        $( "#psconsole-result" ).text( "Please run this command first: connect to <your server>" );
        return;
    }
    
    $.getJSON( "http://" + srv + ":35/?callback=?", { cmd: cmd } )   
    
    
    .done( function(res) {
        
        var r = '> ' + cmd + "\n" + res;        
        $( "#psconsole-result" ).text(r);

        localStorage.command = cmd;    
        
    })
    
    .fail( function(res) {
        $( "#psconsole-result" ).text(res);    
    });    
    
    $( "#psconsole-input-ctrl" ).val( "" );

}

$( "#psconsole-input-ctrl" ).bind( "keydown", function (e) {

    if (e.keyCode !== 13) {
        return;
    } 
    
    run( $( "#psconsole-input-ctrl" ).val() );
    
});

if (srv) {  
    
    run( "connect to " + srv );
    
    if (last_cmd) {    
        run (last_cmd );
    }
}

