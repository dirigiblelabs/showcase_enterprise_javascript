/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');
var response = require('net/http/response');

files.createFile("sample.txt");

var file = files.get("sample.txt");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is File?]: " + file.isFile());

files.writeText("sample.txt", "Some content");

var content = files.readText("sample.txt");
response.println("[File Content]: " + content);

response.flush();
response.close();