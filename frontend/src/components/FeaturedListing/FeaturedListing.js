import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, Grid } from "@mui/material";
import config from "../../config";
import axios from "axios";
import "./FeaturedLList.css";

const FeaturedListing = () => {
  const [listingData, setListingData] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const result = response.data.listings;
      localStorage.setItem("listings", JSON.stringify(result));
      setListingData(result.slice(1, 9));
    } catch (error) {
      console.log(error.response);
      setListingData([]);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box sx={{ width: 100 % "" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listingData.length ? (
          listingData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data.property_id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/assets/real-estate-${index}.jpg`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      className="property-name"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {data.property_name.slice(0, 6)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="listing-details">
                      <span className="property-price">Rs {data.price}</span>
                      <span className="property-city">
                        {data.city.slice(0, 5)}
                      </span>
                    </div>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={6} md={8}>
            <div className="error-message">
              <p>No Featured Listing Found!</p>
            </div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FeaturedListing;
