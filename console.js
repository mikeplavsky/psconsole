var srv = localStorage.server;
var last_cmd = localStorage.command;

var cmds_hs = History( max_history_length = 400 );
localStorage.history && cmds_hs.set( JSON.parse( localStorage.history ) );

$(window).bind( "unload blur", function () {
    localStorage.wnd_position = "resizable=yes,height=" + window.innerHeight + ",width="+ window.innerWidth + ",top="+window.screenTop + ",left="+window.screenLeft;  
    localStorage.history = JSON.stringify( cmds_hs );    
})

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
    
    var r = '> ' + cmd + "\n Running...";        
    $( "#psconsole-result" ).text(r);    
    
    $.getJSON( "http://" + srv + ":35/?callback=?", { cmd: cmd } )   
    
    .done( function(res) {
        
        var r = '> ' + cmd 
        
        if (res[0] !== '\n' ) {
            r += '\n';
        }
        
        r += res;        
        
        $( "#psconsole-result" ).text(r);
        localStorage.command = cmd;

        cmds_hs.add( cmd );
        
    })
    
    .fail( function(res) {
        $( "#psconsole-result" ).text(res);    
    });    
    
    $( "#psconsole-input-ctrl" ).val( "" );

}

$( "#psconsole-input-ctrl" ).bind( "keydown", function (e) {

    if (e.keyCode == 13) {
        run( $( "#psconsole-input-ctrl" ).val() );        
    }
    else if (e.keyCode == 38 ) {
       $( "#psconsole-input-ctrl" ).val( cmds_hs.up( "" ) );       
    }
    else if (e.keyCode == 40 ) {        
       $( "#psconsole-input-ctrl" ).val( cmds_hs.down( "" ) );
    }
    
});

if (srv) {  
    
    run( "connect to " + srv );
    
    if (last_cmd) {    
        $( "#psconsole-input-ctrl" ).val( last_cmd );
    }
}

$( "#psconsole-input-ctrl" ).focus();
