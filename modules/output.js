const fs = require('fs');

/**
 * Create crawl report
 * @param {object} config config JSON
 * @param {object} appData application data object
 */
const createReport = (settings, config, appData) => {
    const outputDir = settings.outputDirectory + '/' + appData.startTimestamp + '/';
    const fileName = `${config.id}_${appData.startTimestamp}_report`;
    const filePath = `${outputDir}${fileName}.json`;

    // Write JSON to disk
    fs.writeFile(filePath, JSON.stringify(appData.outputData, null, 4), 'utf8', (err) => {
        if (err) throw err;
        console.log('Report: ', filePath);
    });
};

module.exports = {
    createReport,
};
