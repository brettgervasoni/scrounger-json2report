const minimist = require('minimist')
const fs = require('fs');

module.exports = () => {
	const args = minimist(process.argv.slice(2))
	const cmd = args._[0]

	if (!fs.existsSync(cmd)) {
		console.log('Usage: '+process.argv[1]+' <scrounger-results-json>');
		if (cmd != null) {
			console.log('File does not exist: '+cmd);
		}
		process.exit(1);
	}

	var contents = fs.readFileSync(cmd);
	var json = JSON.parse(contents);

	json.forEach(function(entry) {
		console.log('--- '+entry.severity+' - '+entry.title);

		entry.details = entry.details.replace(/\n \* L/g, '\n  * L'); //printing source code
		entry.details = entry.details.replace(/\n\* \//g, '\n/'); //printing files
		entry.details = entry.details.replace(/ \: </g, ':\n<'); //fixing formatting errors

		if (entry.details == '') {
			entry.details = 'No evidence, thanks for that Scrounger';
		}

		console.log(entry.details.trim()+'\n');
	});
}
