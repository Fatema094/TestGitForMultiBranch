import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex'; // ✅ Required for refresh
import getAccounts from '@salesforce/apex/showRecordController.getAccounts';

const actions = [{ label: 'Edit', name: 'edit' }];

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: 'Active', fieldName: 'Active__c', type: 'text' },
    { label: 'Priority', fieldName: 'CustomerPriority__c', type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions }
    }
];

export default class ShowRecord extends LightningElement {
    columns = COLUMNS;
    @track selectedRecordId;

    accountsResult; // store wire result for refreshApex
    accountsData = [];

    @wire(getAccounts)
    wiredAccounts(result) {
        this.accountsResult = result;
        if (result.data) {
            this.accountsData = result.data;
        } else if (result.error) {
            console.error('Error fetching accounts:', result.error);
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'edit') {
            this.selectedRecordId = row.Id;
        }
    }

    handleSuccess() {
        this.selectedRecordId = null; // Hide form
        refreshApex(this.accountsResult); // Refresh the account list
    }

    handleCancel() {
        this.selectedRecordId = null;
    }
}