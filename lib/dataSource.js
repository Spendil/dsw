"use strict";

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.promise.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getValueFrom = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  var a = s.split('.');

  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];

    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }

  return o;
};

window.dataSourceWidget = class dataSourceWidget {
  constructor(query, variables, displayed_data, key) {
    this.query = query;
    this.variables = variables;
    this.displayed_data = displayed_data;
    this.key = key;

    this.setupData = function (json) {
      return 'data' in json ? getValueFrom(json.data, this.displayed_data) : null;
    };

    this.fetcher = function () {
      let keyHeader = {
        'X-API-KEY': this.key
      };
      return fetch('https://graphql.bitquery.io', {
        method: 'POST',
        headers: _objectSpread({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }, keyHeader),
        body: JSON.stringify({
          query: this.query,
          variables: this.variables
        }),
        credentials: 'same-origin'
      });
    };
  }

};