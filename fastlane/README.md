fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios test
```
fastlane ios test
```
Runs all the tests
### ios deploy_hockey
```
fastlane ios deploy_hockey
```
Submit a new Beta Build to Hockeyapp
### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight

Trying to build trying the app config

This will also make sure the profile is up to date
### ios release
```
fastlane ios release
```
Deploy a new version to the app store

----

## Android
### android beta
```
fastlane android beta
```
Deploy a new version to Hockeyapp
### android release
```
fastlane android release
```
Deploy a new version to the Google Play Store
### android deploy_hockey
```
fastlane android deploy_hockey
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
