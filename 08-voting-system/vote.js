let poll = new Map([
  ["Turkey", new Set()],
  ["Morocco", new Set()],
  ["Spain", new Set()]
]);

function addOption(option) {
    if (!poll.has(option) && option !== "") {
        poll.set(option, new Set());
        return `Option "${option}" added to the poll.`;
    }
    if(option === ""){
        return `Option cannot be empty.`;
    }
    return `Option "${option}" already exists.`;
}

function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`;
}
if (poll.get(option).has(voterId)) {
        return `Voter "${voterId}" has already voted for option "${option}".`;
    }
    poll.get(option).add(voterId);
    return `Voter "${voterId}" votedfor option "${option}".`;
}

function displayResults() {
    let results = [];
    for (let [option, voters] of poll.entries()) {
        results.push(`${option}: ${voters.size} votes`);
    }
    return "Poll Results:\n"+results.join("\n");
}

console.log(addOption("Egypt"));
console.log(addOption(""));
console.log(addOption("Turkey"));
console.log(vote("Malaysia","traveler1")); 
console.log(vote("Algeria","traveler1")); 
console.log(vote("Turkey","traveler1")); 
console.log(displayResults());

/* Expected Output:
Option "Egypt" added to the poll.
Option cannot be empty.
Option "Turkey" already exists.
Option "Malaysia" does not exist.
Option "Algeria" does not exist.
Voter "traveler1" voted for option "Turkey".
Poll Results:
Turkey: 1 votes
Morocco: 0 votes
Spain: 0 votes
Spain: 0 votes
Egypt: 0 votes
*/
