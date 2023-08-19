new Promise((resolve) => {
    Promise.resolve().then(() => console.log("a"));

    resolve("b");

    Promise.resolve().then(() => console.log("c"));
}).then((num) => {
    console.log(num);
});

Promise.resolve().then(() => console.log("d"));