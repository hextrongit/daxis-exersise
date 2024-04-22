import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Shared/DataContext";
import { useParams } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

function ProductDetails() {
  const params = useParams();
  const { loading, productDetails, fetchProductDetails } =
    useContext(DataContext);

  const [productData, setProductData] = useState({
    images: [],
  });

  useEffect(() => {
    fetchProductDetails(params.id);
    setProductData(productDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      setProductData({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, productDetails.id]);

  return (
    <div className="dashBoard-container">
      <h5 className="heading p-2">Details</h5>

      <div className="container-div p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="p-2">
              <div className="row">
                <div className="images-div">
                  {productData?.images?.map((image, index) => (
                    <Figure key={index}>
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src={image}
                      />
                    </Figure>
                  ))}
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>{productData.title}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h6>{productData.brand}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p>{productData.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>{productData.rating}⭐</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Price: {productData.price}/- ({productData.discountPercentage} %⬇️)</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h6>{productData.stock} left</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
