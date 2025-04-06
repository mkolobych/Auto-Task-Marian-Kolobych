import { test, expect } from '../fixtures/fixtures';
import { creds } from '../playwright.config';

test('CRM-001-User can sign in and create a script group in AstroCRM', async ({
    page, signInPage, mainPage, settingsPage, groupName, scriptText }) => {
    await signInPage.signIn(creds.email, creds.password);
    await mainPage.goToSettings();
    await settingsPage.createGroup(page, groupName, scriptText);
    await mainPage.gotoGhats();
    await mainPage.selectLastCreatedChat();


    await expect(mainPage.getGroupTemplate()).toBeVisible();
    await expect(mainPage.getGroupTemplate()).toContainText(groupName);
    const disabledStates = await mainPage.areAllGroupButtonsDisabled();
    for (const state of disabledStates) {
        expect(state).toBe(true);
    }
});

test.afterEach(async ({ page, settingsPage, groupName }) => {
    if (groupName) {
        await settingsPage.deleteChatByName(page, groupName);
    }
});