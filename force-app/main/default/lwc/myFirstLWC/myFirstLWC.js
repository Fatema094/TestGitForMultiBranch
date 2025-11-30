import { LightningElement, track } from 'lwc';

export default class MyFirstLWC extends LightningElement {
    @track studentName;

    handleNameFiled(event){
        //console.log(event.target.value);
        this.studentName = event.target.value;
    }

    handleSubmit(event){
        let tempStdName = this.studentName;

        console.log(tempStdName);
    }
}