![](https://www.politico.com/interactives/cdn/images/badge.svg)

# Developing page assets

Develop client-side assets in subdirectories of `client/`.

### Development server

Run:

```
$ yarn start
```

... then navigate to the page according to the name of your subfolder in `client/`, for example, `http://localhost:3000/home/`.

### Required entries

Each page should be in a subdirectory and must contain two entry points `index.js` and `renderer/index.js`.

```
client/
  myPage/
    index.js 👈
    renderer/
      index.js 👈
```

##### index.js

Write your front-end javascript in this file and import any needed styles.

If your page will use a client-side app, this file should handle hydrating the app. See an example written in React in `client/home/index.js`.

##### renderer/index.js

The renderer script is called by your bakery. It's job is to render a static page with any necessary data supplied to your API.

This script must export a single default function that returns an HTML string which will be rendered to the page as specified in your bakery handler.

See a basic example in `client/simple/renderer/index.js`.
