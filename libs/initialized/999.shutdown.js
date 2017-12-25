if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}
process.on('SIGINT', () => {
    mongoose.disconnect();
    setTimeout(() => {
        process.exit(0)
    }, 300)
});

process.on('exit', (code) => {
    Logger.log(`About to exit with code: ${code}`);
    mongoose.disconnect();
});