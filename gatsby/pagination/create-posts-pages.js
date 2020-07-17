'use strict';

const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            home: { ne: false }
            language: { eq: "en" }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              date
            }
          }
        }
        totalCount
      }
    }
  `);

  const { postsPerPage } = siteConfig;
  const numPages = Math.ceil(
    result.data.allMarkdownRemark.totalCount / postsPerPage
  );
  let dates = [];
  let datesSet = [];
  if (postsPerPage === 1) {
    result.data.allMarkdownRemark.edges.forEach(edge => {
      dates.push(edge.node.frontmatter.date);
    });
  } else {
    result.data.allMarkdownRemark.edges.forEach((edge, index) => {
      if (!(index % postsPerPage)) {
        datesSet.push(edge.node.frontmatter.date);
      } else if (!((index + 1) % postsPerPage)) {
        datesSet.push(edge.node.frontmatter.date);
      }
      if (
        datesSet.length === 2 ||
        index === result.data.allMarkdownRemark.edges.length - 1
      ) {
        dates.push(datesSet.slice());
        datesSet.length = 0;
      }
    });
  }

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/' : `/page/${i}`,
      component: path.resolve('./src/templates/index-template.js'),
      context: {
        currentPage: i,
        totalPage: numPages,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i <= 1 ? '/' : `/page/${i - 1}`,
        nextPagePath: `/page/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1,
        language: 'en',
        dates: dates
      }
    });
  }

  // ko
  const resultKo = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            template: { eq: "post" }
            draft: { ne: true }
            home: { ne: false }
            language: { eq: "ko" }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              date
            }
          }
        }
        totalCount
      }
    }
  `);

  const numPagesKo = Math.ceil(
    resultKo.data.allMarkdownRemark.totalCount / postsPerPage
  );
  let datesKo = [];
  if (postsPerPage === 1) {
    resultKo.data.allMarkdownRemark.edges.forEach(edge => {
      datesKo.push(edge.node.frontmatter.date);
    });
  } else {
    let datesSetKo = [];
    resultKo.data.allMarkdownRemark.edges.forEach((edge, index) => {
      if (!(index % postsPerPage)) {
        datesSetKo.push(edge.node.frontmatter.date);
      } else if (!((index + 1) % postsPerPage)) {
        datesSetKo.push(edge.node.frontmatter.date);
      }
      if (
        datesSetKo.length === 2 ||
        index === resultKo.data.allMarkdownRemark.edges.length - 1
      ) {
        datesKo.push(datesSetKo.slice());
        datesSetKo.length = 0;
      }
    });
  }

  for (let i = 0; i < numPagesKo; i += 1) {
    createPage({
      path: i === 0 ? '/ko' : `/page/${i}/ko`,
      component: path.resolve('./src/templates/index-template.js'),
      context: {
        currentPage: i,
        totalPage: numPagesKo,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i <= 1 ? '/ko' : `/page/${i - 1}/ko`,
        nextPagePath: `/page/${i + 1}/ko`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPagesKo - 1,
        language: 'ko',
        dates: datesKo
      }
    });
  }
};
