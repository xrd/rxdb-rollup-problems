(this repository is forked from https://github.com/hperrin/smui-example-rollup/)

Overview of steps to reproduce the error:

1. Install svelte, rollup
2. Add rxdb, graphql, subscriptions transport libraries
3. Load rxdb
4. Load graphql plugins
5. See errors for events (globals)
6. Try to fix with rollup-plugin-polyfill-node.
7. See the errors where rxdb is importing `import { default as deepClone } from 'clone';` and crashing in build.

Commands to reproduce:

1. `git checkout bb60f1cd23ab2622d1468b32e35133c78f196b04 && yarn build` (no rxdb; works great)
2. `git checkout 55c7a3e351a7e96707dd85ac72e153fb874d3681 && yarn build` (add rxdb; works great)
3. `git checkout 63a8d6ac3aa030db87b14488642b8248f2282fb7 && yarn build` (add graphql plugins, load them up; now it complains of missing shims, needs node-polyfill)
4. `git checkout b6a4eca8bbb3d85959aabceb2ad2e5d062bf1e11 && yarn build` (polyfill fixes; now error with default missing from clone.js)


## Missing Shim Errors ##

After installing and loading the RXDB plus GraphQL libraries, and then building I see these warnings where it tries to guess what to use for events, etc. It crashes when I run the generated code in the browser:

```
$ yarn build
yarn run v1.22.10
$ rollup -c rollup.config.js

index.js → dist/bundle.js...
(!) Missing shims for Node.js built-ins
Creating a browser bundle that depends on 'events' and 'util'. You might need to include https://github.com/ionic-team/rollup-plugin-node-polyfills
(!) `this` has been rewritten to `undefined`
https://rollupjs.org/guide/en/#error-this-is-undefined
node_modules/event-reduce-js/dist/es/util.js
1: var __read = (this && this.__read) || function (o, n) {
                 ^
2:     var m = typeof Symbol === "function" && o[Symbol.iterator];
3:     if (!m) return o;
...and 3 other occurrences
node_modules/binary-decision-diagram/dist/es/create-bdd-from-truth-table.js
1: var __values = (this && this.__values) || function(o) {
                   ^
2:     var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
3:     if (m) return m.call(o);
...and 3 other occurrences
node_modules/binary-decision-diagram/dist/es/leaf-node.js
1: var __extends = (this && this.__extends) || (function () {
                    ^
2:     var extendStatics = function (d, b) {
3:         extendStatics = Object.setPrototypeOf ||
...and 1 other occurrence

...and 5 other files
(!) Plugin node-resolve: preferring built-in module 'util' over local alternative at '/home/chrisdawson/Projects/ForkyBook/javascript-overlay/smui-example-rollup/node_modules/util/util.js', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning
(!) Plugin node-resolve: preferring built-in module 'events' over local alternative at 'events', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning
(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
graphql/language/printer (imported by graphql/language/printer?commonjs-external, node_modules/subscriptions-transport-ws/dist/client.js)
graphql/utilities/getOperationAST (imported by graphql/utilities/getOperationAST?commonjs-external, node_modules/subscriptions-transport-ws/dist/client.js)
util (imported by node_modules/generate-function/index.js, util?commonjs-external)
events (imported by node_modules/pouchdb-core/lib/index.es.js, node_modules/pouchdb-utils/lib/index-browser.es.js)
(!) Circular dependencies
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseOneOf.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseOneOf.js -> /home/chrisdawson/Projects/ForkyBook/javascript-overlay/smui-example-rollup/node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js?commonjs-proxy -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseType.js -> node_modules/get-graphql-from-jsonschema/build/lib/handleArrayType.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseType.js -> node_modules/get-graphql-from-jsonschema/build/lib/handleObjectType.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
(!) Missing global variable names
Use output.globals to specify browser global variable names corresponding to external modules
graphql/language/printer (guessing 'printer')
graphql/utilities/getOperationAST (guessing 'getOperationAST')
events (guessing 'EE')
util (guessing 'util')
created dist/bundle.js in 9.1s
Done in 9.41s.
```

## Missing Default in Clone.js ##

Fixing this with rollup-plugin-polyfill-node

```
$ yarn build
yarn run v1.22.10
$ rollup -c rollup.config.js

index.js → dist/bundle.js...
(!) `this` has been rewritten to `undefined`
https://rollupjs.org/guide/en/#error-this-is-undefined
node_modules/subscriptions-transport-ws/dist/client.js
1: "use strict";
2: var __assign = (this && this.__assign) || function () {
                   ^
3:     __assign = Object.assign || function(t) {
4:         for (var s, i = 1, n = arguments.length; i < n; i++) {
...and 7 other occurrences
node_modules/event-reduce-js/dist/es/util.js
1: var __read = (this && this.__read) || function (o, n) {
                 ^
2:     var m = typeof Symbol === "function" && o[Symbol.iterator];
3:     if (!m) return o;
...and 3 other occurrences
node_modules/binary-decision-diagram/dist/es/create-bdd-from-truth-table.js
1: var __values = (this && this.__values) || function(o) {
                   ^
2:     var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
3:     if (m) return m.call(o);
...and 3 other occurrences

...and 6 other files
(!) Circular dependencies
polyfill-node:global.js -> polyfill-node:global.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseOneOf.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseOneOf.js -> /home/chrisdawson/tmp/ser/node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js?commonjs-proxy -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseType.js -> node_modules/get-graphql-from-jsonschema/build/lib/handleArrayType.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseType.js -> node_modules/get-graphql-from-jsonschema/build/lib/handleObjectType.js -> node_modules/get-graphql-from-jsonschema/build/lib/parseSchema.js
[!] Error: 'default' is not exported by node_modules/clone/clone.js, imported by node_modules/rxdb/dist/es/util.js
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
node_modules/rxdb/dist/es/util.js (6:9)
4:  */
5: import randomToken from 'random-token';
6: import { default as deepClone } from 'clone';
            ^
7: /**
8:  * Returns an error that indicates that a plugin is missing
Error: 'default' is not exported by node_modules/clone/clone.js, imported by node_modules/rxdb/dist/es/util.js
    at error (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:5305:30)
    at Module.error (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:9750:16)
    at Module.traceVariable (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:10138:29)
    at ModuleScope.findVariable (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:8899:39)
    at FunctionScope.findVariable (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:2647:38)
    at ChildScope.findVariable (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:2647:38)
    at Identifier.bind (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:4035:40)
    at CallExpression.bind (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:2734:23)
    at CallExpression.bind (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:6761:15)
    at ReturnStatement.bind (/home/chrisdawson/tmp/ser/node_modules/rollup/dist/shared/rollup.js:2734:23)

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```
