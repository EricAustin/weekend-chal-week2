console.log('client.js sourced')

var sendIt = {}
var sentBack = {}

$('document').ready(function () {
    console.log('jquery sourced');

    $('body').on('click', '#add', function () {
        sendIt.numberOne = $('#numberOne').val();
        sendIt.numberTwo = $('#numberTwo').val();
        sendIt.operation = "add";
        console.log('addition clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#subtract', function () {
        sendIt.numberOne = $('#numberOne').val();
        sendIt.numberTwo = $('#numberTwo').val();
        sendIt.operation = "subtract";
        console.log('subtraction clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#multiply', function () {
        sendIt.numberOne = $('#numberOne').val();
        sendIt.numberTwo = $('#numberTwo').val();
        sendIt.operation = "multiply";
        console.log('multiplication clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#divide', function () {
        sendIt.numberOne = $('#numberOne').val();
        sendIt.numberTwo = $('#numberTwo').val();
        sendIt.operation = "divide";
        console.log('division clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    function sendToServer(sendIt) {
        $.ajax({
            method: 'POST',
            url: '/doMath',
            data: sendIt,
            success: function (response) {
                console.log(sendIt, 'sent to server');
                getResult();
            }
        })
    };

    function getResult() {
        $.ajax({
            method: 'GET',
            url: '/doMath',
            success: function (response) {
                console.log('response from server is:', response);
                sentBack = response;
                displayResult();
            }
        })
    }

    function displayResult() {
       $('#resultGoesHere').text(sentBack.result);
        
    }


})