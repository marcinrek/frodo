# Tool for pushing multiple objects from an array to an API 

This tool can be used to send multiple requests to an API. Each reqest sends data from a predefined array.

## Example use cases
* API testing
* data migration

## Requirements 
Node version >= 18.16.0

## Usage
* create a folder in the project root directory to store all related files for example ___pusher___
* create ___frodo.settings.js___ file in the root project directory
```
module.exports = {
    comments: {,
        outputDirectory: 'Directory to store output files',
        saveDirectory: 'Directory to store save files',
    },
    outputDirectory: './pusher/output/',
    saveDirectory: './pusher/save/',
};
```
* start sending requests using
```
npx frodo .\pusher\config\sample.config.json .\pusher\data\sample.data.json
```

## Config file example
```
{
  "comments": {
    "id": "Project id - should be unique",
    "requestEndpoint": "URL to push data to",
    "requestHeaders": "HTTP headers to be added to each request",
    "requestMethod": "Push method to be used",
    "requestsInBatch": "Concurent request count",
    "requestPercent": "How much data from the data json should be pushed in percent",
    "compareKeyName": "Key from the data object to be used for matching agains the response in the output log"
  },
  "id": "dev-test",
  "requestEndpoint": "http://127.0.0.1:8888/api_mock",
  "requestHeaders": {
    "content-type": "application/json",
    "X-Token": "123asd456"
  },
  "requestMethod": "post",
  "requestsInBatch": 2,
  "requestPercent": 50,
  "compareKeyName": "id"
}

```

### Config file docs
| Option              | Value         | Description                                                          |
| ------------------- |:-------------:| -------------------------------------------------------------------- |
| ```id```          | ```string```  | Project id - should be unique |
| ```requestEndpoint```          | ```string```  | URL to push data to |
| ```requestHeaders```          | ```object```  | HTTP headers to be added to each request |
| ```requestMethod```          | ```string```  | Push method to be used |
| ```requestsInBatch```          | ```number```  | Concurent request count |
| ```requestPercent```          | ```number```  | How much data from the data json should be pushed in percent |
| ```compareKeyName```          | ```number```  | Key from the data object to be used for matching agains the response in the output log |

## Changelog
* v0.1.0
    * push as an npm package

## Donate 
If you find this piece of code to be useful, please consider a donation :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?hosted_button_id=ZPSPDRNU99V4Y)