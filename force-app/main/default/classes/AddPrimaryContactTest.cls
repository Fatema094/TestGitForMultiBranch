@isTest
private class AddPrimaryContactTest {

    @isTest
    static void testAddPrimaryContactForCA() {
        // Create 50 Accounts for CA and 50 for NY
        List<Account> accounts = new List<Account>();

        for (Integer i = 0; i < 50; i++) {
            accounts.add(new Account(Name = 'CA Account ' + i, BillingState = 'CA'));
            accounts.add(new Account(Name = 'NY Account ' + i, BillingState = 'NY'));
        }

        insert accounts;

        // Create the Contact template
        Contact contactTemplate = new Contact(FirstName = 'Primary', LastName = 'Contact');

        // Enqueue the Queueable job
        Test.startTest();
        AddPrimaryContact job = new AddPrimaryContact(contactTemplate, 'CA');
        System.enqueueJob(job);
        Test.stopTest();

        // Assert that 50 Contacts were inserted for CA Accounts
        List<Contact> insertedContacts = [
            SELECT Id, Account.BillingState
            FROM Contact
            WHERE FirstName = 'Primary' AND LastName = 'Contact'
        ];

        System.assertEquals(50, insertedContacts.size(), '50 contacts should be created for CA accounts only');

        // Optional: assert BillingState of each related Account
        for (Contact c : insertedContacts) {
            System.assertEquals('CA', c.Account.BillingState);
        }
    }
}