var express = require('express');
var app = express();
var bodyParser = require('body-parser');

port = 5000;

result = {}
mathers = {}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/doMath', function (req, res) {
    console.log('doMath post');
    console.log('req.body is:', req.body);
    mathers = req.body
    console.log('mathers is:', mathers);

    if (mathers.operation == "add") {
        result.result = +mathers.operandOne + +mathers.operandTwo;
        console.log('addition result:', result.result);
        res.sendStatus(201);
    } else if (mathers.operation == "subtract") {
        result.result = +mathers.operandOne - +mathers.operandTwo;
        console.log('subtraction result:', result.result);
        res.sendStatus(201);
    } else if (mathers.operation == "multiply") {
        result.result = +mathers.operandOne * +mathers.operandTwo;
        console.log('multiplication result:', result.result);
        res.sendStatus(201);
    } else if (mathers.operation == "divide") {
        result.result = +mathers.operandOne / +mathers.operandTwo;
        console.log('division result:', result.result);
        res.sendStatus(201);
    }
})

app.get('/doMath', function (req,res){
    console.log('doMath get');
    res.send(result);
})

app.listen(port, function () {
    console.log('listening on port', port);
})