function Thermostat(username, password) {
  this.apiroute = "https://portal.icy.nl";
  this.username = username;
  this.password = password;
  this.token = "";
  this.uid = "";

  this.refreshToken = function () {
    var url = this.apiroute + "/login";
    var payload = {
      username: this.username,
      password: this.password
    }

    var options = {
      method: "POST",
      payload: payload,
      followRedirects: true,
      muteHttpExceptions: true
    }

    var result = UrlFetchApp.fetch(url, options);
    if (result.getResponseCode() == 200) {
      var contentText = result.getContentText();
      var json = JSON.parse(contentText);
      this.token = json.token;
      this.uid = json.serialthermostat1;
    } else {
      Logger.log("Error occured logging in. Response code: " + result.getResponseCode());
    }
  }

  this.getData = function (iteration) {
    var url = this.apiroute + "/data";

    var headers = {
      'Session-token': this.token
    };

    var options = {
      method: "GET",
      headers: headers,
      followRedirects: true,
      muteHttpExceptions: true
    }

    var result = UrlFetchApp.fetch(url, options);
    switch (result.getResponseCode()) {
      case 200:
        // OK
        var contentText = result.getContentText();
        var data = JSON.parse(contentText);
        Logger.log(data);
        return data;
        break;
      case 401:
        // UnauthorizedException: Session expired or invalid.

        if (iteration == 1) {
          // We already tried to resolve the Session invalid, but apparently it didn't work.
          // Give up.
          Logger.log("Error refreshing session token.");
        }
        Logger.log("Invalid token. Refreshing...");
        this.refreshToken();
        return this.getData(1);
        break;
      default:
        // Something else went wrong.
        Logger.log("Error occured getting data. Response code: " + result.getResponseCode() + ", Data: " + result.getContentText());
        break;
    }
  }

  this.setTemperature = function (temp, iteration) {
    var url = this.apiroute + "/data";

    var headers = {
      'Session-token': this.token
    };

    var payload = {
      uid: this.uid,
      temperature1: temp
    }

    var options = {
      method: "POST",
      headers: headers,
      payload: payload,
      followRedirects: true,
      muteHttpExceptions: true
    }

    var result = UrlFetchApp.fetch(url, options);
    switch (result.getResponseCode()) {
      case 200:
        // OK
        Logger.log("Temperature set to " + temp);
        Logger.log(result.getContentText());
        break;
      case 401:
        // UnauthorizedException: Session expired or invalid.

        if (iteration == 1) {
          // We already tried to resolve the Session invalid, but apparently it didn't work.
          // Give up.
          Logger.log("Error refreshing session token.");
          return;
        }
        Logger.log("Invalid token. Refreshing...");
        this.refreshToken();
        this.setTemperature(temp, 1);
        break;
      default:
        // Something else went wrong.
        Logger.log("Error occured getting data. Response code: " + result.getResponseCode() + ", Data: " + result.getContentText());
        break;
    }
  }
}
