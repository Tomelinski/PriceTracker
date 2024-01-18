import * as React from 'react';
// import {  } from "@mui/material";
import ItemBanner from './ItemBanner';
import ItemGraph from './ItemGraph';

export default function ItemPage(props) {
    const item = {
        "name": "Samsung Galaxy Tab S9 FE, 10.9 in. 128gb with S-Pen",
        "retailer": "Costco Canada",
        "specifications": {"Type": "Galaxy Tab", "Brand": "Samsung", "Screen Size": "27.69 cm (10.9 in.)", "Operating System": "Android", "Internal Storage Capacity": "128GB"},
        "price": 497.99,
        "priceHistory": [{"date": "2023-12-20", "price": "447.99"}, {"date": "2023-12-25", "price": "597.99"}, {"date": "2023-12-29", "price": "417.99"},{"date": "2023-12-31", "price": "497.99"}, {"date": "2024-01-01", "price": "457.99"}, {"date": "2024-01-02", "price": "497.99"}, {"date": "2024-01-03", "price": "487.99"}, {"date": "2024-01-04", "price": "497.99"}],
        "siteURL": "https://www.costco.ca/samsung-galaxy-tab-s9-fe,-10.9-in.-128gb-with-s-pen.product.4000152929.html",
        "imageURL": "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&imageId=4000152929-894__1&recipeName=350",
        "createdAt": "2023-12-31 18:54:52",
        "updatedAt": "2023-12-31 18:55:03"
      };

    return (
      <div>
        <ItemBanner product={item} /> 
        <ItemGraph priceHistory={item.priceHistory} retailer={item.retailer} /> 
      </div>
    );
  }
