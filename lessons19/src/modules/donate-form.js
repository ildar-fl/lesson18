class DonateForm {
    #form
    #title
    #inputContainer
    #input
    #button

    constructor() {
        this.#form = document.createElement('form');
        this.#title = document.createElement('h1');
        this.#inputContainer = document.createElement('label');
        this.#input = document.createElement('input');
        this.#button = document.createElement('button');
    }

    render() {
        this.#form.className='donate-form';
        
        this.#title.id = 'total-amount';
        this.#title.textContent = '28$';

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