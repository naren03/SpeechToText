window.SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

//speech recognition var
let myRecognition = new window.SpeechRecognition();

//random Number generator
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log('Number:' + randomNumber);

//all event listeners
const mainBox = document.querySelector('.output');

//recording voice
myRecognition.start();

//when voice is detected and ready
myRecognition.addEventListener('result', (event) => {
	let userInput = event.results[0][0].transcript;
	chkNumber(userInput);
});

//when everything stops start recording again
myRecognition.addEventListener('end', () => {
	myRecognition.start();
});

//reload page
document.body.addEventListener('click', (e) => {
	if (e.target.id == 'play-again') {
		window.location.reload();
	}
});

//check the number given by user
function chkNumber(msg) {
	const number = +msg;

	//display what user said
	mainBox.innerHTML = `<p>You Said:</p><span>${msg}</span>`;

	// Number or not
	if (Number.isNaN(number)) {
		mainBox.innerHTML += `<p class="message">It Is Not Valid Number</p>`;
	}

	//if number is equal
	if (number === randomNumber) {
		document.body.innerHTML = `<div class="success"><h1>Congrats! You Have Guessed The Number</h1><h3>It Was ${number}</h3><button id="play-again">Play Again</button></div>`;
	}

	//out of range
	if (number > 100 || number < 1) {
		mainBox.innerHTML += `<p class="message">Number Should Be Between 1-100</p>`;
		return;
	}

	//less than original number
	if (number < randomNumber) {
		mainBox.innerHTML += `<p class="message">Go Higher</p>`;
	}

	// greater than original number
	if (number > randomNumber) {
		mainBox.innerHTML += `<p class="message">Go Lower</p>`;
	}
}
