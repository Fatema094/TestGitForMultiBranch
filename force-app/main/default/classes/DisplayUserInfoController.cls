public class DisplayUserInfoController {
    public String firstName { get; private set; }

    public DisplayUserInfoController() {
        firstName = [SELECT FirstName FROM User WHERE Id = :UserInfo.getUserId()].FirstName;
    }
}