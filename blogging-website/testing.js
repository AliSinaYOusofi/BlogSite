const data = "hello world ![](https://helloworld.com)"

data.split(" ").forEach( item => {
    if (item.startsWith("![]"))
        console.log("found one", item);
    else console.log(item);
})