import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchItem } from "../../../api/Axios";
import { ItemBanner } from "../Banner";
import { ItemGraph } from "../Graph";

const ItemPage = () => {
  const location = useLocation();
  const itemObject = location.state?.itemObject;
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      if (!itemObject) {
        const item = await fetchItem(productId, null);

        setProduct(item);
      } else {
        setProduct(itemObject);
      }
    };
    getProduct();
  }, [productId, itemObject]);

  return (
    <Box mt={3}>
      {product ? (
        <>
          <ItemBanner product={product} />
          <ItemGraph
            priceHistory={product.priceHistory}
            retailer={product.retailer}
          />
        </>
      ) : (
        <>...Loading</>
      )}
    </Box>
  );
};

export default ItemPage;
