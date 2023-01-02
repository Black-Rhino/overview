-- Row count is: 5655463 (skipping bad lines)

CREATE TABLE IF NOT EXISTS photos(

	ID SERIAL PRIMARY KEY,
    STYLE_ID INT,
	URL TEXT,
	THUMBNAIL_URL TEXT,
    FOREIGN KEY (STYLE_ID) REFERENCES styles(ID)
    
);

COPY photos FROM '/tmp/photos.csv'
DELIMITER ','
CSV HEADER;