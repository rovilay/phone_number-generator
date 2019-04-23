# PHONE NUMBER GENERATOR (PNG)
This application generate random phone numbers

## Overview

The PNG system generates random 10 digits phone numbers

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── Data
│   │   └── phoneNumbersData.txt
│   ├── controllers
│   │   └── phoneNumber.js
│   ├── helpers
│   │   ├── defaults.js
│   │   └── utils.js
│   ├── index.js
│   ├── middlewares
│   │   ├── errorhandler.js
│   │   └── verifyQuery.js
│   ├── routes
│   │   ├── __tests__
│   │   │   └── phoneNumberRoutes.test.js
│   │   ├── index.js
│   │   └── phoneNumberRoutes.js
│   └── tests
│       └── sample.test.js
```

## Requirements

* Node.js v10.x or higher
* yarn
* MongoDB instance (local or remote)

## Getting Started

```
$ git clone https://github.com/rovilay/phone_number-generator.git
$ cd phone_number-generator
$ yarn install
$ yarn server                  # For development purpose
$ yarn start                   # To run production build
```

You should now be able to access the API via http://localhost:port/api/v1/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`PhoneNumber:`
 - get phone numbers
 - generate phone numbers
 - get minimum and maximum phonenumbers

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/api/v1/phonenumbers</td><td>Gets a phone numbers</td><td>qty, order</td></tr>
<tr><td>GET</td><td>/api/v1/phonenumbers/generate</td><td>Gets a phone numbers</td><td>qty, order</td></tr>
<tr><td>GET</td><td>/api/v1/phonenumbers/minmax</td><td>Gets minimum and maximum phone numbers</td><td></td></tr>