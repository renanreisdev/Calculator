const fieldHistoric = document.querySelector('.historic');
const fieldResult = document.querySelector('.results');
let memory = 0;
let activeMemory = 0;
let equal = 0;

const buttons = document.querySelectorAll('.button');
const buttonsNumbers = document.querySelectorAll('.button-numbers');
const buttonsOthers = document.querySelectorAll('.button-others');
const buttonsSignal = document.querySelectorAll('.button-signal');
const buttonsOperations = document.querySelectorAll('.button-operations');

const sum = () => eval(fieldResult.value);

const acceptsKeys = {
    Numpad0() {
        buttonActions(document.querySelector('.button-number0'));
    },
    Numpad1() {
        buttonActions(document.querySelector('.button-number1'));
    },
    Numpad2() {
        buttonActions(document.querySelector('.button-number2'));
    },
    Numpad3() {
        buttonActions(document.querySelector('.button-number3'));
    },
    Numpad4() {
        buttonActions(document.querySelector('.button-number4'));
    },
    Numpad5() {
        buttonActions(document.querySelector('.button-number5'));
    },
    Numpad6() {
        buttonActions(document.querySelector('.button-number6'));
    },
    Numpad7() {
        buttonActions(document.querySelector('.button-number7'));
    },
    Numpad8() {
        buttonActions(document.querySelector('.button-number8'));
    },
    Numpad9() {
        buttonActions(document.querySelector('.button-number9'));
    },
    NumpadMultiply() {
        buttonActions(document.querySelector('.button-multiply'));
    },
    NumpadSubtract() {
        buttonActions(document.querySelector('.button-subtract'));
    },
    NumpadAdd() {
        buttonActions(document.querySelector('.button-add'));
    },
    NumpadEnter() {
        buttonActions(document.querySelector('.button-equal'));
    },
    NumpadDecimal() {
        buttonActions(document.querySelector('.button-decimal'));
    },
    Backspace() {
        buttonActions(document.querySelector('.button-backspace'));
    }
}

