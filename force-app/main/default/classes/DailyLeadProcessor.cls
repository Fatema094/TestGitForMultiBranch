public class DailyLeadProcessor implements Schedulable {
    public void execute(SchedulableContext sc) {
        // Query first 200 Leads where LeadSource is null
        List<Lead> leadsToUpdate = [
            SELECT Id, LeadSource
            FROM Lead
            WHERE LeadSource = null
            LIMIT 200
        ];

        // Update LeadSource to 'Dreamforce'
        for (Lead l : leadsToUpdate) {
            l.LeadSource = 'Dreamforce';
        }

        if (!leadsToUpdate.isEmpty()) {
            update leadsToUpdate;
        }
    }
}