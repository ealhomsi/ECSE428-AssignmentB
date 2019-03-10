import { client } from 'nightwatch-api';
import { Given, Then, When } from 'cucumber';

var users
Given(/^I am logged into gmail with my valid credentials$/, async () => {
  /*
  Nightwatch methods explanation:
  assert.visible("element") asserts that the referenced HTML element exists in the page
  .waitForElementVisible('Element', 'MaxWaitTime'): wait for an element to exist until a max number of miliseconds
  .setValue('element', 'value'): sets the value to the referenced element
  .click('element'): clicks on an element
  .assert.containsText('element', 'text'): asserts that the referenced element contains the referenced text
  */

  /*The code below verifys that the system is in an acceptable state before starting the tests
  For Gmail, this state is a logged in user with valid credentials
  The client starts by going to the login page and ENSURES we are there
  Then it entres the credentials and goes to the main page of gmail
  Then it ENSURES that we are logged in successfully
  */
  await client
    .url('https://accounts.google.com/ServiceLogin/identifier?service=mail')
    .waitForElementVisible('body', 1000) // ensure page is loaded
    .assert.visible('input[name=identifier]') //userName element
    .assert.containsText('html', 'Sign in') //To ensure we are in sign in page
    .assert.visible('input[name=identifier]')
    .setValue('input[name=identifier]', 'testuserecse428@gmail.com') //set username
    .click('#identifierNext') //move forward
    .assert.visible('input[name=password]')
    .setValue('input[name=password]', 'iloveassignmentb') //set password
    .click('#passwordNext') // log in
    .waitForElementVisible('html', 5000) //make sure page was loaded
    .url(function(result) { //ensure we got to the inbox
        this.assert.equal(result.value, 'https://mail.google.com/mail/#inbox', 'Url is what we expect'); 
      })
    .assert.containsText('html', 'Compose'); //another assurance
});

When(/^I send an email to the following list$/, async (table) => {
  
  users = table.rawTable // The data is recivied as a table
  for(var x = 0; x< users.length; x++){
    var email = users[x][0]
    var subject = users[x][1]
    var message = users[x][2]
    var image = users[x][3]
    const body = String(message).concat("\n Image: ", image)
    await client
    .useXpath().click("//div[contains(text(),'Compose')]") //click on compese button
  
    .waitForElementPresent("//textarea[@name='to']",3000)
    .useXpath().setValue("//textarea[@name='to']", String(email)) // fill in the parameters
  
    .waitForElementPresent("//input[@name='subjectbox']",3000)
    .useXpath().setValue("//input[@name='subjectbox']", String(subject))
  
    .waitForElementPresent("//div[@aria-label='Message Body']",3000)
    .useXpath().setValue("//div[@aria-label='Message Body']", body)
    
    .useXpath().click("//div[contains(@data-tooltip, 'Send')]")
  }
});

When(/^I send an email to "(.*?)" with title "(.*?)" and body "(.*?)"$/, async (email, subject, message) => {
  // same as the previous one but gets the data from the step and not from a table
    await client
    .useXpath().click("//div[contains(text(),'Compose')]")
    .waitForElementPresent("//textarea[@name='to']",3000)
    .useXpath().setValue("//textarea[@name='to']", String(email))
  
    .waitForElementPresent("//input[@name='subjectbox']",3000)
    .useXpath().setValue("//input[@name='subjectbox']", String(subject))
  
    .waitForElementPresent("//div[@aria-label='Message Body']",3000)
    .useXpath().setValue("//div[@aria-label='Message Body']", String(message))
  
    .useXpath().click("//div[contains(@data-tooltip, 'Send')]")
});


Then(/^the emails sent above should be present in the sent folder with their respective parameters$/, async () => {
  await client
  .url('https://mail.google.com/mail/#sent')
  for(var x = 0; x<users.length; x++){
    // Chekcs that all emails that were sent earlier exist in the sent folder
    var subject = users[x][1]
    var message = users[x][2]
    var image = users[x][3]
    await client
    //wait for gmail to add the new email
    if(x===0){
      client.refresh()
    }
    console.log("Verifying", subject, "and", message, "and", image, "exist in sent folder")
    await client
    .assert.containsText('html', String(subject))
    .assert.containsText('html', String(message))
    .assert.containsText('html', String(image))
  }
});

Then(/^the email with title "(.*?)" and "(.*?)" and "(.*?)" should exist in the sent emails$/, async (subject, message, image) => {
  await client
  //wait for gmail to add the new email
  .url('https://mail.google.com/mail/#sent')
  .refresh()
  .assert.containsText('html', subject)
  .assert.containsText('html', message)
  .assert.containsText('html', image)
});

Then(/^an alert will show indicating the message can't be sent$/, async () => {
  // Since no recipient is entered we get an error
  await client
  .assert.containsText('html', 'Please specify at least one recipient.') // the error pop up
  .useXpath().waitForElementPresent('//button[@name="ok"]', 10000) // accepts the error
  .useXpath().click('//button[@name="ok"]')
});

Then(/^restore the system to its original state$/, async () => {
  await client
  //Since we started with an empty sent folder, we should resotre the folder to empty after the tests
  .useXpath().waitForElementPresent('//span[@role="checkbox"]', 1000)
  .useXpath().click('//span[@role="checkbox"]')
  
  .useXpath().waitForElementPresent('//div[@data-tooltip="Delete"]', 10000)
  .useXpath().click('//div[@data-tooltip="Delete"]')
  
  .useXpath().waitForElementPresent('//span[@class="gb_ya gbii"]', 10000) //log out since we started logged out
  .useXpath().click('//span[@class="gb_ya gbii"]')
  
  .useXpath().waitForElementPresent('//a[@id="gb_71"]', 10000)
  .useXpath().click('//a[@id="gb_71"]')

  .deleteCookies(function(){//restore system to original state by deleting any cookies
    console.log("Cookies deleted")
  })
});

// The previous function deletes emails before restoring the system this one doesn't
// since we didn't send an email in the error case
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