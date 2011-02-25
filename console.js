var srv = null;
var last_cmd = null;

$( "#psconsole-input-ctrl" ).bind( "keydown", function (e) {

    if (e.keyCode !== 13) {
        return;
    } 
    
    last_cmd = $( "#psconsole-input-ctrl" ).val();
    var m = last_cmd.match( "^connect to (.*)$" )
    
    if (m) {
    
        srv = m[1];
        
        $( "#psconsole-header" ).text( "Connected to " + srv );
        $( "#psconsole-input-ctrl" ).val( "" );
        $( "#psconsole-result" ).text( "" );

        return;
        
    }
    else if (!srv) {
        $( "#psconsole-result" ).text( "Please run this command first: connect to <your server>" );
    }
    
    
    $.getJSON( "http://" + srv + ":35/?callback=?", { cmd: last_cmd } )   
    
    
    .done( function(res) {
        
        var r = '> ' + last_cmd + "\n" + res;        
        $( "#psconsole-result" ).text(r);        
        
    })
    
    .fail( function(res) {
        $( "#psconsole-result" ).text(res);    
    });    
    
    $( "#psconsole-input-ctrl" ).val( "" );

});
