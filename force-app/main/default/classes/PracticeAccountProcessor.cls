public class PracticeAccountProcessor {
    @future
    
    public static void countContact(List<Id> accounts){
        
        Map<Id, Integer> contactCountMap = new Map<Id, Integer>();
        List<AggregateResult> countCon = [SELECT AccountId, COUNT(Id) total from Contact Where AccountId IN : accounts Group By AccountId];
        
        for(AggregateResult result : countCon ){
            contactCountMap.put((Id)result.get('AccountId'),(Integer)result.get('total'));
        }
        
        
        List<Account> accountIds = new List<Account>();
            for(Id accId : accounts){
                
                Integer count = contactCountMap.containsKey(accId)?contactCountMap.get(accId):0;
                
                Account acc = new Account();
                acc.Id = accId;
                acc.Number_Of_Contacts__c = count;
                accountIds.add(acc);
            }
        if(!accountIds.isEmpty()){
            update accountIds;
        }
    }

}