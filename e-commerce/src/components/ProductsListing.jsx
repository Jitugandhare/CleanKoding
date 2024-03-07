import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import ProductItem from "./ProductItem";

const getURL = (url, sortorder, category) => {
  let apiUrl = url;
  if (sortorder) {
    apiUrl += `?_sort=price&_order=${sortorder}`;
  }
  if (category) {
    apiUrl += `${sortorder ? '&' : '?'}category=${category}`;
  }
  return apiUrl;
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
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchAndUpdateData = async (url) => {
    setLoading(true);
    setErr(false);
    try {
      let response = await getData(url);
      setProducts(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    let url = getURL(`https://fakestoreapi.com/products`, sortorder, category);
    fetchAndUpdateData(url);
  }, [sortorder, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handlePage = (val) => {
    const updatedPage = page + val;
    setPage(updatedPage);
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (err) {
    return <ErrorMessage />;
  }

  return (
    <Container>
      <h1>Products </h1>
      <div>
        <label>Sort by price:</label>
        <select
          value={sortorder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">------</option>
          <option value="asc">Ascending order</option>
          <option value="desc">Descending order</option>
        </select>
      </div>
      <div>
        <label>Filter by category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <PaginationSection>
        <button disabled={page === 1} onClick={() => handlePage(-1)}>
          Previous
        </button>
        <button disabled>{page}</button>
        <button onClick={() => handlePage(1)}>Next</button>
      </PaginationSection>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </Container>
  );
}

export default ProductsListing;



const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    button {
      margin: 5px 0;
    }
  }
`;