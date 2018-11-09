
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('photo_gallery').del()
    .then(function () {
      // Inserts seed entries
      return knex('photo_gallery').insert([
        {
          
          author: 'Hello Kitty',
          description: 'Me and my bff',
          link: 'https://www.sanrio.com/media/W1siZiIsIjIwMTYvMDYvMTMvMTQvMTEvNDAvMTQvY2hhcmFjdGVyX2Jhbm5lcl9oZWxsb2tpdHR5LnBuZyJdXQ/character_banner_hellokitty.png?sha=95006e8644727395',
          
        },
        {
          
          author: 'Ansel Adams',
          description: 'Mirror Lake, Yosemite National Park',
          link: 'https://learn.canva.com/wp-content/uploads/2018/04/AnselAdamsPhotography4.jpg',
        },
        {
          
          author: 'Jennifer Brotchie',
          description: 'Na Pali Coast',
          link: 'https://jenniferbrotchie-hawaii-portfolio.com/napali-coast-kauai',
        },
        {
          author: 'David Brotchie',
          description: 'Electric Beach - turtle-',
          link: 'https://3.bp.blogspot.com/-xhLxIGFqdnY/Wzb5TPTqsqI/AAAAAAAAEeU/JZEpJYBRCIsW3pPHPyVHakH1Qc6rlXqDwCEwYBhgL/s640/Nikonos-3.jpg',
        },
        {
          author: 'Pusheen Cat',
          description: 'Caticorn',
          link: 'https://banner2.kisspng.com/20180902/icy/kisspng-pusheen-cat-pusheen-sock-in-a-mug-unicorn-stickers-for-stikeran-stickers-www-1stickers-com-5b8c1ff6e815d3.4457231815359098789506.jpg',
        }
      ]);
    });
};
