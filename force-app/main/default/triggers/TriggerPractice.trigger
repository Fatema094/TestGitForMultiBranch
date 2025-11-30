trigger TriggerPractice on Account (before insert, after insert, after update) {
    
    if(Trigger.isInsert){
        if(Trigger.isBefore){
         TriggerPracticeHandler.beforeInsert(Trigger.New);
            
    }else if(Trigger.isAfter){
        TriggerPracticeHandler.createRelatedOpp(Trigger.New);
    }
        
    }else if(Trigger.isUpdate){
        TriggerPracticeHandler.updateAssociateContact(Trigger.new, Trigger.oldMap);
         //TriggerPracticeHandler.updateAssociateContact(Trigger.new);
    }
    
   

}