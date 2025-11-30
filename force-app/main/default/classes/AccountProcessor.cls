public class AccountProcessor {
  @future
    public static void countContacts(List<Id> accountIds) {
        // Map to hold account ID -> contact count
        Map<Id, Integer> contactCountMap = new Map<Id, Integer>();

        // Query contacts grouped by accountId
        for (AggregateResult result : [
            SELECT AccountId, COUNT(Id) total 
            FROM Contact 
            WHERE AccountId IN :accountIds 
            GROUP BY AccountId
        ]) {
            contactCountMap.put((Id)result.get('AccountId'), (Integer)result.get('total'));
        }

        // Query Accounts and update the custom field
        List<Account> accountsToUpdate = new List<Account>();

        for (Id accId : accountIds) {
            
            Integer count = contactCountMap.containsKey(accId) ? contactCountMap.get(accId) : 0;
            accountsToUpdate.add(new Account(Id = accId, Number_Of_Contacts__c = count));
        }

        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }
}