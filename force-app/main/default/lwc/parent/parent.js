import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
     parentInput = '';
     submittedInput = '';

     handleParentInput(event) {
        this.parentInput = event.target.value;
    }
     handleSubmit() {
        this.submittedInput = this.parentInput;
        console.log('value',this.submittedInput);
    }
}