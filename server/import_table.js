'use strict';
const loopback = require('loopback');
const ds = loopback.createDataSource('oracle', {
  'host': 'oracle-demo.strongloop.com',
  'port': 1521,
  'database': 'XE',
  'username': 'demo',
  'password': 'L00pBack',
});

// Discover and build models from INVENTORY table
ds.discoverAndBuildModels('INVENTORY', {visited: {}, associations: true},
  (err, models) => {
    // Now we have a list of models keyed by the model name
    // Find the first record from the inventory
    models.Inventory.findOne({}, (err, inv) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('\nInventory: ', inv);
      // Navigate to the product model
      // Assumes inventory table has a foreign key relationship to product table
      inv.product((err, prod) => {
        console.log('\nProduct: ', prod);
        console.log('\n ------------- ');
      });
    });
  });
