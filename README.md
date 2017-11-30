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

The functions `testGetData` and `testSetTemperature` in file `Main.gs` demonstrate how you can use this class to get and set the temperature.

Script Properties
-----------------

Google Docs have Properties.
You can view and edit them by going to the Script Editor (File / Project Properties).

The class stores the `session-token` and `uid` in the Project's `Script Properties`, so that it can recycle these values even between multiple instances of the class.

Logging to Spreadsheet
----------------------

`Main.gs` also contains a function called `logCurrentSituation`.
It gets the current data from the thermostat and adds it to a sheet called "Log".

In order to set this up you need a Sheet called "Log" that is G-columns wide and 1 row tall:

| timestamp | uid | first-seen | last-seen | device-status | temperature1 | temperature2 |
|-----------|-----|------------|-----------|---------------|--------------|--------------|

(Remove the remaining rows and columns).

(Feel free to rename the columns).

Then in the Script Editor click "Current Project Triggers", add a new one (I suggest timebased, every 15 minutes) and call `logCurrentSituation`.

The sheet "Log" will now keep a log of your thermostat.
