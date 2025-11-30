public with sharing class TeamListController {
    
    @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeams() {
        return [
            SELECT Id, Player_Name__c, Country_Name__c, Position__c, Category__c, Individual_Salary__c
            FROM Team__c
            ORDER BY Name LIMIT 10
        ];
    }

   @AuraEnabled(cacheable=true)
public static List<Team__c> getTeamsByName(String playerName) {
    return [
        SELECT Id, Player_Name__c, Country_Name__c, Position__c, Category__c, Individual_Salary__c
        FROM Team__c
        WHERE Player_Name__c LIKE :('%' + playerName + '%')
    ];
}


    @AuraEnabled
public static Team__c getTeamById(Id recordId) {
    return [
        SELECT Id, Player_Name__c, Country_Name__c, Position__c, Category__c, Individual_Salary__c
        FROM Team__c
        WHERE Id = :recordId
        LIMIT 1
    ];
}

}