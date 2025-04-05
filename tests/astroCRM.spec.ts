import { test, expect } from '@playwright/test';
import { PageObject } from '../pageObeject/pageObj';
import { creds } from '../config';
import { generateUniqueName } from '../utils/generators';

test('User can sign in and create a script group in AstroCRM', async ({ page }) => {
  const pageObject = new PageObject(page);

  await pageObject.signIn(creds.email, creds.password);
  await pageObject.goToSettings();

  const groupName = generateUniqueName('Test Group');
  const scriptText = generateUniqueName('Script');

  await pageObject.createGroup(groupName, scriptText);
  await pageObject.gotoGhats();
  await pageObject.selectLastCreatedChat();

  await expect(pageObject.getGroupTemplate()).toBeVisible();
  await expect(pageObject.getGroupTemplate()).toContainText(groupName);

  await pageObject.checkAllButtonsDisabled();

  await pageObject.deleteChatByName(groupName);
});

