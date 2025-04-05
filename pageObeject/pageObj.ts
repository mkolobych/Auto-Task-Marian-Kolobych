import { expect, type Locator, type Page } from '@playwright/test';

export class PageObject {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly profileDropDown: Locator;
    readonly settingsButton: Locator;
    readonly addGroupButton: Locator;
    readonly newGroupTitleInput: Locator;
    readonly scriptInput: Locator;
    readonly sideBarButton: Locator;
    readonly sideBarChatsBtn: Locator;
    readonly chats: Locator;
    readonly chatTemplate: Locator;
    readonly deleteButton: Locator;
    readonly confirmDelete: Locator;
    readonly successPopUp: Locator;
    readonly closeSuccessButton: Locator;
    readonly groupContainer: (groupName: string) => Locator;
    readonly editButtonForGroup: (groupName: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[type="email"]');
        this.passwordInput = page.locator('[type="password"]');
        this.submitButton = page.locator('[type="submit"]');
        this.profileDropDown = page.locator('[data-testid="KeyboardArrowDownIcon"]');
        this.settingsButton = page.locator('#settings');
        this.addGroupButton = page.locator('[data-testid="AddIcon"]');
        this.newGroupTitleInput = page.locator('[type="text"]');
        this.scriptInput = page.locator('[class="_textarea_nr5ea_1"]');
        this.sideBarButton = page.locator('.css-1r2kdtk');
        this.sideBarChatsBtn = page.locator(`//div[p[text()='Chats']]`);
        this.chats = page.locator('.css-9frgyk');
        this.chatTemplate = page.locator('[class="MuiBox-root css-osyylf"]');
        this.deleteButton = page.locator(`//*[text()="Delete"]`);
        this.confirmDelete = page.locator('[class*="css-r1shct"]');
        this.successPopUp = page.locator('//*[text()="Success"]');
        this.closeSuccessButton = page.locator('#close');

        this.groupContainer = (groupName: string) =>
            page.locator('.css-hbj1al', { hasText: groupName });

        this.editButtonForGroup = (groupName: string) =>
            this.groupContainer(groupName).locator('[data-testid="MoreHorizIcon"]');
    }

    async signIn(email: string, password: string) {
        await this.page.goto(process.env.BASE_URL || "");
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async goToSettings() {
        await this.profileDropDown.click();
        await this.settingsButton.click();
    }

    async createGroup(title: string, script: string) {
        await this.addGroupButton.click();
        await this.newGroupTitleInput.fill(title);
        await this.scriptInput.first().fill(script);
        await this.submitButton.click();
    }

    async gotoGhats() {
        await this.sideBarButton.click();
        await this.sideBarChatsBtn.click();
    }

    async selectLastCreatedChat() {
        await this.chats.first().click();
    }

    getGroupTemplate() {
        return this.chatTemplate;
    }

    async checkAllButtonsDisabled() {
        const groupTemplate = this.getGroupTemplate();
        const buttons = groupTemplate.locator('button');
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const button = buttons.nth(i);
            await expect(button).toBeDisabled();
        }
    }

    async deleteChatByName(groupName: string) {
        await this.goToSettings();

        if (await this.successPopUp.isVisible().catch(() => false)) {
            await this.closeSuccessButton.click();
        }

        const editButton = this.editButtonForGroup(groupName);
        await editButton.click();
        await this.deleteButton.click();
        await this.confirmDelete.click();
    }
}