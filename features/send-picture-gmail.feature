Feature: SendPictureGmail
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.
Please note you can change the email and title and body by changing the text within quotes "<param>"

Scenario: NORMAL Email sending NEW WITHOUT NAV
  Given I am logged into gmail with my valid credentials
  When I send an email to the following list
    | al.julanda.om@gmail.com            | subject1 | body1 |
    | aljulanda.alabri@mail.mcgill.ca    | subject2 | body2 |
    | al-julanda.om@hotmail.com          | subject3 | body3 |
  Then the emails sent above should be present
  And restore the system to its original state

Scenario: ALTERANTIVE Mutliple email sending NEW WITHOUT NAV
  Given I am logged into gmail with my valid credentials
  When I send an email to "aljulanda.alabri@mail.mcgill.ca , al.julanda.om@gmail.com," with title "some title" and body "some message"
  Then the email with title "some title" and "some message" should exist in the sent emails
  And restore the system to its original state

Scenario: ERROR email with no recipient NEW WITHOUT NAV
  Given I am logged into gmail with my valid credentials
  When I send an email to "" with title "some title" and body "some message"
  Then an alert will show
  And restore system

Scenario: Sending an email
  Given I am on the Gmail login page
  And I enter my credentials
  And I get to my Inbox section of the Gmail website
  When I click Compose
  And I write an email address "aljulanda.alabri@mail.mcgill.ca" in the recipient field of the compose section
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then the email with title "some title" and "some message" should exist in the sent emails
  And restore the system to its original state

  Scenario: Sending to multiple recipients ALT
  Given I am on the Gmail login page
  And I enter my credentials
  And I get to my Inbox section of the Gmail website
  When I click Compose
  And I write an email address "aljulanda.alabri@mail.mcgill.ca , al.julanda.om@gmail.com," in the recipient field of the compose section
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then the email with title "some title" and "some message" should exist in the sent emails
  And restore the system to its original state

  Scenario: Sending to no recipients ERR
  Given I am on the Gmail login page
  And I enter my credentials
  And I get to my Inbox section of the Gmail website
  When I click Compose
  And I write "some title" in the subject field
  And I write "some message" in the email body field
  And I attach an image
  And I press the send button
  Then an alert will show
  And restore system