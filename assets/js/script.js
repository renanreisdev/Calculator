const buttons = document.querySelectorAll('.calculator > button');
const buttonMemoryRec = document.querySelector('.memory-rec');
const previousOperationText = document.querySelector('.previous-operation');
const currentOperationText = document.querySelector('.current-operation');
const mathOperations = ['+', '-', 'X', '/'];

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
        this.memory = 0;
        this.memoryTrigger = 0;
    }

    addDigit(digit) {
        this.memoryTrigger = 0;
        this.validateScreenDigits(this.currentOperationText, digit);
    }

    validateScreenDigits(operationState, digit) {
        if (this.currentOperationText.value === '') {
            this.currentOperation = '';
        }

        if (operationState.value === '') {
            if (+digit !== 0) {
                if (digit === '.') {
                    this.currentOperation = `0${digit}`;
                } else {
                    this.currentOperation += digit;
                }
            } else {
                return;
            }
        } else {
            if (operationState.value.includes('.') && digit === '.') {
                return;
            }
            
            this.currentOperation += digit;
        }
        this.updateScreen();
    }

    processFunctions(operation) {
        if (this.currentOperationText.value === '' && this.previousOperationText.value === '' && this.memory === 0) {
            return;
        }

        switch(operation) {
            case 'DEL':
                this.processDelOperator();
            break;

            case 'C':
                this.processCleanOperator();
            break;

            case 'M+':
                this.processMAddOperator();
            break;

            case 'M-':
                this.processMSubOperator();
            break;

            case 'MRC':
                this.processMRecOperator();
            break;

            case '=':
                this.processEqual();
                break;

            case '%':
                this.processPercent();
                break;

            default:
                return;
        }
    }

    processDelOperator() {
        this.memoryTrigger = 0;
        this.currentOperationText.value = this.currentOperationText.value.slice(0, -1);
    }

    processCleanOperator() {
        this.memoryTrigger = 0;
        this.currentOperation = '';
        this.updateScreen();
        this.currentOperationText.value = '';
        this.previousOperationText.value = '';
        this.currentOperationText.placeholder = '0';
    }

    processMAddOperator() {
        if (+this.currentOperationText.value === 0) {
            return;
        }

        this.memory += +this.currentOperationText.value;
        this.memoryTrigger = 0;
        buttonMemoryRec.classList.remove('disabled');
    }

    processMSubOperator() {
        if (+this.currentOperationText.value === 0) {
            return;
        }

        this.memory -= +this.currentOperationText.value;
        this.memoryTrigger = 0;
        buttonMemoryRec.classList.remove('disabled');
    }

    processMRecOperator() {
        if (this.memory !== 0 && this.memoryTrigger === 0) {
            this.currentOperationText.value = this.memory;
            this.currentOperation = this.memory;
            this.memoryTrigger++;
        } else {
            this.memory = 0;
            this.memoryTrigger = 0;
            buttonMemoryRec.classList.add('disabled');
        }
    }

    processEqual() {
        const operation = this.previousOperationText.value.split(' ')[1];

        this.processOperation(operation);
    }

    processPercent() {
        const previous = this.previousOperationText.value.split(' ')[0];
        const operation = this.previousOperationText.value.split(' ')[1];

        if (operation === 'X' || operation === '/') {
            this.currentOperation = this.currentOperation / 100;
        } else if (operation === '+' || operation === '-') {
            this.currentOperation = previous * (this.currentOperation / 100);
        }

        this.currentOperationText.value = this.currentOperation;
    }

    processOperation(operation) {
        if (this.currentOperationText.value === "") {
            if (this.previousOperationText.value !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        let oldOperation = null;
        if (mathOperations.includes(this.previousOperationText.value.split(' ')[1])) {
            oldOperation = this.previousOperationText.value.split(' ')[1];
        }

        let operationValue;
        const previous = +this.previousOperationText.value.split(' ')[0];
        const current = +this.currentOperationText.value;

        this.memoryTrigger = 0;

        switch(oldOperation === null ? operation : oldOperation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operation, operationValue, current, previous);
            break;

            case '-':
                operationValue = previous - current;
                this.updateScreen(operation, operationValue, current, previous);
            break;

            case 'X':
                operationValue = previous * current;
                this.updateScreen(operation, operationValue, current, previous);
            break;

            case '/':
                operationValue = previous / current;
                this.updateScreen(operation, operationValue, current, previous);
            break;

            default:
                return;
        }
    }

    changeOperation(operation) {
        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.value = this.previousOperationText.value.slice(0, -1) + operation;
    }

    updateScreen(
        operation = null,
        operationValue = null,
        current = null,
        previous = null
    ) {

        if (this.currentOperation.length > 0 && operationValue === null) {
            if (this.currentOperationText === '') {
                this.currentOperationText.value = current;
            } else {
                this.currentOperationText.value = this.currentOperation;
            }
        } else {
            if (previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.value = `${operationValue} ${operation}`;
            this.currentOperationText.value = '';
            this.currentOperationText.placeholder = this.currentOperation;
        }
    }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        const validateOperations = ['+', '-', 'X', '/'];
        const validateFunctions = ['DEL', 'C', 'MRC', 'M-', 'M+', '=', '%'];

        if (+value >= 0 || value.includes('.')) {
            calculator.addDigit(value);
        } else if (validateOperations.includes(value)) {
            calculator.processOperation(value);
        } else if (validateFunctions.includes(value)) {
            calculator.processFunctions(value);
        }
    });
});