var server = require('./server');
var ds = server.dataSources.dbCoffeeHeroku;
// var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role','CoffeeShop','Review','Reviewer'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
