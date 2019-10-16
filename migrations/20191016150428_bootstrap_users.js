
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
        .notNullable();

    tbl.string('username', 25)
        .unique()
        .notNullable();
    
    tbl.string('password', 30)
        .notNullable();

    tbl.string('department', 128)
        .nullable();
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
