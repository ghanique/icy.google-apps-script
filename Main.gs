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
