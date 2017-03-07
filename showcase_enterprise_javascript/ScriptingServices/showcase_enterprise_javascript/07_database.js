/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var response = require('net/http/response');

var datasource = database.getDatasource();
var connection = datasource.getConnection();
try {
    var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
    statement.setString(1, "%");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println(resultSet.getString(1));
    }
    resultSet.close();
    statement.close();
} finally {
    connection.close();
}

response.flush();
response.close();