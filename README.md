# StegMsg
StegMsg is an educational application which will allow students to send each other encoded images (which have been encrypted) to each other through the use of steganography. 

You can simply start off by uploading an image and a message which will be sent over to our server and be encoded. Then your new photo will be downloaded and you will receive a private key which you can share with whom you'd like to share your photo and message with.

We saw the importance of creating this project because of the current lack of awareness about security. Steganography can be used for both malicious intent and for security purposes. It is important for us to understand how such techniques can be both good and bad. 

# Project Skeleton Top-level

This repository combines the client and server into a single repository that can be co-developed, adn deployed to Heroku.

The client was created with [create-react-app](https://github.com/facebookincubator/create-react-app) (CRA) and the server is a separate Node.js application. The client-server integration is based on this [tutorial](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) and [repository](https://github.com/fullstackreact/food-lookup-demo). This repository will be referred to as the "top-level" to distinguish it from the client and server.

## Installing (and Adding) Dependencies

The skeleton is structured as three separate packages. That is a "top-level" package and a separate "client" and "server". Thus initially installing dependencies is a 3 step process that runs "install" for each of the packages.

```
npm install
npm install --prefix client
npm install --prefix server
```

The `--prefix` option treats the supplied path as the package root. In this case it is equivalent to `cd client` then `npm install` then `cd ..`.

**Windows Users**: There appears to be an [error](https://stackoverflow.com/q/50653324) using the `prefix` argument on Windows. Instead of using `prefix` you will need to manually change to the client and server directories before running `npm install` and possibly other `npm` commands.

**You will typically not need to install any dependencies in the top-level `package.json` file**. Doing so is a common mistake. Most dependencies are needed by the client or the server and should be installed in the respective sub-packages, e.g. to install `reactstrap` for your client application:

```
npm install --save reactstrap --prefix client
```

## Running the Application

The combined application, client and server, can be run with `npm start` in the top-level directory. `npm start` launches the CRA development server on <http://localhost:3000> and the backend server on http://localhost:3001. By setting the `proxy` field in the client `package.json`, the client development server will proxy any unrecognized requests to the server. By default this starts the server in hot-reloading mode (like with the client application).

## Linting

Both the client and server can be independently linted via:

```
npm run lint --prefix client
```

and

```
npm run lint --prefix server
```

## Continuous Integration

The skeleton is setup for CI with Travis-CI. Travis will build the client and test and lint both the client and the server.

## How We Created the Skeleton

To ensure consistent style we use the CRA-recommended [Prettier](https://github.com/prettier/prettier) package. We installed it in the "top-level" package with

```
npm install --save-dev husky lint-staged prettier
```

and added the recommended configuration to automatically reformat code during the commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the top-level `package.json` file. The client and server has its own ESLint configuration.

We added custom ESLint rules to capture common errors. To ensure compatibility with Prettier, we also installed the `eslint-config-prettier` package in both the client and server to disable styling rules that conflict with Prettier.

```
npm install --save-dev eslint-config-prettier --prefix server
npm install --save-dev eslint-config-prettier --prefix client
```

and added an `"extends"` entry to `.eslintrc.json` or the `package.json` file as appropriate.

To enable Heroku deployment we added the following to the top-level `package.json` file:

* Specify the node version in the `engines` field
* Add a `heroku-postbuild` script field that will install dependencies for the client and server and create the production build of the client application.
* Specify that `node_modules` should be cached to optimize build time

In addition we added a `Procfile` in the top-level package to start the server.

## Tools Used
We used pythons Crypto library and cv2 library to encode images. Additionally, we used Axios to send over our users request and run our python scripts with those. 
