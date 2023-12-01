create database login;

use login;

create table user_table(
	user_id int primary key auto_increment,
    user_name varchar(255),
    user_email varchar(255),
    user_password varchar(255)
);
INSERT INTO user_table (user_name, user_email, user_password)
VALUES
    ('John Doe', 'john@example.com', 'hashed_password_1'),
    ('Jane Smith', 'jane@example.com', 'hashed_password_2'),
    ('Alice Johnson', 'alice@example.com', 'hashed_password_3');

create table blog_post(
	id int primary key auto_increment,
    title varchar(255),
    category varchar(50),
    content text,
    created_at timestamp default current_timestamp
);
INSERT INTO blog_post (title, category, content)
VALUES
    ('Exploring Nature', 'Nature', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    ('Tech Trends', 'Technology', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'),
    ('Culinary Adventures', 'Food', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

create table comments(
	comment_id int primary key auto_increment,
    post_id int,
    author_id int,
    content text,
    created_at timestamp default current_timestamp,
    foreign key (post_id) references blog_post(id),
    foreign key (author_id) references user_table(user_id)
);
INSERT INTO comments (post_id, author_id, content)
VALUES
    (1, 2, 'Great post!'),
    (1, 3, 'I love exploring nature.'),
    (2, 1, 'Interesting tech trends.'),
    (3, 2, 'The culinary adventures are inspiring.');

create table categories(
	category_id int primary key,
    category_name varchar(50)
);
INSERT INTO categories (category_id, category_name)
VALUES
    (1, 'Technology'),
    (2, 'Travel'),
    (3, 'Food'),
    (4, 'Sports'),
    (5, 'Science');

create table favorites(
	favorite_id int primary key auto_increment,
    post_id int,
    user_id int,
    created_at timestamp default current_timestamp,
    foreign key (post_id) references blog_post(id),
    foreign key (user_id) references user_table(user_id)
);
INSERT INTO favorites (post_id, user_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
select * from user_table;
select * from blog_post;
select * from comments;
select * from favorites;