
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('photo_gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('photo_gallery').insert([
        {
          id: 1,
          author: 'Hello Kitty',
          description: 'Me and my bff',
          link: 'https://www.sanrio.com/media/W1siZiIsIjIwMTYvMDYvMTMvMTQvMTEvNDAvMTQvY2hhcmFjdGVyX2Jhbm5lcl9oZWxsb2tpdHR5LnBuZyJdXQ/character_banner_hellokitty.png?sha=95006e8644727395',
          author_id: 1
        },
        {
          id: 2,
          author: 'Anger Emotion',
          description: 'FIRE',
          link: 'https://vignette.wikia.nocookie.net/pixar/images/7/7a/Io_Anger_standard2.jpg/revision/latest/scale-to-width-down/310?cb=20150425021210',
          author_id: 3
        },
        {
          id: 3,
          author: 'Ansel Adams',
          description: 'Mirror Lake, Yosemite National Park',
          link: 'https://learn.canva.com/wp-content/uploads/2018/04/AnselAdamsPhotography4.jpg',
          author_id: 4
        },
        {
          author: 'Elon Musk',
          description: 'Tesla Roadster',
          link: 'https://cdn.vox-cdn.com/thumbor/pPzC2mitW59SkkeVb6XhuIZG8ps=/0x0:1192x866/920x613/filters:focal(501x338:691x528):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/58088359/Screen_Shot_2017_12_22_at_2.22.54_PM.0.png',
          author_id: 5
        },
        {
        author: 'Pusheen Cat',
        description: 'MermaCat'
        }
      ]);
    });
};
