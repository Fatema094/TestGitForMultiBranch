public class CombinedDataWrapper {
    @AuraEnabled public List<Account> accounts;
    @AuraEnabled public List<Contact> contacts;
    @AuraEnabled public List<Opportunity> opportunities;
    @AuraEnabled public List<connection__c> connections;
}