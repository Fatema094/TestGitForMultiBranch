import { LightningElement, track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountController.getAccounts';
import getNextAccount from '@salesforce/apex/accountController.getNextAccount';

export default class AccountTable extends LightningElement {
    @track accounts = [];

    @track newAccounts = [];

    get options() {
        return [
            { label: 'Proospect', value: 'Proospect' },
            { label: 'Customer Direct', value: 'Customer Direct' },
            { label: 'Customer Channel', value: 'Customer Channel' },
        ];
    }

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.map(acc => this.mapAccount(acc));
        } else if (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    

    mapAccount(account) {
        return {
            id: account.Id,
            name: account.Name,
            phone: account.Phone,
            owner: account.Owner?.Name || 'N/A',
            plusButton : true,
             removeButtom : false
        };
    }

    connectedCallback(){
        this.newAccounts.push({
            index : 1,
            name : '',
            phone : '',
            type : '',
            plusButton : true,
            removeButtom : false
        });
    }

    handleRemove(event) {
        const idToRemove = event.target.dataset.id;
        this.accounts = this.accounts.filter(acc => acc.id !== idToRemove);
    }

    async handleAdd() {
        console.log('handleAdd()===');
        
        let arrSize = this.accounts.length;

        console.log('arrSize==='+arrSize);
        


        this.accounts.forEach(acc=>{
            acc.plusButton = false;
            acc.removeButton = true;
        });

       
       // console.log('this.accounts',JSON.stringify(this.accounts));
        
        const existingIds = this.accounts.map(acc => acc.id);
        try {
            const newAccount = await getNextAccount({ excludedIds: existingIds });
            if (newAccount) {
                this.accounts = [...this.accounts, this.mapAccount(newAccount)];
            } else {
                alert('No more accounts to add.');
            }
        } catch (error) {
            console.error('Error fetching new account:', error);
        }


        //  this.accounts.push({
        //     id : arrSize++,
        //     // name : '',
        //     // phone : '',
        //     // owner : '',
        //     plusButton : true,
        //     removeButton : false
        // });



    }


    handleAddNew(event){
        let rowNum;

        this.newAccounts.forEach(acc=>{
            acc.plusButton = false,
            acc.removeButtom = true,
            rowNum = acc.index
        });

        this.newAccounts.push({
            index : ++rowNum,
            name : '',
            phone : '',
            type : '',
            plusButton : true,
            removeButtom : false
        });
    }

    handleAccountName(event){
        let tempAccName = event.target.value;
        let tempIndx = event.target.dataset.abid;
        console.log(tempAccName+'    Id   === '+tempIndx);

        this.newAccounts.forEach(acc=>{
            if(acc.index == tempIndx){
                acc.name = tempAccName
            }
        });
       

        // for(let i=0; i<this.newAccounts.length; i++){
        //     if(i == tempIndx){
        //         this.newAccounts[i].name = tempAccName;
        //     }
        // }
        console.log('Arr == ',JSON.stringify(this.newAccounts));
    }
}