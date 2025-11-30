public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, StageName,Account.Name FROM Opportunity LIMIT 10];
    }
    @AuraEnabled(cacheable=true)
    public static Account getAccounts(String accountName) {
        return [SELECT Id, Name FROM Account where Name =:accountName LIMIT 10];
    }

    @AuraEnabled
    public static List<Opportunity> saveOpportunities(String opportunities) {
        System.debug('Received Opportunities JSON: ' + opportunities);
        List<OpportunityWrapper> opportunityList = (List<OpportunityWrapper>)JSON.deserialize(opportunities, List<OpportunityWrapper>.class);
        
        List<Opportunity> oppsToInsert = new List<Opportunity>();

        for (OpportunityWrapper wrap : opportunityList) {
            Opportunity opp = new Opportunity();
            opp.Name = wrap.Name;
            opp.AccountId = wrap.AccountId;
            opp.StageName = wrap.StageName;
            opp.CloseDate = Date.today().addDays(30);
            System.debug('In the apex') ;// Required field
            // if (wrap.AccountId != null && wrap.AccountId != '') {
                   // opp.AccountId = wrap.AccountId; // Directly assign the Id
               // }
        
            oppsToInsert.add(opp);
           
        }
        System.debug('In the apex22222') ;
        if(!oppsToInsert.isEmpty()){
            insert oppsToInsert;
        }
        System.debug('list===='+oppsToInsert);
      
            return oppsToInsert;  
            // return [
            //             SELECT Id, Name, StageName, AccountId, Account.Name
            //             FROM Opportunity
            //             WHERE Id IN :oppsToInsert
            //         ];  
    }


    public class OpportunityWrapper {
        public String Name;
        public String StageName;
        public String AccountId;
    }
}