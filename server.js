'use strict';

var express = require('express'),
    app = express(),
    router = express.Router();

app.use('/api', router);

router.get('/parsetime/', function(req, res){
	var epoch = req.query.time;
	var timeZone = req.query.tz;

    var dateObject = new Date(epoch * 1000);
    dateObject.setMinutes(dateObject.getMinutes() + offsetLookup(timeZone));
    var date = [dateObject.getFullYear(), ("0" + (dateObject.getMonth()+1)).slice(-2), ("0" + dateObject.getDate()).slice(-2)];
    var time = [("0" + dateObject.getUTCHours()).slice(-2), ("0" + dateObject.getUTCMinutes()).slice(-2), 
                ("0" + dateObject.getUTCSeconds()).slice(-2)]
    var finalResult = {};
    finalResult["time"] = date.join('-').concat(" " + time.join(':'));
    res.setHeader('Content-Type', 'application/json');
	res.send(finalResult);
});

function offsetLookup(timeZone){
    var offsets = {};
    offsets['UM12'] = -720;
    offsets['UM11'] = -660;
    offsets['UM10'] = -600;
    offsets['UM9'] = -540;
    offsets['UM8'] = -480;
    offsets['UM7'] = -420;
    offsets['UM6'] = -360;
    offsets['UM5'] = -300;
    offsets['UM4'] = -240;
    offsets['UM25'] = -210;
    offsets['UM3'] = -180;
    offsets['UM2'] = -120;
    offsets['UM1'] = -60;

    offsets['UTC'] = 0;

    offsets['UP1'] = 60;
    offsets['UP2'] = 120;
    offsets['UP3'] = 180;
    offsets['UP25'] = 210;
    offsets['UP4'] = 240;
    offsets['UP35'] = 270;
    offsets['UP5'] = 300;
    offsets['UP45'] = 330;
    offsets['UP6'] = 360;
    offsets['UP7'] = 420;
    offsets['UP8'] = 480;
    offsets['UP9'] = 540;
    offsets['UP85'] = 570;
    offsets['UP10'] = 600;
    offsets['UP11'] = 660;
    offsets['UP12'] = 720;

    return offsets[timeZone];
}

var port = process.argv.slice(2)[0] || 8080;
var server = app.listen(port, '0.0.0.0', function() {
  console.log('Process ' + process.pid + ' is listening to all incoming requests');
});