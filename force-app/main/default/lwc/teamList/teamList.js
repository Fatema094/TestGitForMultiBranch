import { LightningElement, track, wire } from 'lwc';
import getTeams from '@salesforce/apex/TeamListController.getTeams';
import getTeamById from '@salesforce/apex/TeamListController.getTeamById';
import getTeamsByName from '@salesforce/apex/TeamListController.getTeamsByName';


export default class TeamList extends LightningElement {
    @track teams = [];
    @track error;
    @track selectedRecordId;
    @track selectedRecord;
    @track showModal = false;
    @track selectedTeamId = null;
    @track searchKeyword = '';

    // Load all teams on component load
    @wire(getTeams)
    wiredTeams({ data, error }) {
        if (data) {
            this.teams = data;
        } else {
            this.error = error;
        }
    }

    handleNameClick(event) {
        const recordId = event.target.dataset.id;
        this.selectedRecordId = recordId;
        this.fetchRecordDetails();
    }

    fetchRecordDetails() {
        getTeamById({ recordId: this.selectedRecordId })
            .then(result => {
                this.selectedRecord = result;
                this.showModal = true;
            })
            .catch(error => {
                console.error('Error fetching record details:', error);
            });
    }

    closeModal() {
        this.showModal = false;
    }

    handleRecordSelection(event) {
        this.selectedTeamId = event.detail.recordId;
    }

    handleNameChange(event) {
    this.searchKeyword = event.target.value;
}

   handleSearch() {
    console.log('Search keyword:', this.searchKeyword);

    if (!this.searchKeyword) {
        console.warn('No search keyword provided');
        return;
    }

    getTeamsByName({ playerName: this.searchKeyword })
        .then(result => {
            console.log('Search result:', result);
            this.teams = result;
        })
        .catch(error => {
            console.error('Error during search:', error); // <-- this helps!
            this.error = error;
        });
}


}