Feature: SendPictureGmail
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.

Scenario: Logging in to Gmail

  Given I am on the Gmail login page
  When I enter my credentials
  Then I get to my Inbox section of the Gmail website
  
Scenario: Sending an email
  Given I get to my Inbox section of the Gmail website
  When I click Compose
  And I write an email address in the recipient field of the compose section
  And I write a title in the subject field
  And I write a message in the email body field
  And I attach an image
  And  I press the send button
  Then the email that I sent should exist in the sent emails section of the Gmail webpage

