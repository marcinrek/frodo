/**
 * Create initial appData object
 * @param {object} config configuration data object
 * @param {string} startTimestamp start timestamp string
 * @param {array} urlList array of start urls
 * @param {object} custom custom actions object
 * @returns {object} appData object
 */
const createAppData = (config, startTimestamp, data) => {
    return {
        finished: false,
        counter: {
            limit: Math.round(data.length * (config.requestPercent / 100)),
            pushed: 0,
        },
        startTimestamp,
        data,
        outputData: [],
    };
};

module.exports = {
    createAppData,
};
