import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import ProductDetailsFood from 'containers/ProductDetailsFood/ProductDetailsFood';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'styled/product-single.style';
import { withApollo } from 'helper/apollo';
import { GET_VENDOR } from 'graphql/query/vendor.query';
import { SEO } from 'components/seo';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductPage: NextPage<Props> = ({ deviceType }) => {
  const {
    query: { slug },
  } = useRouter();

  const { data, error, loading } = useQuery(GET_VENDOR, {
    variables: { slug },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <SEO
        title={`${data?.vendor?.name} - PickBazar`}
        description={`${data?.vendor?.name} Details`}
      />
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ProductDetailsFood
              product={data?.vendor}
              deviceType={deviceType}
            />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default withApollo(ProductPage);
