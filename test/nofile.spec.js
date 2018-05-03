const {
		report
} = require("assertivity").generate();
const nofile = require(__dirname + "/../src/nofile.js");

nofile.find("examples/file-{n}.json").then(function(file) {
		report.as("No-file was found asynchronously").that.it(file).is("examples/file-3.json");
});

report.as("No-file was found synchronously").that.it(nofile.findSync("examples/file-{n}.json")).is("examples/file-3.json");