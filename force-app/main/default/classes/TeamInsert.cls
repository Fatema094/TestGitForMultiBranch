public class TeamInsert {

    public class PlayerWrapper {
        @InvocableVariable(label='Player Name' required=true)
        public String playerName;

        @InvocableVariable(label='Country Name' required=true)
        public String countryName;

        @InvocableVariable(label='Position' required=true)
        public String position;

        @InvocableVariable(label='Category' required=true)
        public String category;
    }

    public class TeamOutputWrapper {
        @InvocableVariable(label='Team Id')
        public Id teamId;

        @InvocableVariable(label='Player Name')
        public String playerName;
    }

    @InvocableMethod(label='Create Player from Flow' description='Creates Team__c records and returns them')
    public static List<TeamOutputWrapper> createPlayerRecords(List<PlayerWrapper> playerDataList) {
        List<Team__c> playersToInsert = new List<Team__c>();
        
          Basic_Salary__c setting = Basic_Salary__c.getOrgDefaults(); // Only if it's Hierarchy
    Decimal basicSalary = (setting != null && setting.Basic_Salary__c != null) ? setting.Basic_Salary__c : 0;
        
        for (PlayerWrapper data : playerDataList) {
            
            
            
            Decimal multiplier = 0;
            
            if(data.category == 'A'){
                multiplier = basicSalary * 1.9;
            } else if(data.category == 'B'){
                multiplier = basicSalary * 1.5;
            } else if(data.category == 'C'){
                multiplier = basicSalary * 1.2;
            } else if(data.category == 'D'){
                multiplier = basicSalary * 1;
            }
            
            
            
            
            Team__c newPlayer = new Team__c();
            newPlayer.Player_Name__c = data.playerName;
            newPlayer.Country_Name__c = data.countryName;
            newPlayer.Position__c = data.position;
            newPlayer.Category__c = data.category;
            newPlayer.Individual_Salary__c = multiplier;

            playersToInsert.add(newPlayer);
        }


        
        if (!playersToInsert.isEmpty()) {
            insert playersToInsert;
        }

        List<TeamOutputWrapper> output = new List<TeamOutputWrapper>();
        for (Team__c insertedPlayer : playersToInsert) {
            TeamOutputWrapper wrapper = new TeamOutputWrapper();
            wrapper.teamId = insertedPlayer.Id;
            wrapper.playerName = insertedPlayer.Player_Name__c;
            output.add(wrapper);
        }

        return output;
    }
}