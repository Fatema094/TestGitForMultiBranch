public with sharing class AccountAura {
 @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, CleanStatus, Owner.Name
            FROM Account
            LIMIT 10
        ];
    }
}