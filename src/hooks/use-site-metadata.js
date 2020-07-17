// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name {
                en
                ko
              }
              bio {
                en
                ko
              }
              contacts {
                github {
                  en
                  ko
                }
              }
            }
            menu {
              label {
                en
                ko
              }
              path
            }
            url
            title
            titleKo
            subtitle
            subtitleKo
            copyright
          }
        }
      }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
