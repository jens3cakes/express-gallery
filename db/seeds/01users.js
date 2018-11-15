
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          
          first_name: 'Hello',
          last_name: 'Kitty',
          email: 'helloKitty@sanrio.com',
          username: 'hellok',
          password: '$2b$12$8htzXXdosQtcSQ0yloLTTuOt/cSKbHxPVHuaikpTUnZKWrw.5jLvq'
        },
        {
          first_name: 'Pusheen',
          last_name: 'Cat',
          email: 'pusheenCat@irish',
          username: 'pusheenc',
          password: '$2b$12$8htzXXdosQtcSQ0yloLTTuOt/cSKbHxPVHuaikpTUnZKWrw.5jLvq'
        },
        {
          first_name: 'Ansel',
          last_name: 'Adams',
          email: 'anselAdams@natgeo.com',
          username: 'ansela',
          password: '$2b$12$8htzXXdosQtcSQ0yloLTTuOt/cSKbHxPVHuaikpTUnZKWrw.5jLvq'
        },
        {
          first_name: 'David',
          last_name: 'Brotchie',
          email: 'davidBrotchie@gmail.com',
          username: 'davidb',
          password: '$2b$12$8htzXXdosQtcSQ0yloLTTuOt/cSKbHxPVHuaikpTUnZKWrw.5jLvq'
        },
      ]);
    });
};
