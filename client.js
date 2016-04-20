var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

// var client = new net.Socket();
// client.connect(PORT, HOST, function() {

//     console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//     // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
//     // for(i = 0; i < 10; i++){
//        client.write("Hello its client");
//     // }

// });

// // Add a 'data' event handler for the client socket
// // data is what the server sent to this socket
// client.on('data', function(data) {
    
//     console.log('DATA: ' + data);
//     // Close the client socket completely
//     client.destroy();
    
// });

// // Add a 'close' event handler for the client socket
// client.on('close', function() {
//     console.log('Connection closed');
// });
 net.createServer(function(sock) {
    // sock.setKeepAlive(true, 50);
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // for(i=0; i < 100; i++)
    //     {
    //       sock.write(i.toString()+"\n");  
    //     }
    sock.on('data', function(data) {
        // for(i=0; i < 100; i++)
        // {
        //     if( i == 99 )
        //     {
        //         sock.write("1000"+"\n");

        //     }
        //   sock.write(i.toString()+"\n");
        // }

        console.log('DATA ' + data);
        // number_array.push(data);
        
        
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
  }).listen(PORT, HOST);
