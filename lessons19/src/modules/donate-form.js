class DonateForm {
    #form
    #title
    #inputContainer
    #input
    #button

    constructor(totalAmount, addDonate) {
        this.totalAmount = totalAmount;
        this.addDonate = addDonate;

        console.log(addDonate);

        this.#form = document.createElement('form');
        this.#title = document.createElement('h1');
        this.#inputContainer = document.createElement('label');
        this.#input = document.createElement('input');
        this.#button = document.createElement('button');
    }

    updateTotalAmount(newAmount) {
        this.#title.textContent = `${newAmount}$`;  
    }

    createDonate(event) {
        event.preventDefault();
        
        const amount = Number(event.target.amount.value.trim());
        event.target.amount.value = '';
        this.addDonate({ amount, date: new Date() });
    }

    render() {
        this.#form.className='donate-form';
        this.#form.addEventListener('submit', this.createDonate.bind(this));
        
        this.#title.id = 'total-amount';
        this.#title.textContent = `${this.totalAmount}$`;

        this.#inputContainer.className = 'donate-form__input-label';
        this.#inputContainer.textContent = 'Введите сумму в $';

        this.#input.className = 'donate-form__donate-input';
        this.#input.name = 'amount';
        this.#input.type = 'number';
        this.#input.max = '100';
        this.#input.min = '0';
        this.#input.required = '';

        this.#inputContainer.append(this.#input);

        this.#button.className = 'donate-form__submit-button';
        this.#button.type = 'submit';
        this.#button.textContent = 'Задонатить';

        this.#form.append(this.#title, this.#inputContainer, this.#button);

        return this.#form;
    }
}

export { DonateForm };