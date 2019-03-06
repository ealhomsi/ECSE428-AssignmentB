Feature: SendPictureGmailALT
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.
Please note you can change the email and title and body by changing the text within quotes "<param>"

Scenario: Logging in to Gmail ALT

  Given I am on the Gmail login page
  When I enter my credentials
  Then I get to my Inbox section of the Gmail website
  
Scenario: Sending to multiple recipients ALT
  Given I get to my Inbox section of the Gmail website
  When I click Compose
  And I write an email address "aljulanda.alabri@mail.mcgill.ca , al.julanda.om@gmail.com," in the recipient field of the compose section
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then the email with title "some title" and "some message" should exist in the sent emails
  And restore the system to its original state