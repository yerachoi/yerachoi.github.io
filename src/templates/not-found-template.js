// @flow
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = ({ pageContext }) => {
  const { language } = pageContext;
  const title =
    language === 'en' ? useSiteMetadata().title : useSiteMetadata().titleKo;
  const subtitle =
    language === 'en'
      ? useSiteMetadata().subtitle
      : useSiteMetadata().subtitleKo;

  return (
    <Layout
      title={`${title} - ${
        language === 'en' ? 'Not Found' : '페이지를 찾을 수 없습니다'
      }`}
      description={subtitle}
    >
      <Sidebar />
      <Page title={language === 'ko' ? '페이지를 찾을 수 없습니다' : 'NOT FOUND'}>
        <p>
          {language === 'ko'
            ? '찾는 페이지가 존재하지 않습니다.'
            : "You just hit a route that doesn't exist... the sadness."}
        </p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
