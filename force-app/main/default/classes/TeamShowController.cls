public with sharing class TeamShowController {
     @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeams() {
        return [
            SELECT Id, Player_Name__c, Country_Name__c, Position__c, Category__c, Individual_Salary__c
            FROM Team__c
           ORDER BY Name Limit 10
        ];
    }
    }