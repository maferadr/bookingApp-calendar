//Get current date

var currentDate = dayjs();
$('.currentDay').text(currentDate.format('dddd, ' + 'DD-MM-YYYY.'));

var labelHour;
var hourForm;
var btn;

//Array for all of the office hours that are going to be display in the screen.
var officeHours = [
    {time: '09:00', ampm: 'am', timeCode: 9},
    {time: '10:00', ampm: 'am', timeCode: 10},
    {time: '11:00', ampm: 'am', timeCode: 11},
    {time: '12:00', ampm: 'pm', timeCode: 12},
    {time: '01:00', ampm: 'pm', timeCode: 13},
    {time: '02:00', ampm: 'pm', timeCode: 14},
    {time: '03:00', ampm: 'pm', timeCode: 15},
    {time: '04:00', ampm: 'pm', timeCode: 16},
    {time: '05:00', ampm: 'pm', timeCode: 17},
];

//The times will be grabbed from the array and displayed on the screen.
var timeDisplayed = ()=>{
    for(var i = 0; i < officeHours.length; i++){
        //Iterate each array index.
        var eachTime = officeHours[i];
        //get current time
        var currentTime = dayjs().hour();

   for(var i = 0; i <= officeHours.length; i++){
        //Iterate each array index.
        var eachTime = officeHours[i];
        console.log(eachTime);

        //Create each row container to display each array item.
        var container = $('.row').addClass('g-3');
        var formContainer = $('<div class="col-auto">'); //parent

        labelHour = $('<label for="static">');
        labelHour.addClass('col-form-label');
        labelHour.attr('id', eachTime.timeCode) //Add an ID to compare values

        hourForm = $('<input type="text">');
        hourForm.addClass('form-control');
        hourForm.attr('id', 'inputValue')

        btn = $('<button type="button">')
        btn.addClass('btn btn-success');
        //Button function for submission
        btn.on('click', ()=>{
            var inputValue = $('#inputValue').val();
            console.log(inputValue)
            //Set items in localStorage
            localStorage.setItem('activity', JSON.stringify(inputValue))
            handleSubmission();
        });

        //Append elements created - Parents and Children.
        container.append(formContainer);
        formContainer.append(labelHour, hourForm, btn)
        btn.text('Save');

        console.log(currentTime)
        labelHour.text(eachTime.time + eachTime.ampm)


        //Confirm if the hour for book something has already passed and assign different Styles to let the user know.
        if (labelHour.attr('id') < currentTime) {
            hourForm.addClass('time-past');
            hourForm.prop('disabled', true)
        } else if (labelHour.attr('id') >= currentTime) {
            formContainer.addClass('allowedTime');
        }
   }

    }
}

timeDisplayed()

//In order to grab each value in localStorage
// 1. Assign property (id or value) to the input to call it into a function.
// 2. Each value will be get and set in localStorage. ==> Create my own function.4
function handleSubmission(){
        // //value is set up 
        // var newEvent = {
        //     time: labelHour.attr('id').val(),
        //     event: $('#inputValue'),
        // };
    
        // //add activity to localStorage
        // var eventBook = timeDisplayed();
        // eventBook.push(newEvent);
    
        //when activity is being booked, the label will change its color.
        hourForm.addClass('submitted');
    
}


