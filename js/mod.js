let modInfo = {
	name: "Loader's first idle game - rewritten",
	id: "firstgame",
	author: "loader3229",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "3.0",
	name: "Generators and Multiplier",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v3.0</h3><br>
		- Added 23 generators.<br>
		- Added multiplier.<br>
		- Added 3 multiplier upgrades.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(0)
	for(let i=11;i<=33;i++)gain = gain.add(tmp.g.buyables[i].effect);
	gain = gain.mul(player.m.points);
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function levelMultiplier(level){
	if(level.gte(1e8)){
		return Decimal.pow("1e+15340",level.div(200000)).mul(level);
	}
	let tm=level.div(200000).floor();
	level=level.sub(tm.mul(200000));
	if(tm.gte(100)){
		return Decimal.pow(1.01,level)
		.mul(Decimal.pow(2,level.div(10).floor()))
		.mul(Decimal.pow(2.5,level.div(50).floor()))
		.mul(Decimal.pow(200,level.div(100).floor()))
		.mul(Decimal.pow(3,level.div(200).floor()))
		.mul(Decimal.pow(333,level.div(400).floor()))
		.mul(Decimal.pow(100,level.div(1000).floor()))
		.mul(Decimal.pow(3,level.div(2000).floor()))
		.mul(Decimal.pow(5,level.div(4000).floor()))
		.mul(Decimal.pow(5,level.div(10000).floor()))
		.mul(Decimal.pow(20,level.div(20000).floor()))
		.mul(Decimal.pow(10,level.div(40000).floor()))
		.mul(Decimal.pow(10,level.div(50000).floor()))
		.mul(Decimal.pow(15,level.div(10000).floor()))
		.mul(Decimal.pow("1e+15338",tm))
		.mul(new Decimal(100).factorial().floor())
		.mul(Decimal.pow(100,tm.sub(100)));
	}
	return Decimal.pow(1.01,level)
	.mul(Decimal.pow(2,level.div(10).floor()))
	.mul(Decimal.pow(2.5,level.div(50).floor()))
	.mul(Decimal.pow(200,level.div(100).floor()))
	.mul(Decimal.pow(3,level.div(200).floor()))
	.mul(Decimal.pow(333,level.div(400).floor()))
	.mul(Decimal.pow(100,level.div(1000).floor()))
	.mul(Decimal.pow(3,level.div(2000).floor()))
	.mul(Decimal.pow(5,level.div(4000).floor()))
	.mul(Decimal.pow(5,level.div(10000).floor()))
	.mul(Decimal.pow(20,level.div(20000).floor()))
	.mul(Decimal.pow(10,level.div(40000).floor()))
	.mul(Decimal.pow(10,level.div(50000).floor()))
	.mul(Decimal.pow(15,level.div(10000).floor()))
	.mul(Decimal.pow("1e+15338",tm))
	.mul(tm.factorial().floor());
}