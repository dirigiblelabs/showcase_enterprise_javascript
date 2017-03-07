/* globals $ */
/* eslint-env node, dirigible */

var user = require('net/http/user');
var response = require('net/http/response');

var userName = user.getName();

response.println("[UserName]: " + userName);
response.println("[Is in Role]: " + user.isInRole("Developer"));
response.flush();
response.close();
