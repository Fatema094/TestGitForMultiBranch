public with sharing class AuraImplementLwcController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Phone, Owner.Name FROM Account LIMIT 10];
    }
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name, Phone, Email,Account.Name FROM Contact LIMIT 10];
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, StageName, Account.Name FROM Opportunity LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Connection__c> getConnections() {
        return [ SELECT Id, Name, Account__c, Account__r.Name,
               Contact__c, Contact__r.Name,
               Opportunity__c, Opportunity__r.Name
        FROM Connection__c
        LIMIT 10];
    }
     
     @AuraEnabled
        public static string processContactId(String selectcontactId) {
            System.debug('Received Contact Id: ' + selectcontactId);

            // Example: Get the Contact's info
            Contact con = [SELECT Id, AccountId, Account.Name FROM Contact WHERE Id = :selectcontactId LIMIT 1];
            return con.Account.Name;//[G8 invention which]
            //return con.AccountId;
        }


     @AuraEnabled
        public static String processAccountName(String selectaccountId) {
            Account acc = [SELECT Id, Name FROM Account WHERE Id = :selectaccountId LIMIT 1];
            return acc.Name;

        }


    @AuraEnabled
    public static void createConnection(String contactId, String accountId, String opportunityId) {
        Connection__c conn = new Connection__c(
            Contact__c = contactId,
            Account__c = accountId,
            Opportunity__c = opportunityId
        );
        insert conn;
    }

}