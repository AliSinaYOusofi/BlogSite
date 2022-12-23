const jwt = require("jsonwebtoken");
let data = [
  {
    id: 'b6a11daedfddd4f2f7b3b5f91b510f3a21c7a119f0b1f805be147025c74a7af9d72df0b72d8604424d4e901657357b7523f2b19d84857959f48cae5624cc1881b6c',
    poster: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9uZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im9uZSIsImlhdCI6MTY3MDE1NDM5NX0.-hyv_lGlAQqgfy3YJEYMlcIfmRNJl15kI9k76iep2DA',
    content: 'Hello world from the parallel universe of the world. life is good till it goes badly for all of us.\n' +
      'Another line\n' +
      'for checking my access token if\n' +
      'we can get it through the user profile\n' +
      'thats right may man\n',
    imageUrls: [],
    __v: 0,
    reply: [{'one': 3, 'two': 2}]
  },
];

let search = "through it";
let reverse = search.split(" ").reverse().join(" ");

data.forEach(item => {
  if (item.content.toLocaleLowerCase().includes("Hello world from the parallel".toLowerCase())) {
    console.log("includes")
  }
})
// NAfNAusteHj7ppc

