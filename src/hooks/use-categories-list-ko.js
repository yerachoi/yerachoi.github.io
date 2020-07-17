// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useCategoriesListKo = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query CategoriesListKoQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              template: { eq: "post" }
              draft: { ne: true }
              language: { eq: "ko" }
            }
          }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  return allMarkdownRemark.group;
};

export default useCategoriesListKo;
