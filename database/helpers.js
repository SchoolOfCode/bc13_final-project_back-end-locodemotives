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
            'How to Create World-Class Agility, Reliability, and Security in Technology Organizations.',
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
        ),
        (
	        'School of Code',
            'School of Code is about opening the opportunity of tech up to everyone. Our free coding bootcamp takes you from 0 to programmer and launches you into a tech career with our Employer Partners.',
  	        'https://www.schoolofcode.co.uk/',
  	        'Digital Development',
  	        'Course',
  	        4,
  	        '2023-01-16'
        ),
        (
	        'AWS - Training and Certification',
            'Learn from AWS experts. Advance your skills and knowledge. Build your future in the AWS Cloud.',
  	        'https://aws.amazon.com/training/',
  	        'DevOps',
  	        'Course',
  	        4,
  	        '2022-11-30'
        ),
        (
	        'Quality for DevOps teams',
            'Supporting teams in implementing quality in DevOps culture, with practical examples, useful knowledge and some theoretical background.',
  	        'https://www.amazon.co.uk/Quality-DevOps-teams-Rik-Marselis/dp/9075414897',
  	        'DevOps',
  	        'Book',
  	        1,
  	        '2022-12-20'
        ),
        (
	        'Rail Technology Magazine',
            'Rail Technology Magazine is Britain''s rail industry media leader with 22 years'' worth of experience when it comes to producing an industry-leading magazine.',
  	        'https://www.railtechnologymagazine.com/',
  	        'General',
  	        'Website',
  	        1,
  	        '2023-01-01'
        ),
        (
	        'Chartered Institution of Railway Operators',
            'CIRO is the UK''s leading provider of recognised training opportunities for the railway operations sector.',
  	        'https://www.ciro.org/',
  	        'General',
  	        'Website',
  	        3,
  	        '2023-01-02'
        ),
        (
	        'Learn Java - Codecademy',
            'Popular for its versatility and ability to create a wide variety of applications, learning Java opens up your possibilities when coding.',
  	        'https://www.codecademy.com/learn/learn-java',
  	        'Digital Development',
  	        'Course',
  	        2,
  	        '2023-01-03'
        ),
        (
	        'Learn Spring - Codecademy',
            'If you want to build reliable web APIs, expand your Java knowledge, and develop market-ready skills, Spring is your framework.',
  	        'https://www.codecademy.com/learn/learn-spring',
  	        'Digital Development',
  	        'Course',
  	        3,
  	        '2023-01-04'
        ),
        (
	        'Learn AngularJS 1.X - Codecademy',
            'AngularJS is a full-featured framework that is incredibly popular among developers. For single-page applications, the AngularJS framework creates rich interactive features for a real-time experience.',
  	        'https://www.codecademy.com/learn/learn-angularjs',
  	        'Digital Development',
  	        'Course',
  	        2,
  	        '2023-01-05'
        ),
        (
	        'Learn TypeScript - Codecademy',
            'JavaScript is a powerful programming language. But as it continues to evolve, outdated code gets messy and difficult to maintain. That''s where TypeScript comes in. It builds on your JavaScript foundation so you can develop higher-quality, less error-prone code faster.',
  	        'https://www.codecademy.com/learn/learn-typescript',
  	        'Digital Development',
  	        'Course',
  	        1,
  	        '2022-01-05'
        ),
        (
	        'The Knowledge Academy',
            'Business Analysts are a communication bridge between IT and business stakeholders. Our range of specially created Business Analysis training provides you with the skills and knowledge needed for a successful Business Analyst career.',
  	        'https://www.theknowledgeacademy.com/courses/business-analysis-training/',
  	        'Business Analysis',
  	        'Website',
  	        4,
  	        '2023-01-15'
        ),
        (
	        'Clean Code: A Handbook of Agile Software Craftsmanship',
            'Even bad code can function. But if code isn''t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn''t have to be that way.',
  	        'https://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1?adgrpid=60036651104&gclid=Cj0KCQjwxIOXBhCrARIsAL1QFCbRkrm0fMZ7rGtSlibqHH_cPWJejm_sWcBwyIddOqMe8-TY5sMZUwsaAhwHEALw_wcB&hvadid=259042529517&hvdev=c&hvlocphy=1006933&hvnetw=g&hvqmt=e&hvrand=13259835964503087567&hvtargid=kwd-301191331858&hydadcr=28145_1752629&keywords=clean+code&qid=1658911704&sr=8-1',
  	        'Digital Development',
  	        'Book',
  	        3,
  	        '2022-11-15'
        ),
        (
	        'Modern Analyst',
            'Useful BA media.',
  	        'https://www.modernanalyst.com/Resources/ArticlesListing.aspx',
  	        'Business Analysis',
  	        'Article',
  	        4,
  	        '2022-12-15'
        ),
        (
	        'DevOps.com',
            'DevOps.com has established itself as an indispensable resource for DevOps education and community building. We make it our mission to cover all aspects of DevOps—philosophy, tools, business impact, best practices and more.',
  	        'https://devops.com/',
  	        'DevOps',
  	        'Website',
  	        2,
  	        '2023-02-01'
        ),
        (
	        'Front Page',
            '16 Workplace Email Etiquette Rules for Communicating with Co-workers and Customers.',
  	        'https://front.com/blog/email-etiquette-rules-in-the-workplace',
  	        'General',
  	        'Article',
  	        4,
  	        '2022-02-01'
        ),
        (
	        'Google UX Design Professional Certificate',
            'Get started in the in-demand field of user experience (UX) design with a Professional Certificate from Google. Learn UX foundations and gain experience with the design process, including how to build wireframes and prototypes and conduct user research to test your designs.',
  	        'https://www.coursera.org/professional-certificates/google-ux-design?irclickid=zCjULx1mwxyNWQlSYRwg9QLTUkAwPwWFm0BRXQ0&irgwc=1&utm_medium=partners&utm_source=impact&utm_campaign=3294490&utm_content=b2c',
  	        'Marketing',
  	        'Course',
  	        1,
  	        '2023-01-06'
        ),
        (
	        'Getting Started with Adobe Illustrator for Beginners Tutorial',
            'This tutorial covers the basics of getting started inside Adobe Illustrator! I walk through how to set up documents, how to create and modify type, how to draw basic shapes and also give them rounded corners, give a very basic overview of using the pen tool, and then finish showing the brush and blob brush tools.',
  	        'https://www.youtube.com/watch?v=AinkCNooh2A',
  	        'Marketing',
  	        'Video',
  	        1,
  	        '2023-01-16'
        ),
        (
	        'What Creativity in Marketing Looks Like Today',
            'What makes marketing creative? Is it more imagination or innovation? Is a creative marketer more artist or entrepreneur? Historically, the term “marketing creative” has been associated with the words and pictures that go into ad campaigns.',
  	        'https://hbr.org/2017/03/what-creativity-in-marketing-looks-like-today',
  	        'Marketing',
  	        'Article',
  	        1,
  	        '2023-01-16'
        ),
        (
	        'What Is Agile Methodology?',
            'Introduction to Agile Methodology in Six Minutes | Simplilearn',
  	        'https://www.youtube.com/watch?v=8eVXTyIZ1Hs',
  	        'Business Analysis',
  	        'Video',
  	        2,
  	        '2023-01-15'
        );`
  );
}

// resets the database
async function resetTables() {
  return [await dropTables(), await createTables(), await refillTables()];
}

export { createTables, dropTables, refillTables, resetTables };
