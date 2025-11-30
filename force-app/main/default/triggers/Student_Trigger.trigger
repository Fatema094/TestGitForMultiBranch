trigger Student_Trigger on Student__c (before insert, before update, after insert, after update) {
        if(Trigger.isBefore){
            System.debug('In Before =='+Trigger.new[0].Name);
            
            if(Trigger.isInsert || Trigger.isUpdate){
                if(Trigger.new[0].Gender__c != null && Trigger.new[0].Gender__c == 'Male'){
                    Trigger.new[0].Name = 'Mr. '+Trigger.new[0].Name;
                }else if(Trigger.new[0].Gender__c != null && Trigger.new[0].Gender__c == 'Female'){
                    Trigger.new[0].Name = 'Mrs. '+Trigger.new[0].Name;
                }
            }
        }  
        
        if(Trigger.isAfter){
            System.debug('In After =='+Trigger.new[0].Name);
        }
}