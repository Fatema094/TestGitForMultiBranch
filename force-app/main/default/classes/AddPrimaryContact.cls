public class AddPrimaryContact implements Queueable {

    private Contact templateContact;
    private String billingState;

    // Constructor
    public AddPrimaryContact(Contact contactTemplate, String state) {
        this.templateContact = contactTemplate;
        this.billingState = state;
    }

    public void execute(QueueableContext context) {
        // Query max 200 Accounts with matching BillingState
        List<Account> accounts = [
            SELECT Id FROM Account
            WHERE BillingState = :billingState
            LIMIT 200
        ];

        List<Contact> contactsToInsert = new List<Contact>();

        for (Account acc : accounts) {
            // Clone the template contact
            Contact newContact = templateContact.clone(false, true, false, false);
            newContact.AccountId = acc.Id;
            contactsToInsert.add(newContact);
        }

        if (!contactsToInsert.isEmpty()) {
            insert contactsToInsert;
        }
    }
}