
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          
          first_name: 'Hello',
          last_name: 'Kitty',
          email: 'helloKitty@sanrio.com'
        },
        {
          
          first_name: 'Pusheen',
          last_name: 'Cat',
          email: 'pusheenCat@irish'
        },
        {
          
          first_name: 'Ansel',
          last_name: 'Adams',
          email: 'anselAdams@natgeo.com'
        },
        {
          first_name: 'Jennifer',
          last_name: 'Brotchie',
          email: 'jenniferBrotchie@gmail.com'
        },
        {
          first_name: 'David',
          last_name: 'Brotchie',
          email: 'davidBrotchie@gmail.com'
        },
      ]);
    });
};
