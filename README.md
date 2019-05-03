# Portal Server

This project was built as a part of IIT Bombay student portal's Backend.

## Instructions
After clone the "cache" brach of this repo. Which containt the redis implementation.
No need to install mongo locally as we are using cloud based mongo atlas.


Install Node.js
```
sudo apt-get install nodejs
```

Install Redis
```
sudo apt-get install redis-server
```

Then run npm install from the root directory:

```
$ npm install
```

Then run dev server from the root directory:

```
$ npm start
```

To run dev server from the root directory using nodemon:

```
$ npm test
```
To run it on browser, open chome and enter following ip:

```
http://localhost:3000/
```


To build for production, run build:

```
$ npm run build
```

