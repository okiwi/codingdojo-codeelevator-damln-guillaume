/*
 * GET home page.
 */
l = console.log;


var _ = require('underscore');

var floorsToStop = [];
var currrentFloor = 0;


exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};

var commands = [];

var goTo = function (floor) {
    var delta = floor - currrentFloor;
    l(delta)
    if (delta > 0) {
        l('on monte');
        for (var i = 0; i < delta; i++) {
            commands.push('UP');
        }
    }

    if (delta < 0) {
        for (var i = 0; i < -delta; i++) {
            commands.push('DOWN');
        }
    }
    commands.push('OPEN');
    commands.push('CLOSE');
}

exports.nextCommand = function (req, res) {
    var command = 'NOTHING';
    if (floorsToStop.length && !commands.length) {
        var floor = floorsToStop.shift();
        l('go to step:' + floor);
        goTo(floor);
    }

    if (commands.length) {
        command = commands.shift();
    }

    if (command === 'UP') {
        currrentFloor++;
    }
    if (command === 'DOWN') {
        currrentFloor--;
    }
    l(command)
    res.send(command);
};


exports.getCall = function (req, res) {
    floorsToStop.push(parseInt(req.query.atFloor, 10));
    floorsToStop= _.uniq(floorsToStop);
    console.log(floorsToStop);
    res.send('');
};

exports.getReset = function (req, res) {
    currrentFloor = 0;
    res.send(204, '');
};

exports.userHasEntered = function (req, res) {
    res.send('');
};

exports.userHasExited = function (req, res) {
    res.send('');
};

exports.IWantToGo = function (req, res) {
    res.send('');
};


//[1, 2, 1, 1, 1, 2]
