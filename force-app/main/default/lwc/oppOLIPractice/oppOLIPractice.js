import { LightningElement, api, wire, track } from 'lwc';
import getOpportunityLineItems from '@salesforce/apex/OppOLIPracticeController.getOpportunityLineItems';
import deleteLineItem from '@salesforce/apex/OppOLIPracticeController.deleteLineItem';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class OppOLIPractice extends LightningElement {
        @api recordId; 
        @track lineItems = [];
        wiredResult;

    @wire(getOpportunityLineItems, { oppId: '$recordId' })
    wiredLineItems(result) {
        this.wiredResult = result;
        if (result.data) {
            this.lineItems = result.data.map(item => ({
                Id: item.Id,
                Name: item.PricebookEntry?.Product2?.Name,
                UnitPrice: item.UnitPrice,
                Quantity: item.Quantity,
                TotalPrice: item.TotalPrice
            }));
        } else if (result.error) {
            this.showToast('Error', result.error.body.message, 'error');
        }
    }

    handleDelete(event) {
        const recordId = event.target.dataset.id;
        deleteLineItem({ recordId })
            .then(() => {
                this.showToast('Success', 'Line Item deleted successfully', 'success');
                return refreshApex(this.wiredResult);
            })
            .catch(error => {
                this.showToast('Error deleting record', error.body.message, 'error');
            });
    }

    handleEdit(event) {
        const recordId = event.target.dataset.id;
        // navigate to standard edit page
        window.open(`/lightning/r/OpportunityLineItem/${recordId}/edit`, '_blank');
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}