# Project Skeleton Client

The client was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) (CRA) and includes all of capabilities provided by CRA. Some built-in functionality of that skeleton was stripped out, specifically the [offline caching](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

## Setup

You should install the dependencies via `npm install` in this directory (or `npm install --prefix client` from the "top-level" directory).

The development server will attempt to proxy API requests to the server specified in the `package.json` "proxy" field. The application has been configured to proxy requests to the associated server at http://localhost:3001.

## Development

### Linting

You can run the linter with `npm run lint` or `npx eslint src`.

For reference the ESLint configuration is customized according to CRA [recommendations](https://create-react-app.dev/docs/setting-up-your-editor#experimental-extending-the-eslint-config) (note that is a experimental feature).  We installed the Prettier ESlint configuration to prevent conflicts with that tool via

```
npm install --save-dev eslint-config-prettier
```

and updated the `"eslintConfig"` field in `package.json`.
