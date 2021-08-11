import { DonateForm } from './donate-form';
import { DonaleList } from './donate-list';
import * as utils from '../core/utils/index';

const mockDonates = [
    { amount: 4, date: new Date() },
    { amount: 20, date: new Date() },
    { amount: 3, date: new Date() },
    { amount: 1, date: new Date() },
 ];

class App {
    #donateForm
    #donateList

    constructor() {
        this.state = {
            donates: mockDonates,
            totalAmount: utils.calculateSumOfNumbers(mockDonates.map(({amount}) => amount)),
        }

        this.#donateForm = new DonateForm(this.state.totalAmount, this.createNewDonate.bind(this));
        this.#donateList = new DonaleList(this.state.donates); 
    }

    createNewDonate(newDonate) {
        this.state = { 
            donates: [...this.state.donates, newDonate], 
            totalAmount: this.state.totalAmount + newDonate.amount 
        };

        this.#donateForm.updateTotalAmount(this.state.totalAmount);
        this.#donateList.updateDonates(this.state.donates);
    }

    run() {
        const donateFormHTML = this.#donateForm.render();
        const donateListHTML = this.#donateList.render();

        document.body.append(donateFormHTML, donateListHTML);
    }
}

export default App;