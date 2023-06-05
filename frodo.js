const fs = require('fs');
const hlp = require('./modules/helpers');
const {createAppData} = require('./modules/appData');
const {singleRequestPromise, buildRequestPromisArray} = require('./modules/requests');
const {createReport} = require('./modules/output');

// Load app settings
const settings = JSON.parse(fs.readFileSync('./settings.json'));

// Load crawler config
const config = hlp.readJSON(process.argv[2]);

// Load data file
const data = hlp.readJSON(process.argv[3]);

// Create directories if they don't exist
hlp.createDirIfRequired(settings.outputDirectory);
hlp.createDirIfRequired(settings.saveDirectory);

// Check are all parameters available
if (!config || !data) {
    hlp.notAllArgsProvided();
}

// Create app data object
let appData = createAppData(config, hlp.getTimestamp('YYYY-MM-DD_HH-mm-ss'), data);

// Main push function
const frodoize = async () => {
    // There are still some requests to be done
    if (appData.counter.pushed <= appData.counter.limit && appData.counter.pushed + config.requestsInBatch < appData.counter.limit) {
        // First request
        let dataObj = appData.data.shift();
        let r1 = singleRequestPromise(appData, config, dataObj);

        // All requests resolve
        Promise.all(buildRequestPromisArray(r1, appData, config)).then(() => {
            //TODO: Handle saving data

            // Repeat
            frodoize();
        });
    } else {
        // Create final save
        appData.finished = true;

        // Creating output folder
        hlp.createDirIfRequired(settings.outputDirectory + '/' + appData.startTimestamp);

        // Crawl report
        createReport(settings, config, appData);
    }
};

// Init
frodoize();
