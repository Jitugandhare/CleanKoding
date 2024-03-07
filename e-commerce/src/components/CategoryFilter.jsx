import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
`;

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category);
  };

  return (
    <div>
      <label htmlFor="category-select">Filter by category:</label>
      <Select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>
    </div>
  );
};

export default CategoryFilter;
