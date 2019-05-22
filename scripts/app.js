// load event here
window.addEventListener('load', start);

// global things here
let time = 6,
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
    let puzzle = words.puzzle;

    textDisplay.innerHTML = puzzle;
}

async function start() {

    // waiting for the data here
    await getApi();

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
        // // creating the para here
        // let para = document.createElement('p');

        // // adding class here
        // para.className = 'alert alert-info text-center';
        messageDiv.innerHTML = 'Game Over...';
    }
    // messageDiv.appendChild(para)


}
