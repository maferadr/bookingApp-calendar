// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist


var currentDate = dayjs();
$('.currentDay').text(currentDate.format('dddd, ' + 'DD-MM-YYYY.'));

//Global Variables to call them and Create elements.

var formContainer = $('.row');
var eachContainer = $('.col-auto');
var timeBooked = $('#time');
var inputEvent = $('#inputEvent');
var btnSave = $('#button');

var labelHour = $('<label for="static">');
labelHour.addClass('col-form-label');

var hourForm = $('<input type="text">');
hourForm.addClass('form-control');

var btn = $('<button type="button">')
btn.addClass('btn btn-success');

//Index variable in 0 to iterate it
var index = 0;

formContainer.append(eachContainer);
timeBooked.append(labelHour);
inputEvent.append(hourForm);
btnSave.append(btn);

btn.text('Save');

//Array for all of the office hours that are going to be display in the screen.
var officeHours = [
    {time: 9},
    {time: 10},
    {time: 11},
    {time: 12},
    {time: 1},
    {time: 2},
    {time: 3},
    {time: 4},
    {time: 5},
];

//The times will be grabbed from the array and displayed on the screen.
var timeDisplayed = ()=>{
    //Iterate each array index.
    var eachTime = officeHours[index];

    //For each hour displayed, grab a time value and convert into a format.
   for(var i = 0; i <= officeHours.length; i++){
        //Dayjs format

        eachTime = dayjs(officeHours.time).format('hh:mm');
        var timeIterator = index + 1;
        console.log(eachTime);
        //get current time
        var currentTime = dayjs().startOf('hour');
        console.log(currentTime)
        labelHour.text(eachTime); //It's supposed to iterate each time displayed.


        //Assign conditional for am or pm
        if(officeHours.length <= 3){
            eachTime = dayjs().format('hh:mm[am]')
        }else{
            eachTime = dayjs().format('hh:mm[pm]')
        }
   }

   //Confirm if the hour for book something has already passed and assign different Styles to let the user know.
   if (eachTime.isBefore(currentTime)) {
    hourForm.addClass('time-past');
    hourForm.disabled = true;
  } else if (eachTime.isSame(currentTime)) {
    formContainer.addClass('allowedTime');
    hourForm.disabled = false;
  }
}
timeDisplayed()

//Reads each booked activity by the user
function activity(){
    var activity = localStorage.getItem('activity');
    if(activity){
        activity = JSON.parse(activity);
    }else{
        activity = [];
    }
    return activity;
}

//Each value is grabbed at localStorage
var bookInput = ()=>{
    var inputValue = hourForm.val()
    localStorage.setItem('input', JSON.stringify(inputValue));
}

function handleBookedActivity(e){
    e.preventDefault();

    //value is set up 
    var time = labelHour.val();
    var actBooked = hourForm.val();

    var newEvent = {
        time: time,
        event: actBooked,
    };

    //add activity to localStorage
    var eventBook = activity();
    eventBook.push(newEvent);
    bookInput(eventBook);

    //when activity is being booked, the label
    hourForm.addClass('submitted');
}

btn.on('submit', handleBookedActivity);

// var baseTime = dayjs();
// var endTime = 17;

// function hoursIterator(){
//     for(var i = baseTime; i < endTime; i++){
//         labelHour.text(iterator)
//     }}

// var iterator = hoursIterator(baseTime, endTime);

// for(var hour of iterator){
//     console.log(hour.format('HH:mm'))
// }

//Assign a function to call for the timeDisplayed one and let the user set up
//a valid AND NOT past hour. ==> isBefore could be.

//Local Storage

// var officeHours = ()=>{
//     var time = 9[index];
//     var timeIterator = time + 1;
//     for(var i = 9; i <= timeIterator.length || timeIterator.length <= 17; i++){
//         labelHour.text(timeIterator);
//     }}
// officeHours()    

// var time = dayjs().format('hh:mm:ss');
// $('#3a').text(time);
var startHour = dayjs().hour(9).format('HH:mm');
var endHour = dayjs().hour(5).format('HH:mm' + 'pm');

// console.log(startHour);
// console.log(endHour)

//Loop time to display each of the time grabbed from dayjs ==> labelhour.text
//Logic will be set up in either two ways:
// 1. For loop to iterate each of the times grabbed from dayjs. 
//  Check on Startof and Endof sequences of dayjs.
// 2. If not, we'll assign the hours under an array and through a function, and an increment
//index, we'll display each of the hours. 
// 3.isBefore can be applied for the time that has already passed - User won't be able to book any appt from a past hour.
