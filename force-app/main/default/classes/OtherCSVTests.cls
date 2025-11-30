@isTest
public with sharing class OtherCSVTests {

    @TestSetup
    static void setupAccounts() {
       
        List<Account> accounts = Test.loadData(Account.SObjectType, 'otherAccountData');
       
    }

    @isTest
    static void testLoadOtherAccountsFromStaticResource() {
        
        Test.startTest();
        List<Account> acc = [Select Id from Account];
        System.debug('Load account: ' + acc.size());
        Test.stopTest();
        
        Assert.isTrue(acc.size()==15);
        //Integer count = [SELECT COUNT() FROM Account];
        //System.assertEquals(15, count, 'Expected 15 Accounts loaded from static resource');
    }
}