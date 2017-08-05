console.log('client.js sourced')

var sendIt = {}
var sentBack = {}
var lastFocus = ''
// var test = 'test'
var inputFieldsArray = [{ name: 'First operand', id: 'operandOne' }, { name: 'Second operand', id: 'operandTwo' },]
// var numberButtonsArray = [{name:'0', id:'button0'},{name:'1', id:'button1'},{name:'2', id:'button2'},{name:'3', id:'button3'},{name:'4', id:'button4'},{name:'5', id:'button5'},{name:'6', id:'button6'},{name:'7', id:'button7'},{name:'8', id:'button8'},{name:'9', id:'button9'}]
var operationButtonsArray = [{ name: '+', id: 'add' }, { name: '-', id: 'subtract' }, { name: '*', id: 'multiply' }, { name: '/', id: 'divide' },]

function setLastFocus(focus) {
    lastFocus = focus;
    console.log('lastFocus set to:', lastFocus);
};



function sendToServer(sendIt) {
    $.ajax({
        method: 'POST',
        url: '/doMath',
        data: sendIt,
        success: function (response) {
            console.log(sendIt, 'sent to server');
            // returnFocus();
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
};

function displayResult() {
    $('#resultGoesHere').text(sentBack.result);

}


$('document').ready(function () {
    console.log('jquery sourced');

    for (var i = 0; i < inputFieldsArray.length; i++) {
        $('#inputFieldsLocation').append('<input onfocus=setLastFocus(this.id) id=' + inputFieldsArray[i].id + ' placeholder="' + inputFieldsArray[i].name + '">');
    }

    for (var i = 0; i < 10; i++) {
        $('#numberButtonsLocation').append('<button class="numButton" id='+i+'>' + i + '</button>');

    }
    for (var i = 0; i < operationButtonsArray.length; i++) {
        $('#operationButtonsLocation').append('<button id=' + operationButtonsArray[i].id + '>' + operationButtonsArray[i].name + '</button>');

    }

    $('body').on('click', '#add', function () {
        sendIt.operandOne = $('#operandOne').val();
        sendIt.operandTwo = $('#operandTwo').val();
        sendIt.operation = "add";
        console.log('addition clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#subtract', function () {
        sendIt.operandOne = $('#operandOne').val();
        sendIt.operandTwo = $('#operandTwo').val();
        sendIt.operation = "subtract";
        console.log('subtraction clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#multiply', function () {
        sendIt.operandOne = $('#operandOne').val();
        sendIt.operandTwo = $('#operandTwo').val();
        sendIt.operation = "multiply";
        console.log('multiplication clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#divide', function () {
        sendIt.operandOne = $('#operandOne').val();
        sendIt.operandTwo = $('#operandTwo').val();
        sendIt.operation = "divide";
        console.log('division clicked, array value is:', sendIt);
        sendToServer(sendIt);
    });

    $('body').on('click', '#resetIt', function () {
        $('#operandOne').val('');
        $('#operandTwo').val('');
        $('#resultGoesHere').text('');

    });

    $('body').on('click', 'button', function() {
        $('#' + lastFocus).focus();

    });

    $('body').on('click', '.numButton', function() {
        console.log('numButton clicked');
        console.log($('#'+lastFocus))
        console.log(this.id);
        newValue= $('#'+lastFocus).val() + this.id;
        $('#'+lastFocus).val(newValue);
    });


})