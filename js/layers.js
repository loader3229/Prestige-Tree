function generateGen(a,b,c){
	return {
		title: "Generator "+a, // Optional, displayed at the top in a larger font
		cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
			let cost = Decimal.pow(1.2, x).mul(b)
			return cost
		},
		baseCost: b,
		effect() {
			return levelMultiplier(player[this.layer].buyables[this.id]).mul(player[this.layer].buyables[this.id]).mul(c);
		},
		display() { // Everything else displayed in the buyable button after the title
			let data = tmp[this.layer].buyables[this.id]
			return "Level: "+format(player.g.buyables[this.id])+"<br>"+
			"Generating "+format(data.effect)+" base points per second<br>"+
			"Cost: "+format(data.cost)+" points";
		},
		unlocked() { return true }, 
		canAfford() {
			return player.points.gte(tmp[this.layer].buyables[this.id].cost)
		},
		buy() { 
			cost = tmp[this.layer].buyables[this.id].cost
			if(!hasUpgrade("m",12))player.points = player.points.sub(cost)	
			player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
		},
		buyMax() {}, // You'll have to handle this yourself if you want
		style: {'height':'222px'},
	}
}

addLayer("g", {
    name: "g", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#88ff88",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "score", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    ],
    layerShown(){return true},
	buyables: {
		rows: 1,
		cols: 23,
		11: generateGen(1,new Decimal(1),new Decimal(1)),
		12: generateGen(2,new Decimal(1e5),new Decimal(1e5)),
		13: generateGen(3,new Decimal(1e11),new Decimal(1e11)),
		14: generateGen(4,new Decimal(1e18),new Decimal(1e18)),
		15: generateGen(5,new Decimal(1e26),new Decimal(1e26)),
		16: generateGen(6,new Decimal(1e35),new Decimal(1e35)),
		17: generateGen(7,new Decimal(1e46),new Decimal(1e46)),
		18: generateGen(8,new Decimal(1e58),new Decimal(1e58)),
		19: generateGen(9,new Decimal(1e71),new Decimal(1e71)),
		20: generateGen(10,new Decimal(1e85),new Decimal(1e85)),
		21: generateGen(11,new Decimal(1e100),new Decimal(1e100)),
		22: generateGen(12,new Decimal(1e300),new Decimal(5.14e292)),
		23: generateGen(13,new Decimal("1e700"),new Decimal("1.5091169225312984e680")),
		24: generateGen(14,new Decimal("1e1500"),new Decimal("1.1857870312806797e1455")),
		25: generateGen(15,new Decimal("1e3100"),new Decimal("6.6143824369871975e3004")),
		26: generateGen(16,new Decimal("1e6300"),new Decimal("1.840128766131857e6104")),
		27: generateGen(17,new Decimal("1e12700"),new Decimal("1.258026891093282e12303")),
		28: generateGen(18,new Decimal("1e25500"),new Decimal("5.123513208709596e24700")),
		29: generateGen(19,new Decimal("1e51100"),new Decimal("7.3065253993001e49495")),
		30: generateGen(20,new Decimal("1e102300"),new Decimal("1.272688007777806e99086")),
		31: generateGen(21,new Decimal("1e204700"),new Decimal("3.536615298781819e198266")),
		32: generateGen(22,new Decimal("1e409500"),new Decimal("7.24811850415791e396626")),
		33: generateGen(23,new Decimal("1e819100"),new Decimal("3.4308622552222783e793347")),
	},
	update(){
		let total= new Decimal(0)
		for(let i=11;i<=33;i++)total = total.add(player.g.buyables[i]);
		player.g.points = player.g.points.max(total);
		
		if(hasUpgrade('m',11))for(let i=11;i<=33;i++)buyBuyable('g',i);
		if(hasUpgrade('m',13) && player.points.gte(1))for(let i=11;i<=33;i++){
			player.g.buyables[i] = player.g.buyables[i].max(player.points.div(layers.g.buyables[i].baseCost).log(1.2).add(1).max(0).floor());
		}
	}
})


addLayer("m", {
    name: "m", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#8888ff",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "multiplier", // Name of prestige currency
    baseResource: "points per second", // Name of resource prestige is based on
    baseAmount() {return getPointGen()}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    ],
    layerShown(){return true},
	effectDescription() { // Optional text to describe the effects
           return "translated to a "+format(player.m.points)+"x multiplier to point gain"
       },
	  getResetGain(){
		  let gain = getPointGen();
		  if(gain.plus(2).log(2).gte(950))return new Decimal(700).mul(gain.div(new Decimal(Math.pow(2,350))).pow(0.02)).mul(gain.div(new Decimal(Math.pow(2,950))).pow(0.005)).sub(player.m.points.add(1)).floor().max(0);
		  if(gain.plus(2).log(2).gte(350))return new Decimal(700).mul(gain.div(new Decimal(Math.pow(2,350))).pow(0.02)).sub(player.m.points.add(1)).floor().max(0);
		  return gain.plus(2).log(2).mul(2).sub(player.m.points.add(1)).floor().max(0);
	  },
	  getNextAt(a){
		  let r = player.m.points.add(a?tmp.m.getResetGain:0).add(2);
		  if(r.gte(2867200))return r.div(700).pow(40).mul(new Decimal(Math.pow(2,470)));
		  if(r.gte(700))return r.div(700).pow(50).mul(new Decimal(Math.pow(2,350)));
		  return Decimal.pow(2,r.div(2)).sub(2).max(1e9);
	  },
	  canBuyMax(){return true},
	  branches:['g'],
	  upgrades:{
		  rows: 1,
		  cols: 3,
		  11: {
                description: "Autobuy Generators.",
                cost: new Decimal(100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
            },
		  12: {
                description: "Buying generators cost nothing.",
                cost: new Decimal(5000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
            },
		  13: {
                description: "Autobuy max Generators (cost nothing).",
                cost: new Decimal(100000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
            },
	  },
	update(){
		player.m.points = player.m.points.max(1);
	}
})
