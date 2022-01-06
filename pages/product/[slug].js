import { gql, GraphQLClient } from "graphql-request";
import NavBar from "../../components/NavBar";
import Button from "../../components/button";
import Footer from "../../components/footer";

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
        <Button />
        <div className="divider"></div>
        <div className="description">
        <h2>Descrição do produto:</h2>
        <p>{product.description}</p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Product;
