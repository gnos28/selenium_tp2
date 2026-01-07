import { By, WebDriver } from 'selenium-webdriver';

export class LoginPage {
    private driver: WebDriver;
    
    // Locators
    private usernameInput = By.id('username');
    private passwordInput = By.id('password');
    private spamInput = By.id('spam');
    private loginButton = By.id('login-button'); 
    private flashMessage = By.id('flash');

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async navigate(): Promise<void> {
        // Target the local Vite dev server
        await this.driver.get('http://localhost:5173');
    }

    // Méthode métier encapsulée
    async login(user: string, pass: string): Promise<void> {
        await this.driver.findElement(this.usernameInput).sendKeys(user);
        await this.driver.findElement(this.passwordInput).sendKeys(pass);
        
        // Handle Anti-spam (2+2=4)
        await this.driver.findElement(this.spamInput).sendKeys('4');
        
        await this.driver.findElement(this.loginButton).click();
    }

    // Méthode utilitaire pour l'assertion
    async getFlashMessageText(): Promise<string> {
        // Wait a bit for the message to appear could be useful, but for now we trust implicit waits or React speed
        // Basic sleep to ensure React render? Ideally use wait(), but staying simple as per boilerplate.
        await this.driver.sleep(500); 
        const element = await this.driver.findElement(this.flashMessage);
        return await element.getText();
    }
}
