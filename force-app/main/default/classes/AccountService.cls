public with sharing class AccountService {
    public AccountService() {
        // Empty constructor or initialization logic
    }

    public Account createAccount(String accountName, String accountNumber, String tickerSymbol) {
        Account newAcct = new Account(
            Name = accountName,
            AccountNumber = accountNumber,
            TickerSymbol = tickerSymbol
        );
        return newAcct;
    }
}