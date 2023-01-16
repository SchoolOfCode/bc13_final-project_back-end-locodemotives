import { pool } from "./index.js";

// create tables
async function createTables() {
  return await pool.query(
    `CREATE TABLE users
        (
            user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            email TEXT,
            password TEXT,
            image_url TEXT,
            team TEXT,
            name TEXT
        );
    CREATE TABLE posts
        (
	        post_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	        title TEXT,
	        topic TEXT,
	        body TEXT,
            date_created timestamp,
  	        author INT references users(user_id)
        );
    CREATE TABLE replies
        (
	        reply_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        	post INT references posts(post_id),
        	author INT references users(user_id),
        	body TEXT,
            date_created timestamp
        );
    CREATE TABLE resources
        (
	        resource_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	        title TEXT,
            description TEXT,
        	link TEXT,
        	topic TEXT,
        	type TEXT,
         	author INT references users(user_id),
         	date_created timestamp
        );`
  );
}

// drop table if exists
async function dropTables() {
  return await pool.query(
    `DROP TABLE IF EXISTS users, posts, replies, resources;`
  );
}

// refill tables with default data
async function refillTables() {
  return await pool.query(
    `INSERT INTO
        users (email, password, image_url, team, name)
        VALUES
        (
            'roman@hadjisergis.com',
            'password',
            'https://media.licdn.com/dms/image/C4E03AQESW-XZpUTkag/profile-displayphoto-shrink_200_200/0/1661709031700?e=1678320000&v=beta&t=bTtCI6uptdJ4gvZ1zYcfU_GGnOzI3xtIqEw_trwSI9o',
            'Marketing',
            'Roman Hadjisergis'
        ),
        (
            'elspeth@brown.com',
            'password',
            'https://media.licdn.com/dms/image/C4D03AQGIUbB4ny1kqw/profile-displayphoto-shrink_100_100/0/1643843775517?e=1678320000&v=beta&t=auTGSfTGEiL5u3cmMq_qtjIulqDF9-rxVBQCe1IQ4G8',
            'Digital Development',
            'Elspeth Brown'
        ),
        (
            'ben@lloyd.com',
            'password',
            'https://media.licdn.com/dms/image/D4E03AQGAm-_-96TjdQ/profile-displayphoto-shrink_100_100/0/1669112547798?e=1678320000&v=beta&t=Q_Kjj3CFKLRK0AYo402EUf1WgtErBVS5Ps6TS5B2Hqg',
            'DevOps',
            'Ben Lloyd'
        ),
        (
            'cameron@mynett.com',
            'password',
            'https://media.licdn.com/dms/image/C4E03AQEXLX9qq9xPyg/profile-displayphoto-shrink_100_100/0/1646163526730?e=1678320000&v=beta&t=SrynGn8LHHUp9ICNs5c8RvF8XKvU5RPdCEipg0k2j0E',
            'Business Analysis',
            'Cameron Mynett'
        );
        INSERT INTO
            posts (title, topic, body, date_created, author)
        VALUES
        (
	        'PostgreSQL foreign keys',
	        'DevOps',
        	'How to do foreign keys in postgreSQL?',
            '2023-01-06',
         	1
        ),
        (
            'Flex-box or grid for onboarding dashboard',
            'Digital Development',
            'Should I used flex-box or grid when creating the onboarding dashboard app?',
            '2023-01-06',
            3
        );
        INSERT INTO
            replies (post, author, body, date_created)
        VALUES
        (
  	        1,
  	        2,
	        'Use references table_name(table_item)',
            '2023-01-07'
        ),
        (
            2,
            4,
            'I think grid would be best for this application.',
            '2023-01-06'
        ),
        (
            2,
            2,
            'I agree with Cameron!',
            '2023-01-07'
        );
        INSERT INTO
            resources (title, description, link, topic, type, author, date_created)
        VALUES
        (
	        'DevOps Handbook',
            'How to Create World-Class Agility, Reliability, and Security in Technology Organizations',
  	        'https://www.amazon.co.uk/Devops-Handbook-World-Class-Reliability-Organizations/dp/1942788002',
  	        'DevOps',
  	        'Book',
  	        1,
  	        '2023-02-12'
        ),
        (
            'FreeCodeCamp - (New) Responsive Web Design',
            'In this Responsive Web Design Certification, you''ll learn the languages that developers use to build webpages: HTML (Hypertext Markup Language) for content, and CSS (Cascading Style Sheets) for design.',
            'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
            'Digital Development',
            'Course',
            3,
            '2022-12-25'
        );`
  );
}

// resets the database
async function resetTables() {
  return [await dropTables(), await createTables(), await refillTables()];
}

export { createTables, dropTables, refillTables, resetTables };
