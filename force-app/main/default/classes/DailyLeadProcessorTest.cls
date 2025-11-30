@isTest
private class DailyLeadProcessorTest {

    @isTest
    static void testScheduledLeadUpdate() {
        // Insert 200 leads with no LeadSource
        List<Lead> leads = new List<Lead>();
        for (Integer i = 0; i < 200; i++) {
            leads.add(new Lead(FirstName = 'Test', LastName = 'Lead' + i, Company = 'TestCo'));
        }
        insert leads;

        // Schedule the class to run 1 minute from now
        String cronExp = '0 0 0 1 1 ? 2050'; // Far future to avoid actual schedule
        Test.startTest();
        String jobId = System.schedule('Test DailyLeadProcessor', cronExp, new DailyLeadProcessor());
        Test.stopTest(); // Executes the scheduled job

        // Assert all leads now have LeadSource = 'Dreamforce'
        Integer countUpdated = [SELECT COUNT() FROM Lead WHERE LeadSource = 'Dreamforce'];
        System.assertEquals(200, countUpdated);
    }
}