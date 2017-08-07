// console.log('client.js sourced')

var sendIt = {}
var sentBack = {}
var lastFocus = ''
// var test = 'test'
var inputFieldsArray = [{ name: 'First operand', id: 'operandOne' }, { name: 'Second operand', id: 'operandTwo' },]
// var numberButtonsArray = [{name:'0', id:'button0'},{name:'1', id:'button1'},{name:'2', id:'button2'},{name:'3', id:'button3'},{name:'4', id:'button4'},{name:'5', id:'button5'},{name:'6', id:'button6'},{name:'7', id:'button7'},{name:'8', id:'button8'},{name:'9', id:'button9'}]
var operationButtonsArray = [{ name: '+', id: 'add' }, { name: '-', id: 'subtract' }, { name: '*', id: 'multiply' }, { name: '/', id: 'divide' },]

function setLastFocus(focus) {
    lastFocus = focus;
    // console.log('lastFocus set to:', lastFocus);
};



function sendToServer(sendIt) {
    console.log('sendToServerHit')
    $.ajax({
        method: 'POST',
        url: '/doMath',
        data: sendIt,
        success: function (response) {
            // console.log(sendIt, 'sent to server');
            $('#' + lastFocus).focus();
            getResult();
        }
    })
};

function getResult() {
    $.ajax({
        method: 'GET',
        url: '/doMath',
        success: function (response) {
            // console.log('response from server is:', response);
            sentBack = response;
            displayResult();
        }
    })
};

function displayResult() {
    // console.log('displayResult hit');
    $('#resultGoesHere').val(sentBack.result);

}


$('document').ready(function () {
    // console.log('jquery sourced');

    for (var i = 0; i < inputFieldsArray.length; i++) {
        $('#inputFieldsLocation').append('<input type="number" onfocus=setLastFocus(this.id) id=' + inputFieldsArray[i].id + ' placeholder="' + inputFieldsArray[i].name + '">');
    }

    $('#operandOne').focus();

    for (var i = 1; i <= 3; i++) {
        $('#numberButtonsLocation1').append('<button class="numButton" id=' + i + '>' + i + '</button>');
    };
    for (var i = 4; i <= 6; i++) {
        $('#numberButtonsLocation2').append('<button class="numButton" id=' + i + '>' + i + '</button>');
    };

    for (var i = 7; i <= 9; i++) {
        $('#numberButtonsLocation3').append('<button class="numButton" id=' + i + '>' + i + '</button>');
    };

    for (var i = 0; i <= 0; i++) {
        $('#numberButtonsLocation4').append('<button class="numButton" id=' + i + '>' + i + '</button>');
    };



    for (var i = 0; i < operationButtonsArray.length; i++) {
        $('#operationButtonsLocation').append('<button class="operationButton" id=' + operationButtonsArray[i].id + '>' + operationButtonsArray[i].name + '</button>');

    }

    $('.operationButton').on('click', function () {
        sendIt.operandOne = $('#operandOne').val();
        sendIt.operandTwo = $('#operandTwo').val();
        console.log('operation click');
        sendIt.operation = this.id;
        console.log(this.id);
        
        console.log(sendIt);
        
        sendToServer(sendIt);
    });

    $('#resetIt').on('click', function () {
        $('#operandOne').val('');
        $('#operandTwo').val('');
        $('#resultGoesHere').text('');

    });

    $('body').on('click', 'button', function () {
        $('#' + lastFocus).focus();

    });

    $('body').on('click', '.numButton', function () {
        // console.log('numButton clicked');
        // console.log($('#'+lastFocus))
        // console.log(this.id);
        newValue = $('#' + lastFocus).val() + this.id;
        $('#' + lastFocus).val(newValue);
    });


})