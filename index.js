const moment = require('moment');
const Mustache = require('mustache');
const Wax = require('@jvitela/mustache-wax');

/**
 * This package builds on the excellent Mustache, Mustache-Wax and Moment
 * packages to provide a handy set of formatters to use within our templates
 */

Wax(Mustache, {

    /**
     * Take a date (for example in ISO8601) and format it using Moment)
     * Usage: {{projectInstallationDate | date : "DD MMMM YYYY" }}
     * @param dateStr
     * @param format
     */
    date: function (dateStr, format) {
        if (!dateStr) {
            return ''; // Don't display today's date if there isn't one
        }
        try {
            const date = moment(dateStr);
            return date.format(format);
        } catch (err) {
            return `Unable to parse ${dateStr}`;
        }
    },

    /**
     * Convert to a number and ensure there are two decimal places
     * Usage: {{total | money}}
     * @param value
     */
    money: function (value) {
        if (!value) {
            return ''; // Don't display anything
        }
        const result = typeof value === 'string' ?
            parseFloat(value).toFixed(2) :
            value.toFixed(2);
        return !isNaN(result) ? result : `Unable to parse ${value}`;
    },

    /**
     * Add any number of variables (or numbers) to an initial one
     * Usage: {{additional_works_price_1 | sum : additional_works_price_2 : additional_works_price_3 :
                     additional_works_price_4}}
     * @param args
     */
    sum: function (...args) {
        const paramToFloat = (param) => {
            return typeof param === 'string' ? parseFloat(param) : param;
        };

        try {
            return args.reduce((previous, current) => {
                if (!current) {
                    return previous; // Miss out any missing parameters
                }
                const result = paramToFloat(previous) + paramToFloat(current);
                if (isNaN(result)) {
                    throw `Unable to compute ${previous} + ${current}`;
                }
                return result;
            });
        } catch (err) {
            return err;
        }
    },
});

module.exports = Mustache;