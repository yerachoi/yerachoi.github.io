'use strict';

module.exports = {
  url: 'https://yerachoi.github.io',
  pathPrefix: '/',
  title: "Yera's Blog",
  titleKo: "Yera's Blog",
  subtitle: 'Learning',
  subtitleKo: '배우고 있습니다',
  copyright: `© ${new Date().getFullYear()} Yera Choi`,
  postsPerPage: 10,
  useKatex: false,
  menu: [
    {
      label: { en: 'Home', ko: '홈' },
      path: '/'
    },
    {
      label: { en: 'Search', ko: '검색' },
      path: '/search'
    },
    {
      label: { en: 'Contact', ko: '연락처' },
      path: '/pages/contacts'
    }
  ],
  author: {
    name: { en: 'Yera Choi', ko: 'Yera Choi' },
    bio: {
      en: 'Learning',
      ko: '배우고 있습니다'
    },
    contacts: {
      github: {
        en: 'yerachoi',
        ko: 'yerachoi'
      },
    }
  }
};
