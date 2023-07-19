const fs = require('fs');

/**
 * Create report
 * @param {object} config config JSON
 * @param {object} appData application data object
 * @param {string} outputPath out directory path
 */
const createReport = (config, appData, outputPath) => {
    const fileName = `${config.id}_report`;
    const filePath = `${outputPath}/${fileName}.json`;

    // Write JSON to disk
    try {
        fs.writeFileSync(filePath, JSON.stringify(appData.outputData, null, 4), 'utf8');
        console.log('Report: ', filePath);
    } catch (err) {
        if (err) throw err;
    }
};

module.exports = {
    createReport,
};
