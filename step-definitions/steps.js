import { client } from 'nightwatch-api';
import { Given, Then, When } from 'cucumber';

Given(/^I am on the Gmail login page$/, async () => {
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .waitForElementVisible('body', 1000)
    .assert.visible('input[name=identifier]');
});

When(/^I enter my credentials$/, async () => {
  await client
  .assert.visible('input[name=identifier]')
  .setValue('input[name=identifier]', 'testuserecse428@gmail.com')
    .click('#identifierNext')
    .pause(1000)
    .assert.visible('input[name=password]')
    .setValue('input[name=password]', 'iloveassignmentb')
    .click('#passwordNext');
});

Then(/^I get to my Inbox section of the Gmail website$/, async () => {
  await client
  .waitForElementVisible('body', 5000)
  .url(function(result) {
      this.assert.equal(result.value, 'https://mail.google.com/mail/#inbox', 'Url is what we expect');
    })
    .assert.containsText('body', 'Compose');
});

When(/^I click Compose$/, async () => {
  await client
  .waitForElementVisible('body', 5000)
  .useXpath().click("//div[contains(text(),'Compose')]")
  .pause(1000)
});

When(/^I write an email address in the recipient field of the compose section$/, async () => {
  await client
  .useXpath().setValue("//textarea[@name='to']", 'elias.alhomsi@mail.mcgill.ca')
  .pause(1000);
});

When(/^I write a title in the subject field$/, async () => {
  await client
  .useXpath().setValue("//input[@name='subjectbox']", 'a title')
  .pause(1000);
});

When(/^I write a message in the email body field$/, async () => {
  await client
  .useXpath().setValue("//div[@aria-label='Message Body']", 'hey I missed you')
  .pause(1000);
});

When(/^I attach an image$/, async () => {
  await client
  .useXpath().click("//div[@data-tooltip='Insert photo']")
  .useXpath().waitForElementPresent("//iframe[contains(@src, 'https://docs.google.com/picker?protocol=gadgets')]", 10000)
  .pause(1000)
  .getAttribute("//iframe[contains(@src, 'https://docs.google.com/picker?protocol=gadgets')]", 'id', (result) => {
      client
        .frame(null)
        .frame(result.value)
  });
});

