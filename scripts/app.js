// load event here
window.addEventListener('load', start);

// global things here
let time = 16,
    score = 0
status;

// getting the references here
const textDisplay = document.querySelector('#typeWord');
const inputText = document.querySelector('#typeText');
const selectLevelTime = document.querySelector('#selectLevel');
const RemainingTime = document.querySelector('#timeLeft');
const RemainingScore = document.querySelector('#scoreValue');
const messageDiv = document.querySelector('#resultHere');

// getting the random words here
const getApi = async (level) => {

    // fetching the data here 
    let data = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${level}`);
    // getting the words array here
    let words = await data.json();
    // getting the words here
    return words.puzzle;
}

// adding event listener on the select list
selectLevelTime.addEventListener('change', (e) => {

    if (e.target.value === '5') {
        start(1)


    }
    else if (e.target.value === '3') {
        start(2)
    }
    else if (e.target.value === '2') {
        start(3)

    }

})

async function start(val) {

    // waiting for the data here
    let word = await getApi(val);

    textDisplay.innerHTML = word;

    // adding the input event listener
    inputText.addEventListener('input', (e) => {

        if (e.target.value.toLowerCase() === word.toLowerCase()) {
            // // adding class here
            messageDiv.className = 'alert alert-success text-center';

            // setting the text
            messageDiv.innerHTML = 'Correct..!';

            // removing the correct msg here
            setTimeout(() => {
                messageDiv.remove('.alert')
            }, 1200);


            // managing the status here
            // status = true;

            // clearing the input here
            e.target.value = '';

            // incrementing the score here
            score++;

            // adding the score in the UI
            RemainingScore.innerHTML = score;

            start();
            time += 20;

        }

    });
    time += 20;



    // setting for the time here
    setInterval(timeRemain, 1000);

    // checking for the status and time
    setInterval(checkStatus, 5)


}


// time cal function here
let timeRemain = () => {

    if (time > 0) {
        time--;
    }
    else if (time === 0) {
        status = false;
        score = -1;
    }
    // displaying the time here
    RemainingTime.innerHTML = time;



}

// checking fot the result
let checkStatus = () => {

    if (!status && time === 0) {

        // // adding class here
        messageDiv.className = 'alert alert-info text-center';

        // setting the text
        messageDiv.innerHTML = 'Game Over...';
    }

}