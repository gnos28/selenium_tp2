import { Builder, WebDriver, Capabilities } from 'selenium-webdriver';
import { LoginPage } from '../pages/LoginPage';
import * as chrome from 'selenium-webdriver/chrome';

// Set timeout to 30s for Selenium
jest.setTimeout(30000);

describe('Login Page', () => {
    let driver: WebDriver;
    let loginPage: LoginPage;

    beforeAll(async () => {
        // Setup Chrome options (headless if needed, but usually visible for students)
        // For this environment (headless linux), we likely need headless.
        const options = new chrome.Options();
        
        // Check if we are in a CI/Headless environment. 
        // For the user's local machine, they might want to see it, but I'll add arguments just in case.
        // options.addArguments('--headless'); 
        // options.addArguments('--disable-gpu');
        // options.addArguments('--no-sandbox');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            
        loginPage = new LoginPage(driver);
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Doit se connecter avec les bons identifiants', async () => {
        // 1. Arrange & Act (via POM)
        await loginPage.navigate();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        // 2. Assert
        const message = await loginPage.getFlashMessageText();
        expect(message).toContain('You logged into a secure area');
    });
});
