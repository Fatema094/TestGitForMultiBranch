public class TriggerPracticeHandler {

    
    Public static void beforeInsert(List<Account> accounts){
        System.debug('Test====='+accounts);
        for(Account acc : accounts){
            if(acc.Industry != null && acc.Industry =='Media'){
              acc.Rating = 'Hot  ';  
            }
            
        }
    }
    
    public static void createRelatedOpp(List<Account> accounts){
        List<Opportunity> oppToBeInsert = new List<Opportunity>();
        for(Account acc : accounts){
            Opportunity opp = new Opportunity();
            opp.Name = acc.Name;
            opp.AccountId = acc.Id;
            opp.StageName = 'Prospecting'; 
        	opp.CloseDate = Date.today();
            oppToBeInsert.add(opp);
            
        }
        if(!oppToBeInsert.isEmpty()){
            insert oppToBeInsert;
        }
    }
    
    public static void updateAssociateContact(List<Account>updatedAccount, Map<Id, Account> accounts){
       // public static void updateAssociateContact(List<Account>updatedAccount){
        List <Contact> updatedContact = new List<Contact>();
        for(Account acc : updatedAccount){
            Account oldAcc = accounts.get(acc.Id);
            if(acc.Type != oldAcc.Type){
                List<Contact> contacts = [SELECT Id, Department FROM Contact WHERE AccountId = :acc.Id];
                for (Contact con : contacts) {
                    con.Department = acc.Type;
                    updatedContact.add(con);
                }
            }
            
        }
         if (!updatedContact.isEmpty()) {
            update updatedContact;
        }
        
    }
}