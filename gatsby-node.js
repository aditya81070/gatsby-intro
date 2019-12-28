exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    /* when you have errors, it will stop gatsby build and we can fix
      the errors */
    reporter.panic('failed to create posts', result.errors);
  }
  const posts = result.data.allMdx.nodes;
  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve('./src/templates/post.js'),
      context: {
        slug: post.frontmatter.slug,
      },
    });
  });
};
