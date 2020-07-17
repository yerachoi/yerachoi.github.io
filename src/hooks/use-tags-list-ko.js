// @flow
import { useStaticQuery, graphql } from 'gatsby';

const useTagsListKo = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query TagsListKoQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              template: { eq: "post" }
              draft: { ne: true }
              language: { eq: "ko" }
            }
          }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  return allMarkdownRemark.group;
};

export default useTagsListKo;
