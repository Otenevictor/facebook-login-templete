class Calculator {
    constructor(oldscreenTextElement, downScreenTextElement) {
        this.oldscreenTextElement = oldscreenTextElement
        this.downScreenTextElement = downScreenTextElement
        this.clear() 
       }

    clear() {
        this.downScreen = ''
        this.oldscreen = ''
        this.sign = undefined
    }

    delete() {
        this.downScreen = this.downScreen.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.downScreen.includes('.')) return
        this.downScreen = this.downScreen.toString() + number.toString()
    }

    chooseSign(sign) {
        if (this.downScreen === '') return
        if (this.oldscreen !== '') {
            this.compute()
        }
        this.sign = sign
        this.oldscreen = this.downScreen
        this.downScreen = ''
    }

    compute() {
        let computation
        const old = parseFloat(this.oldscreen)
        const down = parseFloat(this.downScreen)
        if (isNaN(old) || isNaN(down)) return
        switch (this.sign) {
            case '+':
                computation = old + down
                break
            case '-':
                computation = old - down
                break
            case '*':
                computation = old * down
                break
            case '÷':
                computation = old / down
                break
            default:
                return
        }
        this.downScreen = computation
        this.sign = undefined
        this.oldscreen = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.downScreenTextElement.innerText = //this.downScreen
            this.getDisplayNumber(this.downScreen)
        if (this.sign != null) {
            this.oldscreenTextElement.innerText = //this.oldscreen
                `${this.getDisplayNumber(this.oldscreen)} ${this.sign}`
        } else {
            this.oldscreenTextElement.innerText = ''

        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const signButtons = document.querySelectorAll('[data-sign]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const oldscreenTextElement = document.querySelector('[data-old-screen]')
const downScreenTextElement = document.querySelector('[data-down-screen]')

const calculator = new Calculator(oldscreenTextElement, downScreenTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

signButtons.forEach(button => {
    button.addEventListener('click', () => {
        // console.log("plusSign")
        calculator.chooseSign(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})








