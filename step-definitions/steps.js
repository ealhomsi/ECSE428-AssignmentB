import { client } from 'nightwatch-api';
import { Given, Then, When } from 'cucumber';

Given(/^I am on the Gmail login page$/, async () => {
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .pause(3000)
    .assert.visible('input[name=identifier]');
});

Given(/^I am in inbox$/, async () => {
  await client
  .url('https://mail.google.com/mail/#inbox')
  .pause(3000)
  .assert.containsText('html', 'Compose');
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
  .pause(3000)
  .url(function(result) {
      this.assert.equal(result.value, 'https://mail.google.com/mail/#inbox', 'Url is what we expect');
    })
    .assert.containsText('body', 'Compose');
});

When(/^I click Compose$/, async () => {
  await client
  .pause(3000)
  .useXpath().click("//div[contains(text(),'Compose')]")
  .pause(1000)
});

When(/^I write an email address "(.*?)" in the recipient field of the compose section$/, async (email) => {
  await client
  .waitForElementPresent("//textarea[@name='to']",3000)
  .useXpath().setValue("//textarea[@name='to']", email)
  .pause(1000);
});

When(/^I write "(.*?)" in the subject field$/, async (subject) => {
  await client
  .useXpath().setValue("//input[@name='subjectbox']", subject)
  .pause(1000);
});

When(/^I write "(.*?)" in the email body field$/, async (body) => {
  await client
  .useXpath().setValue("//div[@aria-label='Message Body']", body)
  .pause(1000);
});

When(/^I attach an image$/, async () => {
  await client
  .useXpath().click("//div[@data-tooltip='Insert photo']")
  .useXpath().waitForElementPresent("//iframe[contains(@src, 'https://docs.google.com/picker?protocol=gadgets')]", 10000)
  //give time for the frame to be avialble
  .pause(5000)
  //have to do the attaching manually
  .useXpath().waitForElementNotPresent("//iframe[contains(@src, 'https://docs.google.com/picker?protocol=gadgets')]", 1000000)
});

When(/^I press the send button$/, async () => {
  await client
  .pause(1000)
  .useXpath().click("//div[contains(@data-tooltip, 'Send')]")
  .pause(1000)
});

Then(/^the email with title "(.*?)" should exist in the sent emails$/, async (subject) => {
  await client
  //wait for gmail to add the new email
  .pause(1000)
  .url('https://mail.google.com/mail/#sent')
  .refresh()
  .pause(3000)
  .assert.containsText('html', subject)
  //clean all emails
  .useXpath().click('//span[@role="checkbox"]')
  .pause(1000)
  .useXpath().click('//div[@data-tooltip="Delete"]')
});

Then(/^the email with title "(.*?)" shouldn't exist in the sent emails$/, async (subject) => {
  await client
  //wait for gmail to add the new email
  .pause(1000)
  .url('https://mail.google.com/mail/#sent')
  .refresh()
  .pause(3000)
  .expect.element('html').text.to.not.contain(subject)
});


