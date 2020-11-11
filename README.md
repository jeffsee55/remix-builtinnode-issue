This is reproduction of an issue which I think is caused by rollup's [node-builtins](https://github.com/calvinmetcalf/rollup-plugin-node-builtins) packkage.

The library which is causing this issue is [amazon-cognito-identity-js](https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/package.json) - which as far as I can tell is 100% intended for the browser.

However when I import it into my routes file (see `app/routes/index.tsx`) - the resulting `.js` file looks like this:

```js
import { r as react } from '../_shared/node_modules/react-10709c0f.js';
import '../_shared/node_modules/object-assign-c47a16a6.js';
import '../_shared/node_modules/prop-types-a2e0c233.js';
import '../_shared/node_modules/@babel/runtime-f4ff0cc0.js';
import '../_shared/node_modules/history-e2bdd78d.js';
import '../_shared/node_modules/react-is-9bb5e5fb.js';
import '../_shared/node_modules/react-router-2d697536.js';
import { c as useRouteData } from '../_shared/node_modules/@remix-run/react-fb29856d.js';
import { C as Cognito } from '../_shared/node_modules/amazon-cognito-identity-js-7727bf97.js';
import 'buffer'; // this is wrong
import '../_shared/node_modules/crypto-js-55ad0c09.js';
import '../_shared/node_modules/unfetch-e6254259.js';
import 'stream'; // wrong
import 'http'; // wrong
import 'url'; // wrong
import 'https'; // wrong
import 'zlib'; // wrong
import '../_shared/node_modules/node-fetch-a12ee21e.js';
import '../_shared/node_modules/isomorphic-unfetch-aad59bef.js';
import '../_shared/node_modules/js-cookie-7b32b2f2.js';

...

```

With the browser console error saying:

```
Uncaught TypeError: Error resolving module specifier “buffer”. Relative module specifiers must start with “./”, “../” or “/”.
```

[Here's where](https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/CognitoUser.js#L18) the package I'm trying to use attempting to use `buffer` package - which is defined in it's package json [here](https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/package.json#L67).

I do see a rollup error in my console but I don't think we have access to rollup configs:

```sh
preferring built-in module 'buffer' over local alternative at '/Users/jeffsee/code/buffer-issue/node_modules/buffer/index.js', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning
```
