trigger ClosedOpportunityTrigger on Opportunity (after insert, after update) {
 List<Task> tasksToCreate = new List<Task>();

    for (Opportunity opp : Trigger.new) {
        // Check if the stage is 'Closed Won'
        if (opp.StageName == 'Closed Won') {
            // For after update, ensure the stage was not previously 'Closed Won' to avoid duplicate tasks
            if (Trigger.isInsert || 
                (Trigger.isUpdate && Trigger.oldMap.get(opp.Id).StageName != 'Closed Won')) {
                
                Task followUpTask = new Task(
                    Subject = 'Follow Up Test Task',
                    WhatId = opp.Id
                );
                tasksToCreate.add(followUpTask);
            }
        }
    }

    if (!tasksToCreate.isEmpty()) {
        insert tasksToCreate;
    }
}