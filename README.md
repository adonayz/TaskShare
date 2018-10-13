# cs4241-FinalProject
===
Project Name: Task-Share
===

https://adonayz-fp.herokuapp.com

## adonayz
- Adonay Resom

Project Summary
---
I create a web application that will enable users to broadcast small jobs (tasks) to other people near them (WPI for example).
The application was supposed to integrate venmo payment in it but I later found out their javascript API doesnt work properly on
desktop browsers. The application has a neat and simple ui and has has notification icons inorder to notify users about the status
of their tasks. 

Requirements
---
- The application is a working implementation.
- It has been deployed on heroku.
- The application uses NodeJS express. Contains several routes and views (views use ejs engine).
- The application uses mongodb through mongoose and implements plenty types of database queries (add, edit, delete) and database management techniques (such as keys).
- The application makes use of several Ajax requests through helper functions (I did not have to instantiate 4 XMLHTTPRequest
objects).
- The application used front end javascript to update screen contents without refresh.
- The application uses an authentication system that uses bcrypt to hash passwords
- The applications tracks sessions.
- Paths/routes were correctly parsed.

## Technical Achievements
- **Tech Achievement 1**: Used a mongoose (mongodb) database. Several schemas were created and modified (through creations, edits and deletions)
- **Tech Achievement 2**: Used express node.js (avoids static routing)
- **Tech Achievement 3**: Used an authentication system. I used a combination of express-session, mongoose, and bcrypt to accomplish that. 
- **Tech Achievement 4**: Used javascript events to update the state and organization of the task cards.
- **Tech Achievement 5**: added stylesheets from bootstrap and w3 inorder to improve the aestheics and responsiveness 
of the webapp.


### Design/Evaluation Achievements
- **Design Achievement 1**: Used bootstrap 4 cards to display tasks
- **Design Achievement 2**: The app is completly responsive. It feels like a mobile app in smaller browsers
- **Design Achievement 3**: Added client side javascript file inorder to update page content from server without refreshing
- **Design Achievement 4**: Added stylesheets from bootstrap and w3 inorder to improve the aestheics and responsiveness 
of the webapp.
- **Design Achievement 5**: Added stylesheets from bootstrap and w3 inorder to improve the aestheics and responsiveness 
of the webapp.
- **Design Achievement 6**: Created an application that has both aspects of a social media tool. 
