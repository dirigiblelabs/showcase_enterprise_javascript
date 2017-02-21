/* globals $ */
/* eslint-env node, dirigible */

var http = require('net/http/client');
var response = require('net/http/response');

var httpResponse = http.get('http://jsonplaceholder.typicode.com/posts/');

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
