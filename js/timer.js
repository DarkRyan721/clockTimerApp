const enter = document.getElementById("enterInput");
const reset = document.getElementById("resetInput");

const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

var hours = parseInt(inputHours.getAttribute("value"), 10);
var minutes = parseInt(inputMinutes.getAttribute("value"), 10);
var seconds = parseInt(inputSeconds.getAttribute("value"), 10);

var timeSelected = [inputHours, inputMinutes, inputSeconds];
var timeSelectedNumber = [hours, minutes, seconds];
var timerUpdate = 0;
var timeSelected2Number = timeSelectedNumber.slice();

const toZero = (numberValue) => { return numberValue < 10 ? "0" + numberValue : numberValue; };

const valueRetornedTime = (timeSelected) => {
    if (Math.floor(timeSelected[2] / 60) >= 1) {
        timeSelected[1] += Math.floor(timeSelected[2] / 60);
        timeSelected[2] = timeSelected[2] % 60;
    }
    if (Math.floor(timeSelected[1] / 60) >= 1) {
        timeSelected[0] += Math.floor(timeSelected[1] / 60);
        timeSelected[1] = timeSelected[1] % 60;
    }
    return timeSelected;
};

const returnTime = (timeSelected) => {
    if (timeSelected[0] > 0 && timeSelected[1] === 0 && timeSelected[2] === 0) {
        timeSelected[1] = 60;
        timeSelected[0]--;
    }
    if (timeSelected[1] > 0 && timeSelected[2] === 0) {
        timeSelected[1]--;
        timeSelected[2] = 60;
    }
    return timeSelected;
}

const allZeros = (timeSelected) => {
    return timeSelected.every((element) => {
        return element === 0;
    });
};

const countTimer = (timeSelectedNumber, inputHours, inputMinutes, inputSeconds) => {
    if (!allZeros(timeSelectedNumber)) {
        timerUpdate = setInterval(() => {
            timeSelectedNumber = returnTime(timeSelectedNumber);
            if (timeSelectedNumber[2] >= 0 && !allZeros(timeSelectedNumber)) {
                timeSelectedNumber[2]--;
                inputHours.setAttribute("value", toZero(timeSelectedNumber[0]));
                inputMinutes.setAttribute("value", toZero(timeSelectedNumber[1]));
                inputSeconds.setAttribute("value", toZero(timeSelectedNumber[2]));
            }
            if (allZeros(timeSelectedNumber)) {
                clearInterval(timerUpdate);
                timerUpdate = 0;
            }
        }, 1000);
    }

};

document.addEventListener("wheel", function (event) {
    // event.preventDefault();
    if (timerUpdate === 0) {
        const delta = -Math.sign(event.deltaY);
        if (event.target.tagName === "INPUT") {
            const input = event.target;
            if (input.value - 1 >= 0 || delta != -1) {

                if (input.id === "hours") {
                    let valueBeforeHours = parseInt(input.value, 10);
                    if (!isNaN(valueBeforeHours)) {
                        let newValue = valueBeforeHours + delta;
                        input.setAttribute("value", toZero(newValue));
                    }
                }

                if (input.id === "minutes") {
                    let valueBeforeMinutes = parseInt(input.value, 10);
                    if (!isNaN(valueBeforeMinutes)) {
                        let newValue = valueBeforeMinutes + delta;
                        input.setAttribute("value", toZero(newValue));
                    }
                }

                if (input.id === "seconds") {
                    let valueBeforeSeconds = parseInt(input.value, 10);
                    if (!isNaN(valueBeforeSeconds)) {
                        let newValue = valueBeforeSeconds + delta;
                        input.setAttribute("value", toZero(newValue));
                    }
                }
            }
        }
    }
}
);

enter.addEventListener("click", function (event) {
    if (timerUpdate === 0) {
        hours = parseInt(inputHours.getAttribute("value"), 10);
        minutes = parseInt(inputMinutes.getAttribute("value"), 10);
        seconds = parseInt(inputSeconds.getAttribute("value"), 10);
        timerUpdate = 0;
        timeSelectedNumber = [hours, minutes, seconds];
        timeSelectedNumber = valueRetornedTime(timeSelectedNumber);
        timeSelected2Number = timeSelectedNumber.slice();
        if (timerUpdate === 0) {
            countTimer(timeSelectedNumber, inputHours, inputMinutes, inputSeconds);
            enter.textContent = "Pause";
        }
    }
    else {
        enter.textContent = "Enter";
        clearInterval(timerUpdate);
        timerUpdate = 0;
    }
});

reset.addEventListener("click", function (event) {
    if (timerUpdate != 0) {
        clearInterval(timerUpdate);
        timerUpdate = 0;
        timeSelectedNumber = valueRetornedTime(timeSelected2Number.slice());
        console.log(timeSelectedNumber);
        inputHours.setAttribute("value", toZero(timeSelectedNumber[0]));
        inputMinutes.setAttribute("value", toZero(timeSelectedNumber[1]));
        inputSeconds.setAttribute("value", toZero(timeSelectedNumber[2]));
        enter.textContent = "Enter";
        // if (timerUpdate === 0) {
        //     countTimer(timeSelectedNumber, inputHours, inputMinutes, inputSeconds);
        // }
    }
});


