//LOGIC 1 (Anonimus users) CREATE QUESTION and listquestionbyId

//Here is the logic to brin all the questions that are in an ad. 
// Home page (page 1) --> select an ad --> Questions  Button --> List all the questions of that Ad (page2)
// page 1 is: an example http://localhost:3000/ 
// Page 2 is http://localhost:3000/Home/Ads/Details/672e5a124332f8d119130b76/Questions
// In second page created the table with the information (Question / Answer) at the end 2 buttons: create question and back
// the logic of back button is the same that is in Ads 
// create question button will direct me to Page 3 with the form. Something like:
//Question: Why is so expensive (user input)
//In that page antoher 2 buttons: clear (clear que form) and submit 
// When is click the submit button alert 1: Are you sure you want to create this questions?
// alert 2:--> Question created suscessfully (ID : XXXXXXX)
// alert 3 --> An error ocurred. Try again. 
// After that the user will be sent it to  Page 2. (Ads same logic?)
// In Page 2 it would be updated automatically so the new question appears. 

//LOGIC 2 
// User sig in to the systems.
// Go to My ads // Ads history (if is admin)
// now see details of add 
// click button questions
//page 2: http://localhost:3000/Ads/Details/672e5a7a4332f8d119130b81
// here: 
// In second page created the table with the information at the end 1 buttons:  back
// In each question a button Answer (Disable if there is an anwser arleady)
// the logic of back button is the same that is in Ads 
// Answer button will direct me to Page 3 with the form to reply the questions. Something like:
//Question: Why is so expensive 
// Answer: Because the high quality (user input)
//In that page antoher 2 buttons: clear (clear que form) and submit 
// When is click the submit button alert 1: Are you sure you want to create this answer?
// alert 2:--> Answer created suscessfully. 
// alert 3 --> An error ocurred. Try again. 
// After that the user will be sent it to  Page 2. (Ads same logic?)
// In Page 2 it would be updated automatically so the new answer appears in the question.

// Question                     // Answer
// Why is so expensive          // Because the high quality


// Logic 3 (mY QUESTIONS)
// User click on MyQuestions
//SIMILAR TO MY ADDS BUT NO FILTERS


//qUESTION  // Answer // Action 

// Actions you have details  click open a new page
// that shows the specifi information of the question. 

//Buttons: Back, and Answer: ( Answer is disabled if there is an answer arleady).
//How to do it? look ads code



// there is a button in each question call answer. --> same logic, as previous.


