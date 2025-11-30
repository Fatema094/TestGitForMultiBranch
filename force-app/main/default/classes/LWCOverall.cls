public class LWCOverall {
//  @AuraEnabled(cacheable=true)
//     public static List<Account> getAccounts() {
//         return [SELECT Id, Name, Owner.Name, Owner.Email FROM Account LIMIT 10];
//     }
        @AuraEnabled
        public static string saveAccounts(String selectedName,String selectedType,String selectedOwner, String selectedMBA, String selectedDate){
        

            Account acc = new Account();
            acc.Name = selectedName;
            acc.Type = selectedType;
            acc.OwnerId = selectedOwner;
            acc.Match_Billing_Address__c = Boolean.valueOf(selectedMBA);
            acc.Support_Plan_Expiration_Date__c = Date.valueOf(selectedDate);
            insert acc;

            return acc.Id;
            //return 'test';
        }
    }