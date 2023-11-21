//Get current date

var currentDate = dayjs();
$('.currentDay').text(currentDate.format('dddd, ' + 'DD-MM-YYYY.'));

//Global Variables to call them and Create elements.

//Index variable in 0 to iterate it
// var index = 0;

//Array for all of the office hours that are going to be display in the screen.
var officeHours = [
    {time: '09:00'},
    {time: '10:00'},
    {time: '11:00'},
    {time: '12:00'},
    {time: '01:00'},
    {time: '02:00'},
    {time: '03:00'},
    {time: '04:00'},
    {time: '05:00'},
];

//The times will be grabbed from the array and displayed on the screen.
var timeDisplayed = ()=>{

    //For each hour displayed, grab a time value and convert into a format.
   for(var i = 0; i <= officeHours.length; i++){
        //Iterate each array index.
        var eachTime = officeHours[i];
        console.log(eachTime);
        //get current time
        var currentTime = dayjs().startOf('hour');

        var formContainer = $('.row'); //parent
        var eachContainer = $('.col-auto');
        var timeBooked = $('#time');
        var inputEvent = $('#inputEvent');
        var btnSave = $('#button');

        var arrayElements = [
            timeBooked,
            inputEvent,
            btnSave
        ]

        var hourForm = $('<input type="text">');
        hourForm.addClass('form-control');

        var btn = $('<button type="button">')
        btn.addClass('btn btn-success');

        
        var labelHour = $('<label for="static">');
        labelHour.addClass('col-form-label');
        labelHour.attr('id', eachTime.time) //Add an ID

        // console.log(currentTime)
    
        //Reassign the parent elements.
        formContainer.append(eachContainer);
        formContainer.append(arrayElements);

        inputEvent.append(hourForm);
        labelHour.text(eachTime.time); //It's supposed to iterate each time displayed.
        timeBooked.append(labelHour);
        btn.text('Save');
        btnSave.append(btn);



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
    var inputValue = hourForm.val()
    var activity = localStorage.getItem('input');
    if(activity){
        activity = JSON.parse(inputValue);
    }else{
        activity = [];
    }
    return activity;
}

//Each value is grabbed at localStorage
var bookInput = ()=>{
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
