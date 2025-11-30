import { LightningElement,track,wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACTIVE_FIELD from '@salesforce/schema/Account.Active__c';
import PRIORITY_FIELD from '@salesforce/schema/Account.CustomerPriority__c';

import getAccounts from '@salesforce/apex/showRecordController.getAccounts';

export default class AccountCreator extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;

    accounts;

    @track showForm = true;
    fields = [NAME_FIELD, ACTIVE_FIELD, PRIORITY_FIELD ];

   @wire(getAccounts)
    wiredAccounts(result) {
        this.accounts = result;
    }
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        this.showForm = false;
        setTimeout(() => {
            this.showForm = true;
        }, 50);
        refreshApex(this.accounts);
    }
   
}