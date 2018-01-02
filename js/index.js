"use strict";

let commands;

const backupPoolCommands = [
   {  
      "name":"Paddles up",
      "description":`
      <ul>
      	<li>Ready to paddle
      		<li>Paddle out of the water but you are in your position ready to perform the catch</li>
      		<li>back straight</li>
      		<li>bottom arm extended</li>
      		<li>rotation from your core</li>
      	</li>
      </ul>`,
      "gif":""
   },
   {
   		"name": "Catch",
   		"description": `
   		<ul>
   			<li>Stretch as far as you can.</li>
   			<li>Imagine spearing a fish in front of you.</li>
   			<li>Another analogy: Imagine pole vaulting and putting all your weight down on your paddle
   				<li>makes more sense on the actual boat</li>
   			</li>
   		</ul>`,
   		"gif": ""
   },
   {
   		"name": "Half Stroke",
   		"description": "The first half of the stroke. Emphasis on the rotation of the stroke. Keep your bottom arm straight. Stop at around the mid thigh.",
   		"gif": ""
   },
	{
		"name": "Second Half",
		"description": "The second half of the stroke. Start bending your bottom arm. ",
		"gif": "",
	},
	{
		"name": "Recovery",
		"description": "Bring your paddle up to the 'Paddles up' position leading with your top arm.",
		"gif": "",
	}

];

// deep copy of the pool commands
let poolCommands = JSON.parse(JSON.stringify(backupPoolCommands));

const backupCommands = [  
   {  
      "name":"Back it down",
      "description":"make small strokes with your paddle backwards to move the boat backwards/out of the dock",
      "gif":""
   },
   {  
      "name":"Hold",
      "description":`
      <ul>
      	<li>Place your paddle in the water to slow/stop the boat’s momentum
      		<li>also known as ‘check’ - you may hear this at regattas</li>
      	</li>
      </ul>`,
      "gif":""
   },
   {  
      "name":"Hold hard",
      "description":"place paddle vertically into water to stop the boat from moving",
      "gif":""
   },
   {  
      "name":"Feather",
      "description":`
      <ul>
      	<li>Run paddle back and forth across water
      		<li>Imagine spreading peanut butter on toast mmmm to hold the boat steady
      		</li>
      	</li>
      </ul>`,
      "gif":""
   },
   {  
      "name":"Draw",
      "description":`
      <ul>
      	<li>used to straighten up the boat.</li>
      	<li>Paddles placed perpendicularly to the side of the boat and strokes taken towards the boat</li>
      </ul>`,
      "gif":""
   },
   {  
      "name":"Paddles up",
      "description":`
      <ul>
      	<li>Ready to paddle
      		<li>Paddle out of the water but you are in your position ready to perform the catch</li>
      		<li>back straight</li>
      		<li>bottom arm extended</li>
      		<li>rotation from your core</li>
      	</li>
      </ul>`,
      "gif":""
   },
   {  
      "name":"Take it away",
      "description":"start paddling",
      "gif":""
   },
   {  
      "name":"Race ready",
      "description":"Same as 'Ready Ready'. Race start position, paddles buried in the water, weight over the water",
      "gif":""
   },
   {  
      "name":"Ready ready",
      "description":"Same as 'Race ready'. Race start position, paddles buried in the water, weight over the water",
      "gif":""
   },
   {  
      "name":"Eyes up",
      "description":"call made when the boat isn’t in sync (remember how Ben taught us to watch the people at the front, and not the person sitting in front of you)",
      "gif":""
   },
   {  
      "name":"Let it run",
      "description":"Stop paddling",
      "gif":""
   }
];

// deep copy of lake commands
let lakeCommands = JSON.parse(JSON.stringify(backupCommands))

const seats = {
	"Seat": "row (eg. seat 4 = 4th row)",
	"Pacers": "seats 1-3",
	"Engine (room)": "seats 4-7",
	"Rockets": "seats 8-10",
	"Pod": "the boat can be split up into pods of 2 rows. Seats 1-2, 3-4, 5-6, 7-8, 9-10"
};

/**
 * load the first command and it's description.
 * Then show the answer a few seconds later.
 * TODO: show a 5,4,3,2,1 timer
 * TODO: hide the buttons when not present
 */
function loadNextCommand() {
	const feedbackButtons = document.getElementById("feedbackButtons");

	document.getElementById("command").innerHTML = commands[0].name;
	document.getElementById("description").innerHTML = commands[0].description;
	document.getElementById("answer").style.display = "none";
	feedbackButtons.style.display = "none";

	setTimeout(
    	function() {
    		document.getElementById("answer").style.display = "inline";
      		document.getElementById('response').innerHTML = `<img src="${commands[0].gif}"></img>`;
      	feedbackButtons.style.display = "inline";
    	}, 5000);

	timer(5);
}

function learnLakeCommands() {
	document.getElementById("start").style.display = "none";
	document.getElementById("question").style.display = "inline";
	commands = lakeCommands;
	loadNextCommand();
}

function learnPoolCommands() {
	document.getElementById("start").style.display = "none";
	document.getElementById("question").style.display = "inline";
	commands = poolCommands;
	loadNextCommand();
}

/**
 *  Run when the "Got It" button is pressed
 */
function gotIt() {
	commands.shift();
	if (commands.length === 0) {
		document.getElementById("start").style.display = "none";
		document.getElementById("question").style.display = "none";
		document.getElementById("answer").style.display = "none";

		// reset
		document.getElementById("start").style.display = "inline";
		commands = JSON.parse(JSON.stringify(backupCommands))
		alert("Congrats! You finished!");

	} else {
		loadNextCommand();
	}
}

/**
 * Run when the "Not Yet!" button is pressed
 */
function notYet() {
	// Working memory has a capacity of around 3-7 items. 
	const GAP = 3;
	moveArrayItem(commands, 0, GAP);
	loadNextCommand();
}

/** 
 * Moves the item in "array" in the "from" index to the "to" index
 * 
 * @param {Array<*>} array
 * @param {array index of array} from - index of item we're moving FROM
 * @param {array index of array} to - index we're moving TO
 */
function moveArrayItem(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}