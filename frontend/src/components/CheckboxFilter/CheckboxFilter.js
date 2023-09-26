import React from "react";

const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
const Prices = ["0-300000", "300001-600000", "600001-1000000"];

const CheckboxFilter = ({ handleLocationFilter, handlePriceFilter }) => {
  return (
    <div className="checkbox-filter-container">
      {/* locationFIlter */}
      <div className="filter">
        <h2>Location</h2>

        {locations.map((location, index) => (
          <div key={index}>
            <input
              type="checkbox"
              value={location}
              onChange={handleLocationFilter}
            />
            {location}
          </div>
        ))}
      </div>

      {/* PriceFIlter */}
      <div className="filter">
        <h2>Price</h2>

        {Prices.map((price, index) => (
          <div key={index}>
            <input type="checkbox" value={price} onChange={handlePriceFilter} />
            {price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;
