({
	fetchOppHelper : function() {
		
         component.set("v.columns", [
            { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
            
            { label: 'Close Date', fieldName: 'CloseDate', type: 'text' },
            { label: 'Amount', fieldName: 'Amount', type: 'currency' }
        ]);
        
        
        var action = component.get("c.fetchOpportunity");
        action.setParams({
            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state = "success"){
                component.set("v.lstOpportunity",response.getReturnValue());
            }else{
                alert("An error occurred");
            }
        });
        $A.enqueueAction(action);
        
        
	}
})