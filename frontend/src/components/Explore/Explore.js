import React, { useState } from "react";
import {
  Header,
  CheckboxFilter,
  SortingFilter,
  ListingTable,
} from "../../components";

const Explore = () => {
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const handleLocationFilter = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setLocationFilter((prev) => [...prev, e.target.value]);
    } else {
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== e.target.value)
      );
    }
  };

  const handlePriceFilter = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setPriceRangeFilter((prev) => [...prev, e.target.value]);
    } else {
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleSortByFilter = (e) => {
    setSortBy(e.target.value);
  };
  return (
    <>
      {/* Header    */}
      <Header />
      <div className="property-listing-view"></div>
      {/* checkbox filter */}
      <CheckboxFilter
        handleLocationFilter={handleLocationFilter}
        handlePriceFilter={handlePriceFilter}
        locationFilter={locationFilter}
        priceRangeFilter={priceRangeFilter}
      />
      {/* Sorting Filters */}
      <SortingFilter handleSortByFilter={handleSortByFilter} sortBy={sortBy} />
      {/* Listing-Table */}
      <ListingTable
        locationFilter={locationFilter}
        priceRangeFilter={priceRangeFilter}
        sortBy={sortBy}
      />
      {/* Pagination */}
    </>
  );
};

export default Explore;
