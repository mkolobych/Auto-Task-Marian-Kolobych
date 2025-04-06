import { type Locator, type Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    private baseUrl: string;
    private getElemetByType: (type: string) => Locator;

    constructor(page: Page, baseUrl: string = process.env.BASE_URL || '') {
        this.page = page;
        this.getElemetByType = (type: string) => page.locator(`[type="${type}"]`);
        this.baseUrl = baseUrl;
    }

    private async goToPage() {
        await this.page.goto(this.baseUrl);
    }

    private async fillEmail(email: string) {
        await this.getElemetByType("email").fill(email);
    }

    private async fillPassword(password: string) {
        await this.getElemetByType("password").fill(password);
    }

    private async submitForm() {
        await this.getElemetByType("submit").click();
    }

    async signIn(email: string, password: string) {
        await this.goToPage();
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submitForm();
    }
}