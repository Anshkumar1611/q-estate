import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const ListingTable = ({ locationFilter, priceRangeFilter, sortBy }) => {
  const listingsData = JSON.parse(localStorage.getItem("listings"));
  /* states:
    current page
    selected rows
    selected data */

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
    return updatedData;
  };

  // VARIABLES
  let displayData = applyFilter(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  );
  let itemsPerPage = 10;
  const totalPage = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const isAllSelected = selectedRows.length === itemsPerPage;

  //  functions :
  // delete

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((item) => item.property_id !== id);
    const updatedTotalPage = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPage) {
      setCurrentPage(updatedTotalPage);
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  };
  const handleDeleteAllSelected = () => {
    const updatedData = filteredData.filter(
      (item) => !selectedRows.includes(item.property_id)
    );
    const updatedTotalPage = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPage) {
      setCurrentPage(updatedTotalPage);
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  };
  // edit

  // Pagination
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPage);
  };
  const handleClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };
  const getPageNumbers = (totalPage) => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers = [...pageNumbers, i];
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers(totalPage);

  // checkbox
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      let updatedData = selectedRows.filter((item) => item !== id);
      setSelectedRows(updatedData);
    }
  };
  const handleSelectedAll = (event, displayData) => {
    const isSelectedAll = event.target.checked;
    let selectedAllRows = [];
    if (isSelectedAll) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < displayData.length)
          selectedAllRows.push(displayData[i].property_id);
        else selectedAllRows.push(Math.random());
      }
      setSelectedRows(selectedAllRows);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    setFilteredData(listingsData);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter, sortBy]);

  return (
    <div className="listings-table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => handleSelectedAll(event, displayData)}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData?.slice(startIndex, endIndex)?.map((items, index) => (
            <tr className="table-row" key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(items.property_id)}
                  onChange={(event) =>
                    handleRowCheckboxChange(event, items.property_id)
                  }
                />
              </td>
              <td>{items.property_name}</td>
              <td>{items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className="action-items">
                <AiFillDelete onClick={() => handleDelete(items.property_id)} />
                <AiFillEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table Footer */}
      <div className="table-footer">
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPage < 1 ? 0 : currentPage} of {totalPage}
          </span>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers?.map((page) => (
              <button key={page} onClick={() => handleClick(page)}>
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPage}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ListingTable;
