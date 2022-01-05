import { gql, GraphQLClient } from "graphql-request";
import NavBar from "../../components/NavBar";
import Buttom from "../../components/buttom";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    Headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      product(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        price
        slug
        tags
        image {
          url
        }
      }
    }
  `;

  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(query, variables);
  const product = data.product;

  return {
    props: {
      product,
    },
  };
};

const Product = ({ product }) => {
  return (
    <>
      <NavBar />
      <div className="product-page">
        <h1>{product.title}</h1>
        <img src={product.image.url} />
        <h2>R$ {product.price.toFixed(2)}</h2>
        <p>Ou em 3x no cartão de R$ {(product.price / 3).toFixed(2)}</p>
        <Buttom />
      </div>
    </>
  );
};

export default Product;
