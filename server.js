var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log('server is running...');
});