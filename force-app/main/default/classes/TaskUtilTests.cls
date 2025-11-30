@isTest
public with sharing class TaskUtilTests {

    @isTest
    static void testGetTaskPriorityNormal() {
        Test.startTest();
        String result1 = TaskUtil.getTaskPriority('TX');
        String result2 = TaskUtil.getTaskPriority('NY');
        Test.stopTest();

        System.assertEquals('Normal', result1, 'Expected Normal for TX');
        System.assertEquals('Normal', result2, 'Expected Normal for NY');
    }

    @isTest
    static void testGetTaskPriorityHigh() {
        Test.startTest();
        String result = TaskUtil.getTaskPriority('CA');
        Test.stopTest();

        System.assertEquals('High', result, 'Expected High for CA');
    }

    @isTest
    static void testGetTaskPriorityNullOrEmpty() {
        Test.startTest();
        String result1 = TaskUtil.getTaskPriority(null);
        String result2 = TaskUtil.getTaskPriority('');
        Test.stopTest();

        System.assertEquals(null, result1, 'Expected null for null state');
        System.assertEquals(null, result2, 'Expected null for empty state');
    }
}