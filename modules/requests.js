const axios = require('axios');
const chalk = require('chalk');
const hlp = require('./helpers');

/**
 * Make a single request promise
 * @param {*} appData
 * @param {*} config
 * @param {*} dataObj
 * @returns
 */
const singleRequestPromise = (appData, config, dataObj) => {
    let responsePass;
    let errorResponse = false;

    return new Promise((res) => {
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
            })
            .finally(() => {
                // Inc request count
                appData.counter.pushed += 1;

                // Display info about the current request
                let finished = appData.counter.pushed;
                let total = appData.counter.limit;
                let percent = Math.round((finished / total) * 10000) / 100;
                console.log(
                    `${finished} of ${total} (${percent}%) [${chalk.yellow(hlp.getTimestamp('HH:mm:ss'))}] ${
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
    });
};

/**
 * Create array of promises with requests
 * @param {*} r1
 * @param {*} appData
 * @param {*} config
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
