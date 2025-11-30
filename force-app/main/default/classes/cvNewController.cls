public with sharing class cvNewController {
    //  @AuraEnabled(cacheable=true)
    // public static List<String> getRatingStarOptions() {
    //     List<String> options = new List<String>();
    //     Schema.DescribeFieldResult fieldResult = CV__c.RatingStar__c.getDescribe();
    //     List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();

    //     for (Schema.PicklistEntry entry : picklistEntries) {
    //         options.add(entry.getLabel());
    //     }
    //     return options;
    // }

   


    @AuraEnabled
    public static void saveFeedback(Integer rating, String comment) {
        CV__c feedback = new CV__c();
        feedback.Rating__c = rating; 
        feedback.Comment__c = comment;
        insert feedback;
    }
}