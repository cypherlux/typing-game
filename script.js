const quotes = [
    'The only limit is your own imagination.',
    'The gods came to dance.',
    'My heart is hooked forever!',
    'Dream bodies hover between the dream world...',
    'The intention of our minds is powerful...and a curse.',
    'There is more to reality than meets a normal eye.',
]

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let wordQueue;
let highlightPosition;
let startTime;


function startGame(){
    console.log("Game started");
    document.body.className = "";
    start.className = "started";

    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    // quoteText = "type me";
    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    startTime = new Date().getTime();
}
start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);

function checkInput() {
    console.log("Checking", input.value);
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
    const typedValue = input.value.trim();

    if(currentWord !== typedValue){
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }
    wordQueue.shift();
    input.value = "";

    quote.childNodes[highlightPosition].className = "";

    if(wordQueue.length === 0){
        gameOver();
        return;
    }
    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
}

function gameOver(){
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `<span class="congrats">Congratulations!</span>
    <br>
    You finished in ${elapsedTime/1000} seconds`;

}