import { LightningElement , wire, track} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

import saveAccounts from '@salesforce/apex/LWCOverall.saveAccounts';
//import test from '@salesforce/apex/LWCOverall.test';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class LWCOveral extends NavigationMixin(LightningElement) {

     @track selectedType = '';
    @track typeOptions = [];

    // Get Object Info to retrieve Record Type ID
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // Get Picklist Values based on Record Type ID
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.typeOptions = data.values;
        } else if (error) {
            console.error('Error loading picklist values:', error);
        }
    }

    handleNameChange(event) {
        this.selectedName = event.detail.value;
        console.log('Selected Account Name: ' + this.selectedName);

    }

    handleOwnerChange(event) {
        this.selectedOwner = event.detail.recordId;
        console.log('Selected Account Type:' + this.selectedOwner);
    }

    handleMBAChange(event) {
        this.selectedMBA = event.target.checked;
        console.log('Selected MBA:' + this.selectedMBA);
    }

    handleTypeChange(event) {
        this.selectedType = event.target.value;
        console.log('Selected Account Type: ' + this.selectedType);
    }
    handleDateChange(event) {
        this.selectedDate = event.target.value;
        console.log('Selected Date: ' + this.selectedDate);
    }


handleSave(){
    console.log('Save method called');
        saveAccounts({
            selectedName : this.selectedName,
             selectedType :this.selectedType,
            selectedOwner : this.selectedOwner,
             selectedMBA : this.selectedMBA,
             selectedDate :this.selectedDate
        })
        // .then(result=>{
        //     console.log('Id   === '+result);
        //      //alert('Account saved successfully!');
        // })
        // .catch(error => {
        //     console.error('Error saving accounts:', error);
        // }); 

        .then(accountId => {
        console.log('Created Account Id === ' + accountId);

        const accountLink = `/lightning/r/Account/${accountId}/view`;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Account Created',
                message: 'Click {0} to view the Account.',
                messageData: [
                    {
                         url: accountLink,
                         label: this.selectedName
                    }
                ],
                variant: 'success',
                mode: 'sticky' // Keeps the toast visible until dismissed
            })
        );

          // Clear JS variables
            this.selectedName = '';
            this.selectedType = '';
            this.selectedOwner = '';
            this.selectedMBA = false;
            this.selectedDate = '';

            // Clear all text inputs
            this.template.querySelectorAll('lightning-input').forEach(input => {
                if (input.type !== 'checkbox') { // ✅ Avoid resetting checkboxes here
                    input.value = '';
                }
            });

            // Clear combobox
            //this.template.querySelector('lightning-combobox').value = '';

            // Clear checkbox
            const mbaCheckbox = this.template.querySelector('[data-id="matchBillingCheckbox"]');
            if (mbaCheckbox) {
                mbaCheckbox.checked = false; // ✅ Uncheck the checkbox
            }

            // Clear Owner record picker
            const ownerPicker = this.template.querySelector('[data-id="ownerPicker"]');
            if (ownerPicker) {
                ownerPicker.value = null; // ✅ Clear the record picker selection
            }


    })
    .catch(error => {
        console.error('Error saving accounts:', error);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error: ' + error.body.message,
                variant: 'error'
            })
        );
    });
    }

}