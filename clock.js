const clock_element = document.getElementById('clockItem');
setInterval(clock, 1000);

function clock(){
    let date = new Date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    state_hours = null
    
    if(hours >= 12)
    {
        if(hours > 12) hours -=12
        state_hours = 'PM'
    }
    else state_hours = 'AM'

    hours = hours < 10 ? '0'+hours : hours
    minutes = minutes < 10 ? '0'+minutes : minutes
    seconds = seconds < 10 ? '0'+seconds : seconds

    general_date = hours + ':' + minutes + ':' + seconds + ' ' + state_hours;

    console.log(`${hours}, ${minutes}, ${seconds}, ${state_hours}`)
    console.log(general_date)

    clock_element.innerText = general_date;
}