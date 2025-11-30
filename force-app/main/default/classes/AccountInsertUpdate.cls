Global class AccountInsertUpdate implements Database.Batchable<sObject>{
    
    
      public List<String> errorLogs = new List<String>();

    global Database.QueryLocator start(Database.BatchableContext BC) {
       
        return Database.getQueryLocator([
            SELECT Id, Name FROM Account
        ]);
    }

    global void execute(Database.BatchableContext BC, List<SObject> scope) {
         List<Account> accounts = (List<Account>) scope;
        Set<Id> accountIds = new Set<Id>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }

        Map<Id, List<Contact>> accToContacts = new Map<Id, List<Contact>>();
        for (Contact c : [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
            if (!accToContacts.containsKey(c.AccountId)) {
                accToContacts.put(c.AccountId, new List<Contact>());
            }
            accToContacts.get(c.AccountId).add(c);
        }

        List<Contact> contactsToInsert = new List<Contact>();

        for (Account acc : accounts) {
            List<Contact> contacts = accToContacts.get(acc.Id);
            if (contacts == null || contacts.isEmpty()) {
                contactsToInsert.add(new Contact(
                    FirstName = 'Auto',
                    LastName = acc.Name,
                    AccountId = acc.Id
                ));
            } else if (contacts.size() > 1) {
                errorLogs.add('Account ' + acc.Id + ' has ' + contacts.size() + ' contacts.');
            }
        }

        if (!contactsToInsert.isEmpty()) insert contactsToInsert;
    }

    global void finish(Database.BatchableContext BC) {
        
    }

}