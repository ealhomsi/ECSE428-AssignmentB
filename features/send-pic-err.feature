Feature: SendPictureGmailERR
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.
Please note you can change the email and title and body by changing the text within quotes "<param>"
  
Scenario: Sending to multiple recipients ERR
  Given I am on the Gmail login page
  And I enter my credentials
  And I get to my Inbox section of the Gmail website
  When I click Compose
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then an alert will show