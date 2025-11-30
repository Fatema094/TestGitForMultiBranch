import { LightningElement, track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/OpportunityController.getAccounts';
import saveOpportunities from '@salesforce/apex/OpportunityController.saveOpportunities';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class OpportunityTable extends LightningElement {


      @track accounts = [];
    
        @track Opportunity = [];
        @track stageOptions = [];

        @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
        objectInfo;

        @wire(getPicklistValues, {
            recordTypeId: '$objectInfo.data.defaultRecordTypeId',
            fieldApiName: STAGE_FIELD
        })
        wiredPicklistValues({ error, data }) {
            if (data) {
                this.stageOptions = data.values;
            } else if (error) {
                console.error('Error fetching picklist values', error);
            }
        }
    
    
        connectedCallback(){
            
            //this.initialOpportunities();
            this.Opportunity.push({
                index : 1,
                Name : '',
                // AccountName : '',
                AccountId : '',
                StageName : '',
                plusButton : true,
                removeButtom : false
            });
        }

    
    
        handleRemove(event) {
     
             const idToRemove = parseInt(event.target.dataset.id, 10); // convert to number
            this.Opportunity = this.Opportunity.filter(opp => opp.index !== idToRemove);

        }
    
        
    
        handleAddNew(event){
            let rowNum;
    
            this.Opportunity.forEach(opp=>{
                opp.plusButton = false,
                opp.removeButtom = true,
                rowNum = opp.index
            });
    
            this.Opportunity.push({
                index : ++rowNum,
              
                Name : '',
                 //AccountName : '',
                AccountId :'',
                StageName : '',
                plusButton : true,
                removeButtom : false
            });
        }

        // fetchAccounts() {
        //         getAccounts().then(result => {
        //             this.accountOptions = result.map(acc => ({
        //                 label: acc.Name,
        //                 value: acc.Id
        //             }));
        //         }).catch(error => {
        //             console.error('Error fetching accounts:', error);
        //         });
        //     }
    
        handleName(event){
            let tempName = event.target.value;
            let tempIndx = event.target.dataset.id;

           let tempAccId = event.detail.recordId;
           let tempAccIndx = event.target.dataset.aid;

            let tempStage = event.target.value;
            let tempOppIndx = event.target.dataset.oppid;
            
            console.log(tempName+'    Id   === '+tempIndx);
    
            this.Opportunity.forEach(opp=>{
                if(opp.index == tempIndx){
                    opp.Name = tempName;
                }else if(opp.index == tempAccIndx){
                     opp.AccountId = tempAccId;
                     console.log('Selected AccountId:', opp.AccountId, 'for index:', tempAccIndx);
                }else if(opp.index == tempOppIndx){
                     opp.StageName = tempStage;
                 }
            });
            console.log('Arr == ',JSON.stringify(this.Opportunity));
        
        }
        
    
        handleSave() {

               let isValid = true;

                // Validate each Opportunity row
                this.Opportunity.forEach(opp => {
                    if (!opp.AccountId) {
                        isValid = false;
                        alert(`Please select an Account for row ${opp.index + 1}`);
                    }
                });

                if (!isValid) {
                    return; // stop saving
                }


    // Filter only filled rows
           // const validOpps = this.Opportunity.filter(opp => opp.Name && opp.StageName);

            const formattedOpps = this.Opportunity.map(opp => ({
                Name: opp.Name,
                StageName: opp.StageName,
                AccountId: opp.AccountId
               
            }));

            const storedOpp = JSON.stringify(formattedOpps);
            console.log('AccountId being sent:', JSON.stringify(formattedOpps));

            saveOpportunities({ opportunities: storedOpp })
        
                .then((result) => {
                     console.log('    Id   === ',result);
                   // alert('Opportunities saved successfully!');
                })
                .catch(error => {
                    console.error('Error saving opportunities:', error);
                    alert('Error saving opportunities.');
                });
        }
}