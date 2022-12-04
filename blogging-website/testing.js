let data = [{text: "hello world \n![]https \nsecond    hello world \n![]https third one", imageUrls: []}, {text: "object in fire \n![] secon dobject in fire"}]
// remove 
const removeImageLinksFromText = (text) => {
        
  let copyContent = ''
  
  text.forEach( posts => {
    posts.text.split("\n").forEach(lines => {
      
      if (!lines.startsWith("![]")) {
        copyContent += lines;
        posts.text = copyContent;
      }
    });
  });
};

console.log(removeImageLinksFromText(data));
console.log(data);