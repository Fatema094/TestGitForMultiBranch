public class ApexBatch implements Database.Batchable<sObject> {

    
     public Database.QueryLocator start(Database.BatchableContext bc) {
        // collect the batches of records or objects to be passed to execute
         return Database.getQueryLocator('SELECT Name FROM Account');
    }
    public void execute(Database.BatchableContext bc, List<Account> scope){
        // process each batch of records
        List<Account> acc = (List<Account>)scope;
        system.debug('Print account Name');
        for(Account a : acc){
            System.debug('Accoint Name: ' + a.Name);
        }
    }
    public void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }
}