-- Step 1: Created the new 'user' table
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Step 2: Created the new 'home' table
CREATE TABLE home (
  id INT AUTO_INCREMENT PRIMARY KEY,
  street_address VARCHAR(255) UNIQUE NOT NULL,
  state VARCHAR(50),
  zip VARCHAR(10),
  sqft FLOAT,
  beds INT,
  baths INT,
  list_price FLOAT
);

-- Step 3: Created the 'user_home_relation' table
CREATE TABLE user_home_relation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  home_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (home_id) REFERENCES home(id)
);

-- Step 4: Inserted distinct users into 'user' table
INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;

-- Step 5: Inserted distinct homes into 'home' table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;

-- Step 6: Populate 'user_home_relation' table
INSERT INTO user_home_relation (user_id, home_id)
SELECT u.id, h.id
FROM user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address;

-- Step 7: Drop the old 'user_home' table
DROP TABLE user_home;