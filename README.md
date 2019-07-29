[![npm package][npm-badge]][npm]
# mustache-formats

Add some useful formatters to [Mustache](https://github.com/janl/mustache.js) using [Mustache-Wax](https://github.com/jvitela/mustache-wax).

## Installation

```bash
npm install mustache-formats
```
or
```bash
yarn add mustache-formats
```
Then to use it simply import it and call render, for example
```javascript
const renderer = require('mustache-formats');

const result = renderer.render('Date: {{signature_date | date : "DD MMMM YYYY"}}', {
  signature_date: '2019-06-24T16:58:34'
});
// Expect result to be "Date: 24 June 2019"
```

## Formats provided
In this first version, we've defined the following formats:

### Date

Take a date (for example in ISO8601) and format it using Moment)

Usage: 
```
{{projectInstallationDate | date : "DD MMMM YYYY" }}
```

### Money

Convert to a number and ensure there are two decimal places

Usage: 
```
{{total | money}}
```

### Sum

Add any number of variables (or numbers) to an initial one. It ignores any that are null or undefined

Usage: 
```
{{value_1 | sum : value_2 : value_3 : value_4}}
```
