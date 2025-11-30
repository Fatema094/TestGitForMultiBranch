({
	doInit : function(component, event, helper) {
        
      component.set("v.columns", [
            { label: 'Account Name', fieldName: 'Name', type: 'text' },
            { label: 'Status', fieldName: 'Status', type: 'text' },
            
            { label: 'Account Owner', fieldName: 'OwnerName', type: 'text' }
        ]);

        // Fetch data
        let action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let accounts = response.getReturnValue();
                let formatted = accounts.map(acc => ({
                    Id: acc.Id,
                    Name: acc.Name,
                    Status: acc.CleanStatus,
                    
                    OwnerName: acc.Owner ? acc.Owner.Name : ''
                }));
                component.set("v.accounts", formatted);
            } else {
                console.error("Error fetching accounts:", response.getError());
            }
        });

        $A.enqueueAction(action);
    }
})