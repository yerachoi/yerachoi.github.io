// @flow
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList, useTagsListKo } from '../hooks';

const TagsListTemplate = ({ pageContext }) => {
  const { language } = pageContext;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleKo;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleKo;
  const tags = language === 'en' ? useTagsList() : useTagsListKo();

  return (
    <Layout
      title={`${language === 'en' ? 'Tags' : '태그'} - ${title}`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'en' ? 'Tags' : '태그'}>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link
                to={`/tag/${kebabCase(tag.fieldValue)}/${
                  language === 'en' ? '' : 'ko'
                }`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;
