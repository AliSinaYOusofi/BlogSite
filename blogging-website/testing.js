let aboutJS = {
    creator: "Brendan Eich",
  	year: 1995,
}

// you can't access keys this way
console.log(aboutJS[creator]) // error: creator is undefined
// because js interprets creator as a variable since we have not
// defined it we get error.

console.log(aboutJS["creator"]); // this will work fine

// if you have a variable that stores the key name in string,
// only then you can use that while accessing properties of an object

// this will work fine since creator is stored in the variable
// and the value of it is used as a key in the object
let jsCreator = "creator";
console.log(aboutJS[jsCreator]);