// load event here
window.addEventListener('load', start);

// global things here
let time = 10,
    score = 0
status;

// getting the references here
const textDisplay = document.querySelector('#typeWord');
const inputText = document.querySelector('#typeText');
const selectLevelTime = document.querySelector('#selectLevel');
const RemainingTime = document.querySelector('#timeLeft');
const RemainingScore = document.querySelector('#scoreValue');
const messageDiv = document.querySelector('#resultHere')
// getting the random words here
const getApi = async (level = 1) => {

    // fetching the data here 
    let data = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${level}`);
    // getting the words array here
    let words = await data.json();
    // getting the words here
    return words.puzzle;
}

async function start() {

    // waiting for the data here
    let word = await getApi();

    textDisplay.innerHTML = word;

    // adding the input event listener
    inputText.addEventListener('input', (e) => {

        if (e.target.value.toLowerCase() === word.toLowerCase()) {
            // // adding class here
            messageDiv.className = 'alert alert-success text-center';

            // setting the text
            messageDiv.innerHTML = 'Correct..!';
        }

    });


    // setting for the time here
    setInterval(timeRemain, 1100);

    // setting for the result message
    setInterval(checkStatus, 50);

}

// time cal function here
let timeRemain = () => {

    if (time > 0) {
        time--;
    }
    else if (time === 0) {
        status = false;
    }
    // displaying the time here
    RemainingTime.innerHTML = time;
}



// adding event listener on the select list
selectLevelTime.addEventListener('change', (e) => {

    if (e.target.value === '5') {
        getApi(1);
    }
    else if (e.target.value === '3') {
        getApi(2);
    }
    else {
        getApi(3);
    }

})

// checking fot the result
let checkStatus = () => {

    if (!status && time === 0) {
        // // adding class here
        messageDiv.className = 'alert alert-info text-center';

        // setting the text
        messageDiv.innerHTML = 'Game Over...';
    }


}
