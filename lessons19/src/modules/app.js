import { DonateForm } from './donate-form';
import { DonaleList } from './donate-list';

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
        this.#donateForm = new DonateForm();
        this.#donateList = new DonaleList(mockDonates); 
    }

    run() {
        const donateFormHTML = this.#donateForm.render();
        const donateListHTML = this.#donateList.render();

        document.body.append(donateFormHTML, donateListHTML);
    }
}

export default App;