CREATE DATABASE forest_admin;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
use forest_admin;

CREATE TABLE IF NOT EXISTS `roles` (
  `id` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into roles values ('a3ea9fcc-2234-46e0-a135-9a9cd373fd69', 'super', 
'Manage the user Roles.', '2024-10-26 14:08:58', '2024-10-26 14:08:58');

insert into roles values ('1065dae6-5d26-405f-8dea-0c8aab83eb6c', 'admin', 
'Responsible to approve the requests.', '2024-10-26 14:08:58', '2024-10-26 14:08:58');

insert into roles values ('6257e8fa-432e-4bd2-b393-1c9d2c44595c', 'user', 
'Rsponsible to raise the requests.', '2024-10-26 14:08:58', '2024-10-26 14:08:58');


CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `gender` varchar(10) NULL,
  `role_id` varchar(36),
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_active` boolean NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into users values ('88bd6aa6-41ff-455b-8a7d-99996c711031', 'Swapnil Kadam', 
9423063622, 'kadam.swapnil39@gmail.com','!nn0vate','Male','a3ea9fcc-2234-46e0-a135-9a9cd373fd69',
'2024-10-26 14:08:58', '2024-10-26 14:08:58', true);