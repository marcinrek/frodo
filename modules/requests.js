const axios = require('axios');
const chalk = require('chalk');
const hlp = require('./helpers');

/**
 * Make a single request promise
 * @param {object} appData core application data object
 * @param {object} config current run config
 * @param {object} dataObj input data object
 * @returns {promise}
 */
const singleRequestPromise = (appData, config, dataObj) => {
    let responsePass;
    let errorResponse = false;

    return new Promise((res) => {
        // Pre-request msg
        console.log(
            `${chalk.green('⇄')} [${chalk.yellow(hlp.getTimestamp('HH:mm:ss'))}] Starting new request ${
                dataObj[config.compareKeyName] ? `${config.compareKeyName} = ${chalk.green(dataObj[config.compareKeyName])}` : ''
            }`,
        );

        try {
            axios({
                method: config.requestMethod,
                url: config.requestEndpoint,
                headers: config.requestHeaders,
                data: dataObj,
            })
                .then((response) => {
                    responsePass = response?.data;
                })
                .catch((response) => {
                    errorResponse = true;
                    responsePass = response;

                    // Log
                    console.log(
                        `${chalk.red('↯')} [${chalk.yellow(hlp.getTimestamp('HH:mm:ss'))}] Got error response ${
                            dataObj[config.compareKeyName] ? `${config.compareKeyName} = ${chalk.red(dataObj[config.compareKeyName])}` : ''
                        }`,
                    );
                    responsePass.compareKeyName = dataObj[config.compareKeyName] || null;
                })
                .finally(() => {
                    // Inc request count
                    appData.counter.pushed += 1;

                    // Display info about the current request
                    let finished = appData.counter.pushed;
                    let total = appData.counter.limit;
                    let percent = Math.round((finished / total) * 10000) / 100;
                    console.log(
                        `${chalk.cyan('⇇')} [${chalk.yellow(hlp.getTimestamp('HH:mm:ss'))}] ${finished} of ${total} (${percent}%) ${
                            dataObj[config.compareKeyName] ? `Pushed ${config.compareKeyName} = ${chalk.green(dataObj[config.compareKeyName])}` : ''
                        }`,
                    );

                    // Log
                    const logItem = responsePass;
                    if (dataObj[config.compareKeyName]) {
                        responsePass.compareKeyName = dataObj[config.compareKeyName];
                    }
                    appData.outputData.push(logItem);

                    // Resolve this crawl
                    res();
                });
        } catch (error) {
            // Log
            console.log(
                `${chalk.red('↯')} [${chalk.yellow(hlp.getTimestamp('HH:mm:ss'))}] Got error response ${
                    dataObj[config.compareKeyName] ? `${config.compareKeyName} = ${chalk.red(dataObj[config.compareKeyName])}` : ''
                }`,
            );
            console.log(error);

            // Resolve this crawl
            res();
        }
    });
};

/**
 * Create array of promises with requests
 * @param {promise} r1 first request promise
 * @param {object} appData application data object
 * @param {object} config current run config
 */
const buildRequestPromisArray = (r1, appData, config) => {
    let promiseArray = [r1];

    for (let i = 0; i < config.requestsInBatch - 1; i += 1) {
        let dataObj = appData.data.shift();
        promiseArray.push(singleRequestPromise(appData, config, dataObj));
    }

    return promiseArray;
};

module.exports = {
    singleRequestPromise,
    buildRequestPromisArray,
};
