trigger invAccountTrigger on Account (before insert,before update, after insert, after update) {
if(trigger.isBefore && (trigger.isUpdate||trigger.isInsert)){
       
        for(Account acc : trigger.new){
              acc.From_Trigger__c = acc.Name;
        }
 }
    
     
}