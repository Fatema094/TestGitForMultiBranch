trigger ContactTrigger on Contact (after insert, after update) {

    
    if(Trigger.isAfter){
        
        ContactTriggerHandler.updateAccountRatting(Trigger.new);
    }
}