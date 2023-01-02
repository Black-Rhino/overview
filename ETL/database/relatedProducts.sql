-- Row count is 4508263 ✅
-- Without zero values for related_product_id count should be 4508205 ✅

CREATE TABLE IF NOT EXISTS relatedProducts(

	ID SERIAL PRIMARY KEY,
    CURRENT_PRODUCT_ID INT,
    RELATED_PRODUCT_ID INT,
    FOREIGN KEY (CURRENT_PRODUCT_ID ) REFERENCES products(ID),
    FOREIGN KEY (RELATED_PRODUCT_ID ) REFERENCES products(ID)

);

COPY relatedProducts FROM '/tmp/related.csv'
DELIMITER ','
CSV HEADER
WHERE RELATED_PRODUCT_ID != 0;