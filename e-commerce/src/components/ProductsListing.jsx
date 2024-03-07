import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import ProductItem from "./ProductItem";

const getURL = (url, sortorder) => {
  if (sortorder) {
    url = url + `?_sort=price&_order=${sortorder}`;
  }
  return url;
};

const getData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

function ProductsListing() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);

  const [sortorder, setSortOrder] = useState("");

  const fetchAndUpdateData = async (url) => {
    setLoading(true);
    setErr(false);
    try {
      let response = await getData(url);
      console.log(response);
      setProducts(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    let url = getURL(
      `https://fakestoreapi.com/products`,
      sortorder
    );
    
    fetchAndUpdateData(url);
  }, [sortorder]);

    const handlePage = (val) => {
        const updatedPage = page + val;
        setPage(updatedPage);
    }
    
    
    
  if (loading) {
    return <LoadingIndicator />;
  }
  if (err) {
    return <ErrorMessage />;
  }
  return (
    <>
      <h1>Products </h1>
      <div>
        <label>sort by price:</label>
        <select
          value={sortorder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">------</option>
          <option value="asc">ascending order</option>
          <option value="desc">descending order</option>
        </select>
      </div>
      <div className="pagination-section">
        <button disabled={page === 1} onClick={() => handlePage(-1)}>
          Previous
        </button>
        <button disabled>{page}</button>
        <button onClick={() => handlePage(+1)}>
          Next
        </button>
      </div>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </>
  );
}

export default ProductsListing;
