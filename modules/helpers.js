const fs = require('fs');
const chalk = require('chalk');
const date = require('date-and-time');

module.exports = {
    /**
     * Print info about not all arguments being provided
     */
    notAllArgsProvided: () => {
        console.log(chalk.red(`😱 Both parameters are required`));
        console.log(`Usage: ${chalk.green(`node frodo.js ${chalk.yellow(`{path to config file} {path to data file}`)}`)}`);
        console.log(`Example: ${chalk.green(`node frodo.js ./config/sample.json ./data/data.json`)}`);
        process.exit();
    },

    /**
     * Read data from a json file
     * @param {string} path
     * @returns {JSON} Parsed JSON
     */
    readJSON: (path) => {
        if (fs.existsSync(path)) {
            let rawData = fs.readFileSync(path);
            let config = JSON.parse(rawData);
            return config;
        } else {
            return null;
        }
    },

    /**
     * Create directory if it does not exist
     * @param {string} dirName directory path
     */
    createDirIfRequired: (dirName) => {
        /* istanbul ignore next */
        if (!fs.existsSync(dirName)) {
            console.log(`😮 Creating directory: ${chalk.yellow(dirName)}`);
            fs.mkdirSync(dirName);
        } else {
            console.log(`😊 Directory: ${chalk.yellow(dirName)} exists.`);
        }
    },

    /**
     * Get current timestamp in 'YYYY/MM/DD HH:mm:ss' format
     */
    getTimestamp: (format) => date.format(new Date(), format),
};
