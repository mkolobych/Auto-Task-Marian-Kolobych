import { test as base } from '@playwright/test';
import { SignInPage } from '../appPages/signinPage';
import { MainPage } from '../appPages/mainPage';
import { SettingsPage } from '../appPages/settingsPage';
import { generateUniqueName } from '../utils/generators';
import { creds } from '../playwright.config';

type MyFixtures = {
    signInPage: SignInPage;
    mainPage: MainPage;
    settingsPage: SettingsPage;
    groupName: string;
    scriptText: string;
    creds: { email: string; password: string };
};

export const test = base.extend<MyFixtures>({
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },

    mainPage: async ({ page, signInPage, creds }, use) => {
        await signInPage.signIn(creds.email, creds.password);
        const mainPage = new MainPage(page);
        await use(mainPage);
    },

    settingsPage: async ({ page }, use) => {
        const settingsPage = new SettingsPage(page);
        await use(settingsPage);
    },

    groupName: async ({ }, use) => {
        const groupName = generateUniqueName('Test Group');
        await use(groupName);
    },

    scriptText: async ({ }, use) => {
        const scriptText = generateUniqueName('Script');
        await use(scriptText);
    },

    creds: async ({ }, use) => {
        const credentials = { email: creds.email, password: creds.password };
        await use(credentials);
    }
});

export { expect } from '@playwright/test'
