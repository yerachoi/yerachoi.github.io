// @flow
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { AllMarkdownRemark, PageContext } from '../types';

type Props = {
  data: AllMarkdownRemark,
  pageContext: PageContext
};

const TagTemplate = ({ data, pageContext }: Props) => {
  const {
    tag,
    currentPage,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage,
    language
  } = pageContext;
  const siteTitle =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleKo;
  const siteSubtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleKo;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0
      ? language === 'en'
        ? `All Posts tagged as "${tag}" - Page${currentPage} - ${siteTitle}`
        : `"${tag}" 태그가 있는 모든 포스트 - Page${currentPage} - ${siteTitle}`
      : language === 'en'
      ? `All Posts tagged as "${tag}" - ${siteTitle}`
      : `"${tag}" 태그가 있는 모든 포스트 - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={tag}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagPage(
    $tag: String
    $postsLimit: Int!
    $postsOffset: Int!
    $language: String!
  ) {
    site {
      siteMetadata {
        title
        titleKo
        subtitle
        subtitleKo
      }
    }
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          template: { eq: "post" }
          draft: { ne: true }
          language: { eq: $language }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default TagTemplate;
