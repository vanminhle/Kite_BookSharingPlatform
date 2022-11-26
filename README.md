# Kite - A Book Sharing Platform

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Kite is a web application platform, where people can find, buy, read, interact, and share any book they create on their own and make money from it.

## Features

- Upload and selling any books in pdf file type
- Purchasing books with Credit Card, Debit Card
- Reading book online
- Real-time Support Conversation
- Login with Google Account
- Content management through Cloudinary

## Tech

Kite uses a number of open source technology to work properly:

- ReactJS - https://reactjs.org/
- NodeJS - https://nodejs.org/en/
- ExpressJS - https://expressjs.com/
- MongoDB & Atlas - https://www.mongodb.com/atlas/database
- Websocket SocketIO - https://socket.io/

## Services

And a number of services to work properly:

- Stripe - https://stripe.com/
- Cloudinary - https://cloudinary.com/
- Google API - https://console.cloud.google.com/apis
- MongoDB & Atlas - https://www.mongodb.com/atlas/database

Of course Kite itself is open source with a [public repository](https://github.com/vanminhle/Kite_BookSharingPlatform) on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies for both Front-end, Back-end,
Socket-server and start the server.

For Front-end

```sh
cd kite_clientside
npm run install
```

For Back-end

```sh
cd kite_clientside
npm run install
```

For Socket-server

```sh
cd kite_socketserver
npm run install
```

## Environment Variables

Kite is currently extended with some third-party services and separate with diffirent environments
Please provide these following variables in the **config.env** file before starting the application.

```sh
VARIABLE_NAME=VARIABLE_VALUE
```

For Back-end

| VARIABLE_NAME          | VARIABLE_VALUE                             |
| ---------------------- | ------------------------------------------ |
| NODE_ENV               | development                                |
| CLIENT_URL_DEVELOPMENT | (Front-end Local Server or After deployed) |
| CLIENT_URL_PRODUCTION  | (Front-end Local Server or After deployed) |
| Port                   | 8000 (Or deployed port)                    |
| DATABASE               | (MongoDB Atlas Server URL)                 |
| DATABASE_PASSWORD      | (MongoDB Atlas Server Password)            |
| JWT_SECRET_KEY         | (Random Text)                              |
| JWT_EXPIRES_IN         | 7d                                         |
| JWT_COOKIE_EXPIRES_IN  | 7                                          |
| CLOUDINARY_CLOUD_NAME  | (Cloudinary CDN Cloud Name)                |
| CLOUDINARY_API_KEY     | (Cloudinary CDN Api Key)                   |
| EMAIL_HOST             | (Mailtrap for Development)                 |
| EMAIL_PORT             | (Mailtrap 2525 Port)                       |
| EMAIL_USERNAME         | (Mailtrap Mail Service User Name)          |
| EMAIL_PASSWORD         | (Mailtrap Mail Service Password)           |
| EMAIL_FROM             | service@kite.io                            |
| STRIPE_SECRET_KEY      | (Stripe Payment Service Secret Key)        |

For Front-end (development & production)

| VARIABLE_NAME          | VARIABLE_VALUE                                |
| ---------------------- | --------------------------------------------- |
| REACT_APP_API_ENDPOINT | (Back-end Local Server or After deployed)     |
| REACT_APP_STRIPE_KEY   | (Stripe Payment Service Front-end Client Key) |

## Development

Running the application

For Front-end

```sh
cd kite_clientside
npm run start
```

For Back-end

```sh
cd kite_clientside
npm run start:prod //(or start:dev for development environment)
```

For Socket-server

```sh
cd kite_socketserver
npm run start
```

## License

MIT

By Le Minh
