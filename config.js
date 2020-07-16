'use strict';

module.exports = {
  url: 'https://yerachoi.github.io',
  pathPrefix: '/',
  title: "Yera's Blog",
  titleJa: "Yera's Blog",
  subtitle: 'Learning',
  subtitleJa: '배우고 있습니다',
  copyright: `© ${new Date().getFullYear()} Yera Choi`,
  postsPerPage: 10,
  useKatex: false,
  menu: [
    {
      label: { en: 'Home', ja: '홈' },
      path: '/'
    },
    {
      label: { en: 'Search', ja: '검색' },
      path: '/search'
    },
    {
      label: { en: 'Contact', ja: '연락처' },
      path: '/pages/contacts'
    }
  ],
  author: {
    name: { en: 'Yera Choi', ja: 'Yera Choi' },
    photo: '/favicon.ico',
    bio: {
      en: 'Learning',
      ja: '배우고 있습니다'
    },
    contacts: {
      github: {
        en: 'yerachoi',
        ja: 'yerachoi'
      },
      rss: { en: '/rss.xml', ja: '/rss.xml' }
    }
  }
};
