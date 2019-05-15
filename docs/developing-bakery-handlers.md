![](https://www.politico.com/interactives/cdn/images/badge.svg)

# Developing bakery handlers

Write handlers in `bakery/handlers`.

Handlers will be automatically registered with your server as long as you export a handler function **and** an ACTION string.

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

### Utils

Several utilities are provided to help you bake static pages with your data.

##### exportData

```javascript
await exportData(someData, 'path/to/data.json');
```

##### renderTemplate

```javascript
// Render client/myApp/index.js
await renderTemplate('myApp', payload, 'path/to/page/root');
```

##### s3.syncDir

```javascript
await s3.syncDir();
```

##### sweepTmp

Cleans up your lambda temporary directory. Use this at the end of every handler to make sure your lambda instance doesn't retain or accidentally sync stale pages to S3.

```javascript
await sweepTmp();
```
