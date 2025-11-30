public class AccountSummaryController {
    public List<Opportunity> opportunities { get; set; }
     //public String renderMode { get; set; }


    private Account account;
    

    public AccountSummaryController(ApexPages.StandardController stdController) {
        this.account = (Account) stdController.getRecord();
         // renderMode = ApexPages.currentPage().getParameters().get('format') == 'pdf' ? 'pdf' : null;
        // continue with data loading logic...
        
        // Query full account info
        this.account = [SELECT Id, Name, Industry, Type FROM Account WHERE Id = :account.Id LIMIT 1];
        
        // Query related opportunities
        opportunities = [
            SELECT Id, Name, StageName, Amount, CloseDate
            FROM Opportunity
            WHERE AccountId = :account.Id
            ORDER BY CloseDate DESC
       ];    
    }
    
    public PageReference sendEmail() {
         // Get a related Contact (with email)
         List<Contact> contactList = [
            SELECT Id, Email, LastName
            FROM Contact
            WHERE AccountId = :account.Id AND Email != null
            LIMIT 1
        ];
        
        system.debug('=== Contact ===='+contactList);
		
        if (!contactList.isEmpty()) {
            Contact con = contactList[0];

            // Render the PDF from Visualforce
            PageReference pdfPage = Page.AccountSummary;
            pdfPage.getParameters().put('id', account.Id);
            Blob pdfBlob = pdfPage.getContentAsPDF();
    		
            // Create Email Attachment
            Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
            attachment.setFileName('AccountSummary.pdf');
            attachment.setBody(pdfBlob);
            attachment.setContentType('application/pdf');
    
            // Set up the email
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(new String[] { con.Email });
            email.setSubject('Account Summary for ' + account.Name);
            email.setPlainTextBody('Dear ' + con.LastName + ',\n\nPlease find the attached Account Summary PDF.\n\nThank you!');
            email.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment });
    
            // Send the email
            //Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
                
                
            Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
                
            if (results != null && results[0].isSuccess()) {
                 System.debug(' Email sent successfully.======');
            } else {
                 System.debug(' Failed to send email: ======' + results[0].getErrors()[0].getMessage());
            }
			
        }
		
            
        return null;
    }
}