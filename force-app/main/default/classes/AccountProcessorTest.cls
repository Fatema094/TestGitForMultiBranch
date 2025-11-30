@isTest
private class AccountProcessorTest {
    @isTest
    static void testCountContacts() {
        // Create an Account
        Account acc = new Account(Name = 'Test Account');
        insert acc;

        // Create 3 Contacts related to the Account
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 3; i++) {
            contacts.add(new Contact(LastName = 'Contact ' + i, AccountId = acc.Id));
        }
        insert contacts;

        // Call the future method
        Test.startTest();
        AccountProcessor.countContacts(new List<Id>{ acc.Id });
        Test.stopTest(); // Ensures future method finishes

        // Retrieve the updated Account
        Account updatedAcc = [SELECT Id, Number_Of_Contacts__c FROM Account WHERE Id = :acc.Id];

        // Assert the number of contacts
        System.assertEquals(3, updatedAcc.Number_Of_Contacts__c);
    }
}