![](https://www.politico.com/interactives/cdn/images/badge.svg)

# Developing bakery handlers

A handler is a function that responds to an API request. During execution, handlers should bake static pages to a temporary local directory and then sync those files to an S3 bucket.

Handlers will receive whatever payload was sent to the API. They can use that data or just be triggered to fetch their own data.

Write handlers in `bakery/handlers`.

Handlers will be automatically registered with your bakery server as long as you export a handler function **and** an ACTION string.

For example, a handler like...

```javascript
// bakery/handlers/myAction.js
export const ACTION = 'my_action';

export default async function(payload) {
  return 'OK';
}
```

... which you could call like...

```javascript
fetch('https://my.api.com', {
  headers: {
    Authorization: 'Token <YOUR_AUTH_TOKEN>',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({
    action: 'my_action',
    data: [{}, {}],
  }),
})
```

Handlers that don't export an `ACTION` won't be registered, but can still be used by other handlers that are registered.

### Utils

Several utilities are provided to help you bake static pages with your data and then upload them to S3.

As a general rule, you should use these utilities to bake static pages to your temporary directory and sync them to S3 because they will automatically handle file pathing for you.

**Your temporary directory should resemble the pathing you want in your bucket, relative to your project's `publishPath` set in `package.json`.** That allows us to sync your directory.

#### `exportData`

Exports any serializable data to JSON in your temporary directory.

```javascript
import { exportData } from 'Bakery/utils';

// Serializes data and bakes to temp/path/to/data.json
await exportData(someData, 'path/to/data.json');
```

#### `renderTemplate`

```javascript
import { renderTemplate } from 'Bakery/utils';

// Renders and bakes client/myApp/index.js to temp/path/to/page/index.html
await renderTemplate('myApp', somData, 'path/to/page');
```

#### `s3.syncDir`

Once you've baked pages to your temporary directory, use this utility to sync files to your S3 bucket. Remember all paths are prefixed by the `publishPath` in your `package.json`.

```javascript
import { s3 } from 'Bakery/utils';

const pathPrefixes = {
  // The tmpPrefix is a path that determines what part of the
  // what part of temporary directory to sync, defaults to all.
  tmpPrefix: '',
  // The bucketPrefix is a path added to the projectRoot when
  // uploading files to S3, defaults to none.
  bucketPrefix: ''
};
// Custom parameters can include cache headers, etc.
const customFileParams = {};

await s3.syncDir(pathPrefixes, customFileParams);
```

By default, this does not delete stale files. *If you're confident you can sync wih deletion*, you can pass `true` as a parameter:

```javascript
await s3.syncDir(pathPrefixes, customFileParams, true);
```

#### `sweepTmp`

Cleans up your temporary directory. Use this at the end of every handler to make sure your lambda instance doesn't retain or accidentally sync stale pages to S3.

```javascript
import { sweepTmp } from 'Bakery/utils';

await sweepTmp();
```
