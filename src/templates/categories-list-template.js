// @flow
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import {
  useSiteMetadata,
  useCategoriesList,
  useCategoriesListKo
} from '../hooks';

const CategoriesListTemplate = ({ pageContext }) => {
  const language = pageContext.language;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleKo;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleKo;
  const categories =
    language === 'ko' ? useCategoriesListKo() : useCategoriesList();
  return (
    <Layout
      title={`${language === 'en' ? 'Categories' : '카테고리'} - ${title}`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'en' ? 'Categories' : '카테고리'}>
        <ul>
          {categories.map(category => (
            <li key={category.fieldValue}>
              <Link
                to={`/category/${kebabCase(category.fieldValue)}/${
                  language === 'en' ? '' : 'ko'
                }`}
              >
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default CategoriesListTemplate;
