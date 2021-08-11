
class DonaleList {
    #donatens
    #container
    #title
    #donatesWrapper


    constructor(donatens) {
        this.#donatens = donatens;

        this.#container = document.createElement('div');
        this.#container.className = 'donates-container';

        this.#title = document.createElement('h2');
        this.#title.className = 'donates-container__title';
        this.#title.textContent = 'Список донатов';

        this.#donatesWrapper = document.createElement('div');
        this.#donatesWrapper.className = 'donate-item';
    }

    updateDonates(updatedDonates) {
        const donates = updatedDonates.map(this.#createDonate);  
        this.#donatesWrapper.textContent = '';
        this.#donatesWrapper.append(...donates);
    }

    #createDonate({ date, amount }) {
        const donateContainer = document.createElement('div');
        donateContainer.className = 'donate-item';
        donateContainer.textContent = date;
        
        const amountContainer = document.createElement('b');
        amountContainer.textContent = `${amount}$`;

        donateContainer.append(amountContainer);

        return donateContainer;
    }

    render() {
      const donates = this.#donatens.map(this.#createDonate);
      this.#donatesWrapper.append(...donates);
      this.#container.append(this.#title, this.#donatesWrapper);  

      return this.#container;
    }
}

export { DonaleList }