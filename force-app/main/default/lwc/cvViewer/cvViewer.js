import { LightningElement, track, wire } from 'lwc';
import saveFeedback from '@salesforce/apex/cvNewController.saveFeedback';

//import getRatingStarOptions from '@salesforce/apex/cvNewController.getRatingStarOptions';


export default class CvViewer extends LightningElement {
    @track rating;
    @track comment;
    @track success = false;

    @track ratingOptions = [];

     get stars() {
        // Returns an array of 5 stars, each with a `filled` boolean
        return [1, 2, 3, 4, 5].map(index => ({
            value: index,
            filled: index <= this.rating
        }));
    }


    //  @wire(getRatingStarOptions)
    // wiredRatings({ error, data }) {
    //     if (data) {
    //         this.ratingOptions = data.map(value => ({
    //             label: value,
    //             value: value
    //         }));
    //     } else if (error) {
    //         console.error('Error loading rating options:', error);
    //     }
    // }

    handleRating(event) {
        this.rating = event.detail.value;
    }

    handleComment(event) {
        this.comment = event.target.value;
    }






     handleStarClick(event) {
        this.rating = parseInt(event.target.dataset.value, 10);
    }

    isStarFilled(index) {
        return index <= this.rating;
    }

    handleComment(event) {
        this.comment = event.target.value;
    }

    submitFeedback() {
        if (this.rating === 0) {
            alert('Please provide a star rating.');
            return;
        }

        saveFeedback({ rating: this.rating.toString(), comment: this.comment })
            .then(() => {
                this.success = true;
                this.rating = 0;
                this.comment = '';
            })
            .catch(error => {
                console.error('Error saving feedback', error);
            });
    }

    // submitFeedback() {
    //     saveFeedback({ rating: this.rating, comment: this.comment })
    //         .then(() => {
    //             this.success = true;
    //             this.rating = null;
    //             this.comment = '';
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
}