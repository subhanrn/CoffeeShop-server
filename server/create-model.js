const loopback = require('loopback');
const {
  promisify,
} = require('util');
const fs = require('fs');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));

const DATASOURCE_NAME = 'charger';
const dataSourceConfig = require('./datasources.json');

const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);


async function discover() {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const options = {
    relations: true,
  };

  // Discover models and relations
  const outlet = await db.discoverSchemas('Outlet', options);
  const account = await db.discoverSchemas('Account', options);
  const charger = await db.discoverSchemas('Charger', options);
  const transaksi = await db.discoverSchemas('Transaksi', options);
  const callbacks = await db.discoverSchemas('Callbacks', options);

  // console.log(inventorySchemas)
  // Create model definition files
  await mkdirp('../common/models');

  await writeFile(
    '../common/models/outlet.json',
    JSON.stringify(outlet['dbCharger.Outlet'], null, 2),
  );

  await writeFile(
    '../common/models/account.json',
    JSON.stringify(account['dbCharger.Account'], null, 2),
  );

  await writeFile(
    '../common/models/charger.json',
    JSON.stringify(charger['dbCharger.Charger'], null, 2),
  );

  await writeFile(
    '../common/models/transaksi.json',
    JSON.stringify(transaksi['dbCharger.Transaksi'], null, 2),
  );

  await writeFile(
    '../common/models/callbacks.json',
    JSON.stringify(callbacks['dbCharger.Callbacks'], null, 2),
  );

  // Expose models via REST API
  const configJson = await readFile('./model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.Outlet = {
    dataSource: DATASOURCE_NAME,
    public: true,
  };
  config.Account = {
    dataSource: DATASOURCE_NAME,
    public: true,
  };
  config.Charger = {
    dataSource: DATASOURCE_NAME,
    public: true,
  };
  config.Transaksi = {
    dataSource: DATASOURCE_NAME,
    public: true,
  };
  config.Callbacks = {
    dataSource: DATASOURCE_NAME,
    public: true,
  };
  // config.Product = { dataSource: DATASOURCE_NAME, public: true };
  await writeFile(
    './model-config.json',
    JSON.stringify(config, null, 2),
  );
}

discover().then(
  () => process.exit(),
  (error) => {
    console.error('UNHANDLED ERROR:\n', error);
    process.exit(1);
  },
);
