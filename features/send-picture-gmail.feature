Feature: SendPictureGmail
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.
Please note you can change the email and title and body by changing the text within quotes "<param>"

Scenario: Logging in to Gmail

  Given I am on the Gmail login page
  When I enter my credentials
  Then I get to my Inbox section of the Gmail website
  
Scenario: Sending an email
  Given I get to my Inbox section of the Gmail website
  When I click Compose
  And I write an email address "elias.alhomsi@mail.mcgill.ca" in the recipient field of the compose section
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then the email with title "some title" should exist in the sent emails

Scenario: Sending an email with wrong email address
  Given I am in inbox
  When I click Compose
  And I write an email address "elias988.alhomsi@mail.mcgill.ca" in the recipient field of the compose section
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then the email with title "some title" shouldn't exist in the sent emails

