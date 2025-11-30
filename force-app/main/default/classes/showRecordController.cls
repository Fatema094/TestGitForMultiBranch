public with sharing class showRecordController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name, Active__c, CustomerPriority__c
            FROM Account
            WITH SECURITY_ENFORCED
            ORDER BY Name Limit 10
        ];
    }
}