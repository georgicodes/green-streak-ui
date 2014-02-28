green-streak-ui
==========================

#PhoneGap
Install the following plugins
```
$ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git
$ cordova plugin add org.apache.cordova.inappbrowser
$ cordova plugin add org.apache.cordova.statusbar
$ cordova plugin add org.apache.cordova.network-information
```

## Running the app
For development purposes it's easiest to run with: 
```bash
$ cd www
$ pythom -m SimpleHTTPServer
```
Alternatively, run it with phonegap:
```bash
$ phonegap run ios
```

## Screenshots
![Page 1](www/img/page1.png)
![Side Menu](www/img/menu.png)
![Page 2](www/img/page2.png)

