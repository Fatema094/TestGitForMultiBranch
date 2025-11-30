import { LightningElement , wire, track} from 'lwc';
import getAccounts from '@salesforce/apex/AuraImplementLwcController.getAccounts';
import getContacts from '@salesforce/apex/AuraImplementLwcController.getContacts';
import getOpportunities from '@salesforce/apex/AuraImplementLwcController.getOpportunities';
import getConnections from '@salesforce/apex/AuraImplementLwcController.getConnections';
import processContactId from '@salesforce/apex/AuraImplementLwcController.processContactId';
import createConnection from '@salesforce/apex/AuraImplementLwcController.createConnection';
import processAccountName from '@salesforce/apex/AuraImplementLwcController.processAccountName';
import { refreshApex } from '@salesforce/apex';

const COLUMNS1 = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: ' Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Owner Name', fieldName: 'OwnerName', type: 'text'}
];

const COLUMNS2 = [
    { label: 'Contact Name', fieldName: 'Name', type: 'text' },
    { label: ' Email', fieldName: 'Email', type: 'email' },
    { label: ' Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Account Name', fieldName: 'AccountName', type: 'text'}
];
const COLUMNS3 = [
    { label: 'opportunity Name', fieldName: 'Name', type: 'text' },
    { label: ' Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Account Name', fieldName: 'AccountName', type: 'text'}
];

const COLUMNS4 = [
    { label: 'Account', fieldName: 'Account', type: 'text' },
    { label: ' Contact', fieldName: 'Contact', type: 'text' },
    { label: 'Opportunity', fieldName: 'Opportunity', type: 'text'}
];
export default class AuraImplementLwc extends LightningElement {
        @track Accounts;
        @track Contacts = [];
        @track Opportunities = [];
        @track Connections;
    @track error;
    @track contactId = '';;
    @track accountId;
    @track opportunityId;
    accountName;
    isModalOpen = false;
    columnacc = COLUMNS1;
    columncon = COLUMNS2;
    columnopp = COLUMNS3;
    columncnt = COLUMNS4;

wiredConnectionsResult;

    @wire(getConnections)


    connectedCallback(){
         this.handleAcc();
         this.handleCon();
         this.handleOpp();
        this.handleCnt();
         this.fetchContacts();
          this.fetchAccounts();
         this.fetchOpportunities();
    
     }


    handleAcc() {
    getAccounts()
            .then(result => {
                 let tempData = result.map(a => ({
                    ...a,
                    OwnerName: a.Owner ? a.Owner.Name : ''
                }));
               this.Accounts = tempData;
                this.error = undefined;
             })
            .catch(error => {
                this.error = error;
                this.Accounts = undefined;
            });
        }

        


        handleCon() {
        getContacts()
            .then(result => {
              //  console.log('Fetched contacts:', result);
               let tempData = result.map(c => ({
                    ...c,
                    AccountName: c.Account ? c.Account.Name : ''
                }));
               // console.log('Temp Data:', JSON.stringify(tempData, null, 2));
               this.Contacts = tempData;
           // this.Contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.Contacts = undefined;
            });
        }

        handleOpp() {
        getOpportunities()
                 .then(result => {
                console.log('Fetched Opp:', result);
               let tempData = result.map(o => ({
                    ...o,
                    AccountName: o.Account ? o.Account.Name : ''
                }));
               this.Opportunities = tempData;
               // this.Opportunities = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.Opportunities = undefined;
            });
        }
 

handleCnt() {
        getConnections()
            .then(result => {
                let tempData = result.map(con => ({
                    ...con,
                    Account: con.Account__r ? con.Account__r.Name : '',
                    Contact: con.Contact__r ? con.Contact__r.Name : '',
                    Opportunity: con.Opportunity__r ? con.Opportunity__r.Name : ''
                    
                }));
              //  console.log('Temp Data:', JSON.stringify(tempData, null, 2));
               this.Connections = tempData;
              // console.log('Fetched cnt:', Connections);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.Connections = undefined;
            });
         }

         openModal() {
        this.isModalOpen = true;
        this.handleCon();
         }

    closeModal() {
        this.isModalOpen = false;
    }

    fetchAccounts() {
        getAccounts().then(result => {
            this.accountOptions = result.map(acc => ({
                label: acc.Name,
                value: acc.Id
            }));
        }).catch(error => {
            console.error('Error fetching accounts:', error);
        });
    }
    

    handleAccountChange(event) {
        const accId = event.target.value;
        this.accountId = accId;
         console.log('Selected account ID:', accId);
    }
    

    fetchContacts() {
        getContacts()
            .then(result => {
                this.contactOptions = result.map(con => ({
                    label: con.Name,
                    value: con.Id
                }));
                // Optional: set default
                if (this.contactOptions.length > 0) {
                    this.selectedContactId = this.contactOptions[0].value;
                }
            })
            .catch(error => {
                console.error('Error loading contacts:', error);
            });
    }

    handleContactChange(event) {
      
        const conId = event.target.value;
        this.contactId = conId;
        console.log('Selected Contact ID:', conId);
       

         processContactId({ selectcontactId: conId })
         .then(cid => {
            console.log('Apex method executed successfully', cid);

             this.accountName = cid;
        })
        .catch(error => {
            console.error('Error calling Apex:', error);
        });
    }


    fetchOpportunities() {
        getOpportunities()
            .then(result => {
                this.opportunityOptions = result.map(opp => ({
                    label: opp.Name,
                    value: opp.Id
                }));
            })
            .catch(error => {
                console.error('Error fetching opportunities:', error);
            });
    }

     handleOpportunityChange(event) {
       const oppId = event.target.value;
       this.opportunityId = oppId;
        console.log('Selected Opportunity ID:', this.opportunityId);
       
    }



    handleSave() {
   

    // Send to Apex
    createConnection({
        contactId: this.contactId,
        accountId: this.accountId,
        opportunityId: this.opportunityId


    })
    .then(() => {
        console.log('Connection__c record inserted successfully');
        alert('Connection saved!');
        this.closeModal();
        //this.handleCnt();
         refreshApex(this.wiredAccountsResult);
        // Optionally reset values or close modal
    })
    .catch(error => {
        console.error('Error saving connection:', error);
        alert('Error saving connection.');
    });
}



}