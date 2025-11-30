public class BatchPractrice implements Database.Batchable<sObject>{
    
    
     public Integer recordsProcessed = 0;
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('SELECT ID, BillingStreet, BillingCity, BillingState, ' +
            'BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode FROM Contacts) FROM Account ' +
            'Where BillingCountry = \'USA\'');
    }
    public void execute(Database.BatchableContext bc, List<Account> scope){
        List<Contact> contacts = new List<Contact>();
        for(Account account : scope){
            for(Contact Contact : account.contacts){
                 contact.MailingStreet = account.BillingStreet;
                contact.MailingCity = account.BillingCity;
                contact.MailingState = account.BillingState;
                contact.MailingPostalCode = account.BillingPostalCode;
                
                contacts.add(contact);
                 recordsProcessed = recordsProcessed + 1;
            }
        }
        update contacts;
        
    }
    public void finish(Database.BatchableContext bc){
        
    }

}