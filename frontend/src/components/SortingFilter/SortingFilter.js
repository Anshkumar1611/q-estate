import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

const options = ["none", "price", "date"];

const SortingFilter = ({ handleSortByFilter, sortBy }) => {
  return (
    <div className="sorting-filter-container">
      <h2 className="title">Sort By:</h2>
      <Box sx={{ minWidth: 120 }}></Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="sorting-label"
          id="demo-simple-select"
          label="Sort-By"
          value={sortBy}
          onChange={handleSortByFilter}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingFilter;
