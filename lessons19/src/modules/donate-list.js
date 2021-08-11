import { Settings } from '../core/constants/settings';
import * as utils from '../core/utils/index';

class DonaleList {
    #donatens
    #container
    #title
    #donatesWrapper


    constructor(donatens) {
        this.#donatens = donatens;
        this.#container = document.createElement('div');
        this.#title = document.createElement('h2');
        this.#donatesWrapper = document.createElement('div');
    }

    updateDonates(updatedDonates) {
        const donates = updatedDonates.map(this.#createDonate);  
        this.#donatesWrapper.textContent = '';
        this.#donatesWrapper.append(...donates);
    }

    #createDonate({ date, amount }) {
        const donateContainer = document.createElement('div');
        donateContainer.className = 'donate-item';
        donateContainer.textContent = utils.getFormattedTime(date);
        
        const amountContainer = document.createElement('b');
        amountContainer.textContent = ` - ${amount}${Settings.currency}`;

        donateContainer.append(amountContainer);

        return donateContainer;
    }

    render() {
        this.#container.className = 'donates-container';
        this.#title.className = 'donates-container__title';
        this.#title.textContent = 'Список донатов';
        this.#donatesWrapper.className = 'donate-item';

        const donates = this.#donatens.map(this.#createDonate);
        this.#donatesWrapper.append(...donates);
        this.#container.append(this.#title, this.#donatesWrapper);  

        return this.#container;
    }
}

export { DonaleList }