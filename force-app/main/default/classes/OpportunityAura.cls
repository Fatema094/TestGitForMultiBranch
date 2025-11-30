public class OpportunityAura {

    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAccounts() {
        return [
            SELECT Id, Name,CloseDate,Amount
            FROM Opportunity
            LIMIT 10
        ];
    }
}