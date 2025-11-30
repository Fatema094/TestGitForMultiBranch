@isTest
public class LeadProcessorTest {

    @isTest
    static void testLeadProcessorBatch() {
        // Insert 200 test Lead records
        List<Lead> leadsToInsert = new List<Lead>();
        for (Integer i = 1; i <= 200; i++) {
            leadsToInsert.add(new Lead(
                FirstName = 'TestFirst' + i,
                LastName = 'TestLast' + i,
                Company = 'TestCompany' + i
            ));
        }
        insert leadsToInsert;

        // Run the batch
        Test.startTest();
        LeadProcessor lp = new LeadProcessor();
        Database.executeBatch(lp);
        Test.stopTest();

        // Verify that all Leads have LeadSource = 'Dreamforce'
        List<Lead> updatedLeads = [SELECT Id, LeadSource FROM Lead];
        for (Lead l : updatedLeads) {
            System.assertEquals('Dreamforce', l.LeadSource, 'LeadSource should be Dreamforce');
        }
    }
}