public with sharing class PracticeFlowToApex {
    public class Request {
        @InvocableVariable(required=true)
        public Id accountId;
    }

    @InvocableMethod(label='Update Account Type to Prospect' description='Updates the Account Type to Prospect')
    public static void UpdateType(List<Request> requests) {
        List<Account> accountToUpdate = new List<Account>();
        
        for (Request req : requests) {
            if (req.accountId != null) {
                Account acc = new Account();
                acc.Id = req.accountId;
                acc.Type = 'Prospect';
                accountToUpdate.add(acc);
            }
        }

        if (!accountToUpdate.isEmpty()) {
            update accountToUpdate;
        }
    }
}