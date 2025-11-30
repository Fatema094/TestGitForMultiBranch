public class ContactTriggerHandler {

    
    public static void updateAccountRatting(List<Contact> contacts){
        
        Set<Id> accountIds = new Set<Id>();// we used set to avoid duplicates
        for(Contact con : contacts){
            if(con.AccountId != null){
                accountIds.add(con.AccountId);
            }
        }
        
        
        List<Account> accountToUpdate = new List<Account>();
        for(Id accId : accountIds){
            //SELECT Id,Rating FROM Account WHERE Id=:accId
            Account acc = new Account(Id = accId);
            acc.Rating = 'cold';
            accountToUpdate.add(acc);
        }
        if(!accountToUpdate.isEmpty()){
            update accountToUpdate;
        }
    
    
    List<Contact> AfterUpdateCon = new List<Contact>();
    for(Contact c : contacts){
        if(c.Description == Null){
            Contact cc = new Contact(Id = c.Id);
           cc.Description = 'New2'; 
            AfterUpdateCon.add(cc);
        }
    }
        if(!AfterUpdateCon.isEmpty()){
            update AfterUpdateCon;
        }
}
}