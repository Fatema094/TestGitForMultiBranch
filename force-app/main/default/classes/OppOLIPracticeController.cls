public with sharing class OppOLIPracticeController {
     @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getOpportunityLineItems(Id oppId) {
        return [
            SELECT Id, 
                   OpportunityId, 
                   Quantity, 
                   UnitPrice, 
                   TotalPrice, 
                   PricebookEntry.Product2.Name 
            FROM OpportunityLineItem
            WHERE OpportunityId = :oppId
        ];
    }

    @AuraEnabled
    public static void deleteLineItem(Id recordId) {
        delete [SELECT Id FROM OpportunityLineItem WHERE Id = :recordId];
    }
}