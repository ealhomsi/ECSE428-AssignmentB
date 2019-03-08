import { client } from 'nightwatch-api';
import { Given, Then, When } from 'cucumber';

var users
/////////////// NEW METHODS ///////////
Given(/^I am logged into gmail with my valid credentials$/, async () => {
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .waitForElementVisible('body', 1000)
    .assert.visible('input[name=identifier]')
    .assert.containsText('html', 'Sign in')
    .assert.visible('input[name=identifier]')
    .setValue('input[name=identifier]', 'testuserecse428@gmail.com')
    .click('#identifierNext')
    .pause(1000)
    .assert.visible('input[name=password]')
    .setValue('input[name=password]', 'iloveassignmentb')
    .click('#passwordNext')
    .waitForElementVisible('html', 5000)
    .url(function(result) {
        this.assert.equal(result.value, 'https://mail.google.com/mail/#inbox', 'Url is what we expect');
      })
    .assert.containsText('html', 'Compose');
});

When(/^I send an email to the following list$/, async (table) => {
  
  users = table.rawTable
  for(var x = 0; x< users.length; x++){
    var email = users[x][0]
    var subject = users[x][1]
    var message = users[x][2]
    await client
    .useXpath().click("//div[contains(text(),'Compose')]")
  
    .waitForElementPresent("//textarea[@name='to']",3000)
    .pause(100)
    .useXpath().setValue("//textarea[@name='to']", String(email))
  
    .waitForElementPresent("//input[@name='subjectbox']",3000)
    .useXpath().setValue("//input[@name='subjectbox']", String(subject))
  
    .waitForElementPresent("//div[@aria-label='Message Body']",3000)
    .useXpath().setValue("//div[@aria-label='Message Body']", String(message))
  
    // ATTACH AN IMAGE HERE
    .useXpath().click("//div[contains(@data-tooltip, 'Send')]")
    .pause(1000)  
  }
});

When(/^I send an email to "(.*?)" with title "(.*?)" and body "(.*?)"$/, async (email, subject, message) => {
    await client
    .useXpath().click("//div[contains(text(),'Compose')]")
  
    .waitForElementPresent("//textarea[@name='to']",3000)
    .useXpath().setValue("//textarea[@name='to']", email)
  
    .waitForElementPresent("//input[@name='subjectbox']",3000)
    .useXpath().setValue("//input[@name='subjectbox']", subject)
  
    .waitForElementPresent("//div[@aria-label='Message Body']",3000)
    .useXpath().setValue("//div[@aria-label='Message Body']", message)
  
    // ATTACH AN IMAGE HERE
    .useXpath().click("//div[contains(@data-tooltip, 'Send')]")
    .pause(1000)  
});


Then(/^the emails sent above should be present$/, async () => {
  await client
  .url('https://mail.google.com/mail/#sent')
  .pause(2000)
  for(var x = 0; x<users.length; x++){
    var subject = users[x][1]
    var message = users[x][2]
    await client
    //wait for gmail to add the new email
    .refresh()
    .pause(3000)
    .assert.containsText('html', String(subject))
    .assert.containsText('html', String(message))
  }
});


/////////////// NEW METHODS ///////////
// This is checking that the system is in appropriate state before testing
Given(/^I am on the Gmail login page$/, async () => {
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .waitForElementVisible('body', 1000)
    .assert.visible('input[name=identifier]')
    .assert.containsText('html', 'Sign in')
});

Given(/^I enter my credentials$/, async () => {
  await client
  .assert.visible('input[name=identifier]')
  .setValue('input[name=identifier]', 'testuserecse428@gmail.com')
    .click('#identifierNext')
    .pause(1000)
    .assert.visible('input[name=password]')
    .setValue('input[name=password]', 'iloveassignmentb')
    .click('#passwordNext');
});

Given(/^I get to my Inbox section of the Gmail website$/, async () => {
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
  .url('https://mail.google.com/mail/#sent')
  .refresh()
  .pause(3000)
  .assert.containsText('html', subject)
  .assert.containsText('html', message)
  //.useXpath().click('//table[@class="F cf zt"]/tbody/tr[1]')
});

Then(/^an alert will show$/, async () => {
  await client
  .assert.containsText('html', 'Please specify at least one recipient.')
  .useXpath().waitForElementPresent('//button[@name="ok"]', 10000)
  .useXpath().click('//button[@name="ok"]')
});

Then(/^restore the system to its original state$/, async () => {
  await client
  //clean all emails
  // DELTE THE SECONDS PAUSES THEY ARE NOT ALLOWED
  .useXpath().waitForElementPresent('//span[@role="checkbox"]', 1000)
  .useXpath().click('//span[@role="checkbox"]')
  
  .useXpath().waitForElementPresent('//div[@data-tooltip="Delete"]', 10000)
  .useXpath().click('//div[@data-tooltip="Delete"]')
  
  //log out
  .useXpath().waitForElementPresent('//span[@class="gb_ya gbii"]', 10000)
  .useXpath().click('//span[@class="gb_ya gbii"]')
  
  .useXpath().waitForElementPresent('//a[@id="gb_71"]', 10000)
  .useXpath().click('//a[@id="gb_71"]')

  .deleteCookies(function(){//restore system to original state
    console.log("Cookies deleted")
  })
});

// The previous function deletes emails before restoring the system 
Then(/^restore system$/, async () => {
  await client
  //log out
  .useXpath().waitForElementPresent('//span[@class="gb_ya gbii"]', 10000)
  .useXpath().click('//span[@class="gb_ya gbii"]')
  
  .useXpath().waitForElementPresent('//a[@id="gb_71"]', 10000)
  .useXpath().click('//a[@id="gb_71"]')

  .deleteCookies(function(){//restore system to original state
    console.log("Cookies deleted")
  })
});