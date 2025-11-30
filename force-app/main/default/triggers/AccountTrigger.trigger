trigger AccountTrigger on Account (after insert, after update, before update) {

    if (Trigger.isAfter) {
        if (Trigger.isInsert) {
            AccountTriggerHandler.createChildContacts(Trigger.new);
        }

        if (Trigger.isUpdate) {
            AccountTriggerHandler.syncContactNames(Trigger.new, Trigger.oldMap);

            Set<Id> setAccIds = new Set<Id>();
            for (Account acc : Trigger.new) {
                Account oldAcc = Trigger.oldMap.get(acc.Id);
                if (acc.Rating != oldAcc.Rating) {
                    setAccIds.add(acc.Id);
                }
            }

            if (!setAccIds.isEmpty()) {
                // Fetch Account Ratings
                Map<Id, Account> accMap = new Map<Id, Account>([ SELECT Id, Rating FROM Account WHERE Id IN :setAccIds ]);

                // Fetch Opportunities related to those accounts
                List<Opportunity> listOpps = [SELECT Id, Name, AccountId, Description FROM Opportunity WHERE AccountId IN :setAccIds];

                List<Opportunity> listOpp2Update = new List<Opportunity>();

                for (Opportunity opp : listOpps) {
                    Account relatedAcc = accMap.get(opp.AccountId);
                    if (relatedAcc != null) {
                        opp.Description = 'Account Rating changed to: ' + relatedAcc.Rating;
                        listOpp2Update.add(opp);
                    }
                }

                if (!listOpp2Update.isEmpty()) {
                    update listOpp2Update;
                }
            }
        }
    }

    if (Trigger.isBefore) {
        if (Trigger.isUpdate) {
            for (Account acc : Trigger.new) {
                Account oldAcc = Trigger.oldMap.get(acc.Id);
                if (acc.Rating != oldAcc.Rating) {
                    // Optional: enforce or copy old value
                    // acc.addError('You cannot update this account’s rating');
                    acc.Status__c = oldAcc.Rating;
                }
            }
        }
    }
}