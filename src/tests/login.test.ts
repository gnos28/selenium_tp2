import { Builder, WebDriver } from 'selenium-webdriver';
import { createLoginPage } from '../pages/LoginPage';
import * as chrome from 'selenium-webdriver/chrome';

// Set timeout to 30s for Selenium
jest.setTimeout(30000);

describe('Login Page (Functional)', () => {
    let driver: WebDriver;
    // Type inference works, but we can explicitly type if needed. 
    // Return type of createLoginPage is inferred.
    let loginPage: ReturnType<typeof createLoginPage>;

    beforeAll(async () => {
        const options = new chrome.Options();
        // options.addArguments('--headless'); 

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            
        loginPage = createLoginPage(driver);
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Doit se connecter avec les bons identifiants', async () => {
        // 1. Arrange & Act (via Factory POM)
        await loginPage.navigate();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        // 2. Assert
        const message = await loginPage.getFlashMessageText();
        expect(message).toContain('You logged into a secure area');
    });
});
