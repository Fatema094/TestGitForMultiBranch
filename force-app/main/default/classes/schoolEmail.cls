public class schoolEmail {
    
 

  @InvocableMethod(label= 'Students')
    public static void populateStudentEmails(List<StudentNew__c> students) {
        for (StudentNew__c student : students) {
            if (student.Name__c != null) {
                String email =  student.Name__c.trim().toLowerCase() + '@example.com';
 
            }
    

}
        update students;
    }
}