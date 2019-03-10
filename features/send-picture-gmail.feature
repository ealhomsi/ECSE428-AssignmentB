Feature: SendPictureGmail
This feature would test that a user is able to send a picture
using gmail and then find that picture in the sent folder.
Please note you can change the email and title and body by changing the text within quotes "<param>"

Scenario: NORMAL Send email with images
  Given I am logged into gmail with my valid credentials
  When I send an email to the following list
    | al.julanda.om@gmail.com            | subject1 | body1 | https://bit.ly/2MQhVaw |
    | aljulanda.alabri@mail.mcgill.ca    | subject2 | body2 | https://bit.ly/2ta41ab |
    | al-julanda.om@hotmail.com          | subject3 | body3 | https://bit.ly/2CZG6zZ |
    | elias.alhomsi@mail.mcgill.ca       | subject4 | body4 | https://bit.ly/2tVyTf1 |
    | me@aljulanda.com                   | subject5 | body5 | https://bit.ly/2wf1vlb |
  Then the emails sent above should be present in the sent folder with their respective parameters
  And restore the system to its original state

Scenario: ALTERANTIVE Send an email with image to multiple recipients
  Given I am logged into gmail with my valid credentials
  When I send an email to "aljulanda.alabri@mail.mcgill.ca , al.julanda.om@gmail.com," with title "some title" and body "some message \n image: https://bit.ly/2tVyTf1"
  Then the email with title "some title" and "some message" and "https://bit.ly/2tVyTf1" should exist in the sent emails
  And restore the system to its original state

Scenario: ERROR email with no recipient
  Given I am logged into gmail with my valid credentials
  When I send an email to "" with title "ERR some title" and body "ERR some message \n https://bit.ly/2tVyTf1"
  Then an alert will show indicating the message can't be sent
  And restore system