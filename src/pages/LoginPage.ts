import { By, WebDriver } from 'selenium-webdriver';

// Pure data for selectors
const SELECTORS = {
    username: By.id('username'),
    password: By.id('password'),
    spam: By.id('spam'),
    loginButton: By.id('login-button'),
    flashMessage: By.id('flash'),
};


// Factory function instead of Class
export const createLoginPage = (driver: WebDriver) => ({
    navigate: async (): Promise<void> => {
        await driver.get('http://localhost:5173');
    },

    login: async (user: string, pass: string): Promise<void> => {
        const { username, password, spam, loginButton } = SELECTORS;
        
        await driver.findElement(username).sendKeys(user);
        await driver.findElement(password).sendKeys(pass);
        await driver.findElement(spam).sendKeys('4'); // Anti-spam
        await driver.findElement(loginButton).click();
    },

    getFlashMessageText: async (): Promise<string> => {
        await driver.sleep(500);
        const element = await driver.findElement(SELECTORS.flashMessage);
        return await element.getText();
    }
});
