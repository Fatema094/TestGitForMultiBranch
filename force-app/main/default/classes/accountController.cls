public with sharing class accountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Phone, Owner.Name FROM Account LIMIT 10];
    }
 @AuraEnabled
    public static Account getNextAccount(List<Id> excludedIds) {
        List<Account> results = [
            SELECT Id, Name, Phone, Owner.Name
            FROM Account
            WHERE Id NOT IN :excludedIds
            LIMIT 1
        ];
        return results.isEmpty() ? null : results[0];
    }

}