'use strict';
const server = require('./server');
const ds = server.dataSources.dbCoffeeHeroku;
const lbTables = [
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'CoffeeShop',
  'Review',
  'Reviewer'];
ds.automigrate(lbTables, (er) => {
  if (er) throw er;
  console.log(
    'Loopback tables [' + lbTables + '] created in ', ds.adapter.name
  );
  ds.disconnect();
});
