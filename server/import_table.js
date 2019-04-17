const loopback = require('loopback');

const ds = loopback.createDataSource('oracle', {
  host: 'oracle-demo.strongloop.com',
  port: 1521,
  database: 'XE',
  username: 'demo',
  password: 'L00pBack',
});

// Discover and build models from INVENTORY table
ds.discoverAndBuildModels(
  'INVENTORY',
  {
    visited: {},
    associations: true,
  },
  (err1, models) => {
    // Now we have a list of models keyed by the model name
    // Find the first record from the inventory
    models.Inventory.findOne({}, (err2, inv) => {
      if (err2) {
        console.error(err2);
        return;
      }
      console.log('\nInventory: ', inv);
      // Navigate to the product model
      // Assumes inventory table has a foreign key relationship to product table
      inv.product((err3, prod) => {
        console.log('\nProduct: ', prod);
        console.log('\n ------------- ');
      });
    });
  },
);
