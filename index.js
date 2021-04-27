import "./App.scss";
import App from "./App.svelte";

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { addRxPlugin, createRxDatabase } from 'rxdb/plugins/core';

addRxPlugin(require('pouchdb-adapter-idb'));
import {
  RxDBReplicationGraphQLPlugin,
  // pullQueryBuilderFromRxSchema,
  // pushQueryBuilderFromRxSchema,
} from 'rxdb/plugins/replication-graphql';
addRxPlugin(RxDBReplicationGraphQLPlugin);

// TODO import these only in non-production build
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
addRxPlugin(RxDBValidatePlugin);

import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
addRxPlugin(RxDBUpdatePlugin);

import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBQueryBuilderPlugin);

import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
addRxPlugin(RxDBMigrationPlugin);

console.log('SubscriptionClient', SubscriptionClient, createRxDatabase);


window.app = new App({
  target: document.getElementsByTagName("app")[0],
});
