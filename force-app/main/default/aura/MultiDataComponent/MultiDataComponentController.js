({
	doInit : function(component, event, helper) {
       
		
        component.set("v.accountColumns", [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Account Status', fieldName: 'Status', type: 'text' },
            
            { label: 'Owner', fieldName: 'OwnerName', type: 'text' }
        ]);

        component.set("v.contactColumns", [
            { label: 'Name', fieldName: 'FullName', type: 'text' },
            { label: 'Email', fieldName: 'Email', type: 'email' },
            { label: 'Phone', fieldName: 'Phone', type: 'phone' },
            { label: 'Account', fieldName: 'AccountName', type: 'text' }
        ]);

        component.set("v.opportunityColumns", [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Stage', fieldName: 'StageName', type: 'text' },
            { label: 'Account', fieldName: 'AccountName', type: 'text' }
        ]);
        
        component.set("v.connectionColumns", [
            { label: 'Account', fieldName: 'Account', type: 'text' },
            { label: 'Contact', fieldName: 'Contact', type: 'text' },
            { label: 'Opportunity', fieldName: 'Opportunity', type: 'text' }
        ]);
        
 


        // Fetch data
        const action = component.get("c.getAllData");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                const result = response.getReturnValue();
                console.log("Contacts loaded: ", result.contacts);
                
                // Format each list for display
                const accounts = result.accounts.map(a => ({
                    Id: a.Id,
                    Name: a.Name,
                    Status: a.Status__c,
                    
                    OwnerName: a.Owner ? a.Owner.Name : ''
                }));

                const contacts = result.contacts.map(c => ({
                    Id: c.Id,
                    FullName: `${c.FirstName} ${c.LastName}`,
                    Email: c.Email,
                    Phone: c.Phone,
                    AccountName: c.Account ? c.Account.Name : ''
                }));

                const opportunities = result.opportunities.map(o => ({
                    Id: o.Id,
                    Name: o.Name,
                    StageName: o.StageName,
                    AccountName: o.Account ? o.Account.Name : ''
                }));
                
                const connections = result.connections.map(con => ({
                    Id: con.Id,
                    Account: con.Account__c ? con.Account__r.Name : '',
                    Contact: con.Contact__c ? con.Contact__r.LastName : '',
                    Opportunity: con.Opportunity__c ? con.Opportunity__r.Name : ''
                   
                }));


                component.set("v.accounts", accounts);
                component.set("v.contacts", contacts);
                component.set("v.opportunities", opportunities);
                component.set("v.connections", connections);
            } else {
                console.error("Error:", response.getError());
            }
        });

        $A.enqueueAction(action);
    },
    
    
     openModal: function(component, event, helper) {
        component.set("v.showModal", true);
    },

    closeModal: function(component, event, helper) {
        component.set("v.showModal", false);
    },

    
    
     onContactChange : function(component, event) {
        var contactId = event.getParam("value")[0];
        
                  console.log('contactId ====',contactId);
         
       component.set("v.selectedContactId",contactId);
       
         var action = component.get("c.getAssociatedAccount");
         action.setParams({
            "contactId": contactId // 'contactId' matches the parameter name in  Apex method
         })
         
        action.setCallback(this, function(response) {
            
            console.log('getReturnValue()===',response.getReturnValue());
            var state = response.getState(); 
            if (state === "SUCCESS") {
                // Get the return value from Apex
                var result = response.getReturnValue();
                component.set("v.associatedAccountName",result);
           

            } else if (state === "ERROR") {
               
                var errors = response.getError();
                var errorMessage = "Unknown error occurred while fetching related records.";
            }

           
        });
        $A.enqueueAction(action);
    },
    
    
    
     onOpportunityChange : function(component, event) {
        var opportunityId = event.getParam("value")[0];
        
          console.log('opptId ====',opportunityId);
        
       
         var action = component.get("c.getOpportunity");
         action.setParams({
            "opportunityId": opportunityId // 'contactId' matches the parameter name in  Apex method
         })
         
        action.setCallback(this, function(response) {
            
            console.log('getReturnValue()===',response.getReturnValue());
            var state = response.getState(); 
            if (state === "SUCCESS") {
                //  Get the return value from Apex
                var result = response.getReturnValue();
                component.set("v.opportunityId",opportunityId);
                component.set("v.opportunityName",result.Name);
               
            } else if (state === "ERROR") {
               
                var errors = response.getError();
                var errorMessage = "Unknown error occurred while fetching related records.";
            }

           
        });
        $A.enqueueAction(action);
    },

   
   saveConnection: function(component, event, helper) {
     
        const contact = component.get("v.selectedContactId");
        const account = component.get("v.associatedAccountName");
        const opportunity = component.get("v.opportunityId");
    const opportunityName = component.get("v.opportunityName");

    console.log("Saving Opportunity ID:", opportunity);
    console.log("Saving Opportunity Name:", opportunityName);
       
        console.log("Saving for Contact ID:", contact);
       console.log("Saving for account ID:", account);
    

        const action = component.get("c.saveConnectionToServer");
        action.setParams({
            contact: contact,
            account: account,
            opportunity: opportunity
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {save
                alert("Connection saved successfully!");
                                       console.log("In success message");
                component.set("v.showModal", false);
            } else {
                console.error("Failed to save:", response.getError());
                alert("Error saving connection.");
            }
        });

        $A.enqueueAction(action);
    }

  
	
})