public class LeadProcessor implements Database.Batchable<SObject> {

    // Start method - Query all Leads
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, LeadSource FROM Lead');
    }

    // Execute method - Update LeadSource to 'Dreamforce'
    public void execute(Database.BatchableContext bc, List<Lead> scope) {
        for (Lead l : scope) {
            l.LeadSource = 'Dreamforce';
        }
        update scope;
    }

    // Finish method - Optional
    public void finish(Database.BatchableContext bc) {
        // You can add post-processing logic here if needed
    }
}