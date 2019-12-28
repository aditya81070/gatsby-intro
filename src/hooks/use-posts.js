import { graphql, useStaticQuery } from 'gatsby';

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            author
            slug
            title
          }
          excerpt
        }
      }
    }
  `);
  console.log(data);
  return data.allMdx.nodes.map(post => {
    const { title, slug, author } = post.frontmatter;
    const { excerpt } = post;
    return {
      title,
      slug,
      author,
      excerpt,
    };
  });
};

export default usePosts;
