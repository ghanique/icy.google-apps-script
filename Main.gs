function testGetData() {
  var username = PropertiesService.getScriptProperties().getProperty("username");
  var password = PropertiesService.getScriptProperties().getProperty("password");
  var thermostat = new Thermostat(username, password);
  var data = thermostat.getData();
  var data = thermostat.getData();
}

function testSetTemperature() {
  var username = PropertiesService.getScriptProperties().getProperty("username");
  var password = PropertiesService.getScriptProperties().getProperty("password");
  var thermostat = new Thermostat(username, password);
  thermostat.setTemperature(21);
}

function getCurrentDataRow() {
  var username = PropertiesService.getScriptProperties().getProperty("username");
  var password = PropertiesService.getScriptProperties().getProperty("password");
  var thermostat = new Thermostat(username, password);
  var data = thermostat.getData();

  var timestamp = new Date();
  var newRow = [timestamp, data.uid, data["first-seen"], data["last-seen"], data["device-status"], data.temperature1, data.temperature2];
  return newRow;
}

function logCurrentSituation() {
  var newRow = getCurrentDataRow();
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").appendRow(newRow);
}
