create database login;

use login;

create table user_table(
	user_id int primary key auto_increment,
    user_name varchar(255),
    user_email varchar(255),
    user_password varchar(255)
);

create table blog_post(
	id int primary key auto_increment,
    title varchar(255),
    category varchar(50),
    content text,
    created_at timestamp default current_timestamp
);

create table comments(
	comment_id int primary key auto_increment,
    post_id int,
    author_id int,
    content text,
    created_at timestamp default current_timestamp,
    foreign key (post_id) references blog_post(id),
    foreign key (author_id) references user_table(user_id)
);

create table categories(
	category_id int primary key,
    category_name varchar(50)
);

create table favorites(
	favorite_id int primary key auto_increment,
    post_id int,
    user_id int,
    created_at timestamp default current_timestamp,
    foreign key (post_id) references blog_post(id),
    foreign key (user_id) references user_table(user_id)
);
select * from user_table;
select * from blog_post;
select * from comments;
select * from favorites;