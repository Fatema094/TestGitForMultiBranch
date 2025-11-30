public class AccountEmailSenderController {
    public AccountEmailSenderController(ApexPages.StandardController stdController) {
        Id accId = stdController.getId();
        Account acc = [SELECT Id, Name FROM Account WHERE Id = :accId LIMIT 1];

        // Get contact with email
        Contact con = [SELECT Id, Email, LastName FROM Contact WHERE AccountId = :accId AND Email != null LIMIT 1];

        // Create PDF
        PageReference pdfPage = Page.AccountSummary;
        pdfPage.getParameters().put('id', acc.Id);
        Blob pdfBlob = pdfPage.getContentAsPDF(); // ✅ This is allowed here

        // Email setup
        Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
        attachment.setFileName('AccountSummary.pdf');
        attachment.setBody(pdfBlob);
        attachment.setContentType('application/pdf');

        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[] { con.Email });
        email.setSubject('Account Summary for ' + acc.Name);
        email.setPlainTextBody('Dear ' + con.LastName + ',\n\nPlease find the attached Account Summary PDF.\n\nRegards,');
        email.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment });

        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });

        if (results[0].isSuccess()) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM, 'Email sent.'));
        } else {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Email failed: ' + results[0].getErrors()[0].getMessage()));
        }
    }
}