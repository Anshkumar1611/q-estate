import React, { useEffect, useState } from "react";

const ListingTable = ({ locationFilter, priceRangeFilter, sortBy }) => {
  const listingsData = JSON.parse(localStorage.getItem("listings"));
  /* states:
    current page
    selected rows
    selected data */

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // Variables
  let itemsPerPge = 10;

  /* functions :
    delete
    edit
    Pagination
    checkbox */

  const applyFilter = (
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  ) => {
    let updatedData = [...filteredData];
    if (locationFilter.length) {
      updatedData = updatedData.filter((item) =>
        locationFilter.includes(item.city)
      );
    }
    if (priceRangeFilter.length) {
      updatedData = updatedData.filter((item) => {
        let found = false;
        priceRangeFilter.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (
            Number(item.price) >= Number(low) &&
            Number(item.price) <= Number(high)
          ) {
            found = true;
          }
        });

        return found;
      });
    }
    if (sortBy === "price") {
      updatedData.sort(
        (firstlisting, secondlisting) =>
          firstlisting.price - secondlisting.price
      );
    } else if (sortBy === "date") {
      updatedData.sort(
        (firstlisting, secondlisting) =>
          new Date(firstlisting.listing_date) -
          new Date(secondlisting.listing_date)
      );
    }
    // console.log(updatedData);
    return updatedData;
  };
  let displayData = applyFilter(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  );

  useEffect(() => {
    setFilteredData(listingsData);
  }, []);
  return (
    <div className="listings-table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={""} onChange={""} />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.length
            ? displayData.map((items, index) => (
                <tr className="table-row" key={index}>
                  <td>
                    <input type="checkbox" checked={""} onChange={""} />
                  </td>
                  <td>{items.property_name}</td>
                  <td>{items.price}</td>
                  <td>{items.address}</td>
                  <td>{items.listing_date}</td>
                  <td className="action-items">Delete,edit</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
