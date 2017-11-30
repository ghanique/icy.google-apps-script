ICY for Google Apps Script
==========================

This repository contains the a class that you can use in your Google Apps Script to control your ICY e-thermostat.
This thermostat was also rebranded as the "Essent e-thermostaat".

Web API Description
-------------------

The ICY Web API has three methods:

| URI   | Method | Description                                                                          |
|-------|--------|--------------------------------------------------------------------------------------|
| login | POST   | Retrieve a `session-token` and `uid` using your credentials.                         |
| data  | GET    | Get the current status like actual temperature, desired temperature, last seen, etc. |
| data  | POST   | Set a value (specifically the desired temperature).                                  |

If you want to try it out, please download and install [Postman](https://www.getpostman.com/) and import `icy.postman_collection.json`.
(Replace the values `your_username` and `your_password` with your credentials).

Google Apps Script Implementation
---------------------------------

The file `Icy.gs` contains the "class" `Thermostat`.
You can construct an instance with your credentials.

Its main functions are `getData()` and `setTemperature(temp)`.
The class will use your credentials to refresh the `session-token` and `uid` if necessary.
If that fails it will give up.

The file `Main.gs` demonstrates how you can use this class to get and set the temperature.
