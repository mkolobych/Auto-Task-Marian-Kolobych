import { type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly profileDropDown: Locator;
    readonly settingsButton: Locator;
    readonly sideBarButton: Locator;
    readonly sideBarChatsBtn: Locator;
    readonly chats: Locator;
    readonly chatTemplate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileDropDown = page.locator('[data-testid="KeyboardArrowDownIcon"]');
        this.settingsButton = page.locator('#settings');
        this.sideBarButton = page.locator('.css-1r2kdtk');
        this.sideBarChatsBtn = page.locator(`//div[p[text()='Chats']]`);
        this.chats = page.locator('.css-9frgyk');
        this.chatTemplate = page.locator('[class="MuiBox-root css-osyylf"]');
    }

    async goToSettings() {
        await this.profileDropDown.click();
        await this.settingsButton.click();
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

    async areAllGroupButtonsDisabled() {
        const buttons = this.getGroupTemplate().locator('button');
        const count = await buttons.count();
        const results: boolean[] = [];

        for (let i = 0; i < count; i++) {
            results.push(await buttons.nth(i).isDisabled());
        }

        return results;
    }
}