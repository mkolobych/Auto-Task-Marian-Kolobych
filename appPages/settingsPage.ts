import { type Locator, type Page } from '@playwright/test';
import { MainPage } from '../appPages/mainPage';

export class SettingsPage {
    readonly page: Page;
    readonly addGroupButton: Locator;
    readonly newGroupTitleInput: Locator;
    readonly scriptInput: Locator;
    readonly deleteButton: Locator;
    readonly confirmDelete: Locator;
    readonly successPopUp: Locator;
    readonly closeSuccessButton: Locator;
    private getElemetByType: (type: string) => Locator;
    private groupContainer: (groupName: string) => Locator;
    private editButtonForGroup: (groupName: string) => Locator;

    constructor(page: Page) {
        this.addGroupButton = page.locator('[data-testid="AddIcon"]');
        this.scriptInput = page.locator('[class="_textarea_nr5ea_1"]');
        this.deleteButton = page.locator(`//*[text()="Delete"]`);
        this.confirmDelete = page.locator('[class*="css-r1shct"]');
        this.successPopUp = page.locator('//*[text()="Success"]');
        this.closeSuccessButton = page.locator('#close');
        this.getElemetByType = (type: string) => page.locator(`[type="${type}"]`);

        this.groupContainer = (groupName: string) =>
            page.locator('.css-hbj1al', { hasText: groupName });

        this.editButtonForGroup = (groupName: string) =>
            this.groupContainer(groupName).locator('[data-testid="MoreHorizIcon"]');
    }

    async createGroup(title: string, script: string) {
        await this.addGroupButton.click();
        await this.getElemetByType("text").fill(title);
        await this.scriptInput.first().fill(script);
        await this.getElemetByType("submit").click();
    }

    async deleteChatByName(page: Page, groupName: string) {
        const mainPage = new MainPage(page)
        await mainPage.goToSettings();

        if (await this.successPopUp.isVisible().catch(() => false)) {
            await this.closeSuccessButton.click();
        }

        const editButton = this.editButtonForGroup(groupName);
        await editButton.click();
        await this.deleteButton.click();
        await this.confirmDelete.click();
    }

}