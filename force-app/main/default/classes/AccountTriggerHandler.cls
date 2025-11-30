public class AccountTriggerHandler {

    public static void createChildContacts(List<Account> newAccounts) {
        List<Contact> contactsToInsert = new List<Contact>();
        for (Account acc : newAccounts) {
           // if (String.isNotBlank(acc.Name)) {
               // contactsToInsert.add(new Contact(
               Contact con = new Contact();
                   con.LastName = acc.Name;
                   con.AccountId = acc.Id;
            contactsToInsert.add(con);
                //));
            }
 
        
        if (!contactsToInsert.isEmpty()) {
            insert contactsToInsert;
        }
    }

    public static void syncContactNames(List<Account> updatedAccounts, Map<Id, Account> oldMap) {
        List<Contact> contactsToUpdate = new List<Contact>();
        for (Account acc : updatedAccounts) {
            Account oldAcc = oldMap.get(acc.Id);
            if (acc.Name != oldAcc.Name) {
                List<Contact> contacts = [SELECT Id, LastName FROM Contact WHERE AccountId = :acc.Id];
                for (Contact con : contacts) {
                    con.LastName = acc.Name;
                    contactsToUpdate.add(con);
                }
            }
        }
        if (!contactsToUpdate.isEmpty()) {
            update contactsToUpdate;
        }
    }
}