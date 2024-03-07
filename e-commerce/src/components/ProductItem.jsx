function ProductItem({
  id,
  category,
  description,
  image,
  price,
  rating,
  title,
}) {
  return (
    <div className="product-item">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <h4>Category:{category}</h4>
      <h4>Price:USD{price}</h4>
      <p>{description}</p>
    </div>
  );
}

export default ProductItem;