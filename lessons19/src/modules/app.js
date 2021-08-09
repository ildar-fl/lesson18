import { DonateForm } from './donate-form';

class App {
    #donateForm

    constructor() {
        this.#donateForm = new DonateForm();
    }

    run() {
        document.body.append(this.#donateForm.render());
    }
}

export default App;