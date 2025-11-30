public with sharing class MultiObjectController {
    @AuraEnabled(cacheable=true)
    public static CombinedDataWrapper getAllData() {
        CombinedDataWrapper data = new CombinedDataWrapper();
        data.accounts = [SELECT Id, Name, Status__c, Owner.Name FROM Account LIMIT 10];
        data.contacts = [SELECT Id, FirstName, LastName, Email, Phone, Account.Name FROM Contact LIMIT 10];
        data.opportunities = [SELECT Id, Name, StageName, Account.Name FROM Opportunity LIMIT 10];
        data.connections = [ SELECT Id, Account__c, Account__r.Name, 
                   Contact__c, Contact__r.FirstName, Contact__r.LastName, 
                   Opportunity__c, Opportunity__r.Name 
            FROM Connection__c 
            ];
        return data;
    }
    
     @AuraEnabled
     public static string getAssociatedAccount(String contactId) {
        System.debug('====contactId==='+contactId);
        List<Contact> listCon = [SELECT Id,AccountId FROM Contact WHERE Id=:contactId];
        return listCon[0].AccountId;
    }
    
        
     @AuraEnabled
     public static Opportunity getOpportunity (String opportunityId) {
        System.debug('====oppId==='+opportunityId);
        List<Opportunity> listOpp = [SELECT Id,Name FROM Opportunity WHERE Id=:opportunityId];
        return listOpp[0];
    }

   @AuraEnabled
    public static void saveConnectionToServer(String contact, String account, String opportunity) {
        System.debug('====contactId==='+contact);
        Connection__c conn = new Connection__c();
        conn.Contact__c = contact;
        conn.Account__c = account;
        conn.Opportunity__c = opportunity;

        insert conn;
    }
}