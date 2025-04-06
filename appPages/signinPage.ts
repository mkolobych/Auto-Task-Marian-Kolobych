import { expect, type Locator, type Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    private baseUrl: string;

    constructor(page: Page, baseUrl: string = process.env.BASE_URL || '') {
        this.page = page;
        this.emailInput = page.locator('[type="email"]');
        this.passwordInput = page.locator('[type="password"]');
        this.submitButton = page.locator('[type="submit"]');
        this.baseUrl = baseUrl;
    }

    private async goToPage() {
        await this.page.goto(this.baseUrl);
    }

    private async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    private async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    private async submitForm() {
        await this.submitButton.click();
    }

    async signIn(email: string, password: string) {
        await this.goToPage();
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submitForm();
    }
}