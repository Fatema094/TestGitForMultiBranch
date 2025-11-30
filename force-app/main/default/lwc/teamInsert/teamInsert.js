import { LightningElement,track,wire} from 'lwc';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import TEAM_OBJECT from '@salesforce/schema/Team__c';
import COUNTRY_FIELD from '@salesforce/schema/Team__c.Country_Name__c';
import POSITION_FIELD from '@salesforce/schema/Team__c.Position__c';
import CATEGORY_FIELD from '@salesforce/schema/Team__c.Category__c';

import insertTeam from '@salesforce/apex/TeamController.insertTeam';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TeamInsert extends LightningElement {
    @track playerName = '';
    @track countryName = '';
    @track position = '';
    @track category = '';

    countryOptions = [];
    positionOptions = [];
    categoryOptions = [];

    // Get object info
    @wire(getObjectInfo, { objectApiName: TEAM_OBJECT })
    objectInfo;

    // Fetch picklist values dynamically
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: COUNTRY_FIELD
    })
    countryPicklistHandler({ data, error }) {
        if (data) this.countryOptions = data.values;
    }

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: POSITION_FIELD
    })
    positionPicklistHandler({ data, error }) {
        if (data) this.positionOptions = data.values;
    }

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    })
    categoryPicklistHandler({ data, error }) {
        if (data) this.categoryOptions = data.values;
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
    }

    handleSubmit() {
        insertTeam({
            playerName: this.playerName,
            countryName: this.countryName,
            position: this.position,
            category: this.category
        })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Team member created. ID: ' + result,
                    variant: 'success'
                }));
                this.playerName = '';
                this.countryName = '';
                this.position = '';
                this.category = '';
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                }));
            });
    }
}