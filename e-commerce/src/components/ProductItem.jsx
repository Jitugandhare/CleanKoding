import React from 'react';
import styled from 'styled-components';



const ProductItem = ({ product }) => {
  const { title, image, description, price } = product;

  return (
    <Card className="product-item">
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Price>${price}</Price>
      </Content>
    </Card>
  );
};

export default ProductItem;



const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Price = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;