import { client } from 'nightwatch-api';
import { Given, Then, When } from 'cucumber';

Given(/^I am on the Gmail login page$/, async () => {
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .waitForElementVisible('html', 5000)
    .isVisible('input[name=identifier]', result => {
      if(result.value){
        console.log("User Name to be entered")
        console.log(result)
      }
    })
});

When(/^I enter my credentials$/, async () => {
  await client
  .isVisible('input[name=identifier]', result => {
    if(result.value){
      client.setValue('input[name=identifier]', 'testuserecse428@gmail.com')
      client.click('#identifierNext')
    }
  })
  .pause(1000)
  .assert.visible('input[name=password]')
  .setValue('input[name=password]', 'iloveassignmentb')
  .click('#passwordNext');
});

Given(/^I am in inbox$/, async () => {
  await client
  //wait for gmail to add the new email
  .pause(1000)
  .url('https://mail.google.com/mail/#sent')
  .refresh()
});


Then(/^I get to my Inbox section of the Gmail website$/, async () => {
  await client
  .waitForElementVisible('html', 5000)
  .url(function(result) {
      this.assert.equal(result.value, 'https://mail.google.com/mail/#inbox', 'Url is what we expect');
    })
    .assert.containsText('html', 'Compose');
});

When(/^I click Compose$/, async () => {
  await client
  .waitForElementVisible('body', 5000)
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

Then(/^the email with title "(.*?)" and "(.*?)" should exist in the sent emails$/, async (subject, message) => {
  await client
  //wait for gmail to add the new email
  .pause(1000)
  .url('https://mail.google.com/mail/#sent')
  .refresh()
  .pause(3000)
  .assert.containsText('html', subject)
  .assert.containsText('html', message)
  //clean all emails
  .useXpath().click('//span[@role="checkbox"]')
  .pause(1000)
  .useXpath().click('//div[@data-tooltip="Delete"]')
  .pause(1000)
  //log out
  .useXpath().click('//span[@class="gb_ya gbii"]')
  .pause(1000)
  .useXpath().click('//a[@id="gb_71"]')
  .deleteCookies(function(){//restore system to original state
    console.log("NO COOKIES")
  })
});

