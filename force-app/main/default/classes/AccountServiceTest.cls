@IsTest
private class AccountServiceTest {
    @IsTest
    static void testCreateAccount() {
        // Arrange
        String testName = 'Test Account';
        String testNumber = 'ACC-001';
        String testTicker = 'TST';

        // Act
        AccountService service = new AccountService();
        Account acc = service.createAccount(testName, testNumber, testTicker);

        // Assert
        System.assertNotEquals(null, acc, 'Returned account should not be null');
        System.assertEquals(testName, acc.Name, 'Account name should match');
        System.assertEquals(testNumber, acc.AccountNumber, 'Account number should match');
        System.assertEquals(testTicker, acc.TickerSymbol, 'Ticker symbol should match');
    }
}