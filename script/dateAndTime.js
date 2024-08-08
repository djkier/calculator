const timeNow = document.querySelector('#time-now');
const spanTime = document.createElement('span');



function formatSingleDigit(time){
    return time < 10 ? `0${time}` : time;
}

function timeChanger() {
    const now = new Date;
    const hoursMilitary = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const period = hoursMilitary >= 12 ? 'PM' : 'AM'
    const displayHours = hoursMilitary % 12 === 0 ? 12 : hoursMilitary % 12;

    const timeChange = `${formatSingleDigit(displayHours)}:${formatSingleDigit(minutes)}:${formatSingleDigit(seconds)} ${period}`
    spanTime.textContent = timeChange;
    timeNow.appendChild(spanTime)
    console.log(timeChange);
}

setInterval(timeChanger, 1000)