const buttonActions = (target) => {
    const buttonClass = target.className;
    const checkOperation = fieldResult.value.substring(fieldResult.value.length - 1, fieldResult.value.length) !== ' ' ? true : false;
    let value;

    if (buttonClass.indexOf('button-numbers') > 0) {
        if (fieldResult.value === '0' || equal === 1) {
            if (buttonClass.indexOf('button-numberDouble0') === -1) {
                fieldResult.value = target.innerHTML;
            }
            equal = 0;
        } else {
            fieldResult.value += target.innerHTML;
        }
    } else if (buttonClass.indexOf('button-decimal') > 0) {
        if (fieldResult.value.indexOf('.') === -1) {
            fieldResult.value += target.innerHTML;
        }
    } else if (buttonClass.indexOf('button-operations') > 0) {
        if (buttonClass.indexOf('button-equal') > 0) {
            if (isNaN(fieldResult.value) && checkOperation) {
                equal = 1;
                console.log(fieldResult.value.substring(fieldResult.value.length - 1, fieldResult.value.length));
                fieldResult.value = sum();
            }
        } else if (!isNaN(fieldResult.value)) {
            if (buttonClass.indexOf('button-multiply') > 0) {
                fieldResult.value += ' * ';
            } else {
                fieldResult.value += ` ${target.innerHTML} `;
            }
        } else {
            if (checkOperation) {
                if (buttonClass.indexOf('button-multiply') > 0) {
                    fieldResult.value = `${sum()} * `;
                } else {
                    fieldResult.value = `${sum()} ${target.innerHTML} `;
                }
            } else if (buttonClass.indexOf('button-multiply') > 0) {
                fieldResult.value = fieldResult.value.replace(/[/\*\-\+]/g, '*');
            } else {
                fieldResult.value = fieldResult.value.replace(/[/\*\-\+]/g, target.innerHTML);
            }
        }
        equal = 0;
    } else if (buttonClass.indexOf('button-percent') > 0) {    
        if (checkOperation) {
            let percent;

            if (fieldResult.value.indexOf('-') > 0) {
                value = fieldResult.value.substring(0, fieldResult.value.indexOf('-') - 1);
                percent = fieldResult.value.substring(fieldResult.value.indexOf('-') + 1, fieldResult.value.length);
                fieldResult.value = Number(value) - (percent * (value / 100));
            } else if (fieldResult.value.indexOf('+') > 0) {
                value = fieldResult.value.substring(0, fieldResult.value.indexOf('+') - 1);
                percent = fieldResult.value.substring(fieldResult.value.indexOf('+') + 1, fieldResult.value.length);
                fieldResult.value = Number(value) + (percent * (value / 100));
            } else if (fieldResult.value.indexOf('*') > 0) {
                value = fieldResult.value.substring(0, fieldResult.value.indexOf('*') - 1);
                percent = fieldResult.value.substring(fieldResult.value.indexOf('*') + 1, fieldResult.value.length);
                fieldResult.value = Number(value) * (percent / 100);
            } else if (fieldResult.value.indexOf('/') > 0) {
                value = fieldResult.value.substring(0, fieldResult.value.indexOf('/') - 1);
                percent = fieldResult.value.substring(fieldResult.value.indexOf('/') + 1, fieldResult.value.length);
                fieldResult.value = Number(value) / (percent / 100);
            }
            equal = 1;
        }
    } else if (buttonClass.indexOf('button-clean') > 0) {
        fieldResult.value = '0';
    } else if (buttonClass.indexOf('button-backspace') > 0) {
        fieldResult.value = fieldResult.value.substring(0, fieldResult.value.length - 1);
        
        fieldResult.value.length === 0 ? fieldResult.value = '0' : fieldResult.value;
    } else if (buttonClass.indexOf('button-memory-add') > 0) {
        if (fieldResult.value.indexOf('+') > 0) {
            console.log('soma')
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('+') - 1);
        } else if (fieldResult.value.indexOf('-') > 0) {
            console.log('menos')
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('-') - 1);
        } else if (fieldResult.value.indexOf('*') > 0) {
            console.log('vezes')
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('*') - 1);
        } else if (fieldResult.value.indexOf('/') > 0) {
            console.log('divisão')
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('/') - 1);
        } else {
            value = fieldResult.value;
        }
        equal = 1;
        memory += Number(value);
        activeMemory = 1;
        document.querySelector('.display-memory').style.color = '#000000';
    } else if (buttonClass.indexOf('button-memory-subtract') > 0) {
        if (fieldResult.value.indexOf('+') > 0) {
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('+') - 1);
        } else if (fieldResult.value.indexOf('-') > 0) {
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('-') - 1);
        } else if (fieldResult.value.indexOf('*') > 0) {
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('*') - 1);
        } else if (fieldResult.value.indexOf('/') > 0) {
            value = fieldResult.value.substring(0, fieldResult.value.indexOf('/') - 1);
        } else {
            value = fieldResult.value;
        }
        equal = 1;
        memory -= Number(value);
        activeMemory = 1;
        document.querySelector('.display-memory').style.color = '#000000';
    }
    
    if (buttonClass.indexOf('button-memory') > 0 && target.innerHTML === 'MRC') {
        if (activeMemory === 2) {
            memory = 0;
            activeMemory = 0;
            document.querySelector('.display-memory').style.color = '#EEEEEE';
        } else if (activeMemory === 1) {
            fieldResult.value += memory;
            activeMemory = 2;
        }
    } else if (memory !== 0) {
        activeMemory = 1;
    }

    console.log('activeMemory = ' + activeMemory)

    fieldResult.style.color = fieldResult.value === '0' ? '#999999' : '#000000'
}

document.querySelector('body').addEventListener('keyup', (e) => {
    if (acceptsKeys[e.code]) {
        acceptsKeys[e.code]();
    }
});

for (const button of buttons) {
    button.addEventListener('click', (e) => { buttonActions(e.target) });
}