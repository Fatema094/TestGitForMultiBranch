import { LightningElement, track } from 'lwc';

export default class CreateContactForm extends LightningElement {
    @track showForm = true;
    @track showPreview = false;
    @track formKey = 0; // Used to force form re-render

    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track leadSource = '';

    @track previewFirstName = '';
    @track previewLastName = '';
    @track previewEmail = '';
    @track previewLeadSource = '';

    leadSourceOptions = [
        { label: 'Web', value: 'Web' },
        { label: 'Phone Inquiry', value: 'Phone Inquiry' },
        { label: 'Partner Referral', value: 'Partner Referral' },
        { label: 'Purchased List', value: 'Purchased List' },
        { label: 'Other', value: 'Other' }
    ];

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
    }

    previewData() {
        // Store preview values
        this.previewFirstName = this.firstName;
        this.previewLastName = this.lastName;
        this.previewEmail = this.email;
        this.previewLeadSource = this.leadSource;

        // Clear input values
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.leadSource = '';

        // Force form block to re-render with empty inputs
        this.formKey++;

        this.showPreview = true;
    }

    @track data = [
        
    ];

    columns = [
        { label: 'FirstName', fieldName: 'name' },
        { label: 'LastName', fieldName: 'name' },
        { label: 'Email', fieldName: 'email', type: 'email' },
        { label: 'leadSource', fieldName: 'status' }
    ];
}