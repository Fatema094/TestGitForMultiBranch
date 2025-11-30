import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
     @api question;

   handleOptionClick(event) {
        const selectedAnswer = event.target.label;

        const answerEvent = new CustomEvent('answerselected', {
            detail: selectedAnswer
        });
        this.dispatchEvent(answerEvent);
    }
}