public class TeamController {
    @AuraEnabled
    public static Id insertTeam(String playerName, String countryName, String position, String category) {
        // Get the basic salary from custom setting
        Basic_Salary__c setting = Basic_Salary__c.getOrgDefaults();
        Decimal basicSalary = setting != null ? setting.Basic_Salary__c : 0;

        Decimal multiplier = 1;

        switch on category {
            when 'A' { multiplier = 1.9; }
            when 'B' { multiplier = 1.5; }
            when 'C' { multiplier = 1.2; }
            when else { multiplier = 1.0; }
        }

        Decimal individualSalary = basicSalary * multiplier;

        Team__c newTeam = new Team__c(
            Player_Name__c = playerName,
            Country_Name__c = countryName,
            Position__c = position,
            Category__c = category,
            Individual_Salary__c = individualSalary
        );

        insert newTeam;
        return newTeam.Id;
    }
}