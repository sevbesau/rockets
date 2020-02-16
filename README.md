# SpaceWars

## TODO:

  ### game mechanics:
  - twinkle twinkle litle star
  - powerups destroyed by bullet
  - asteroids?
  - score system

    #### powerups:
    -speedboost
    -rapidFire


  ### pages:
  - login
  - register
  - lobby
  - game
  - leaderboard

  ### page layout:
  - nav header
  - content
  - footer

  ## games DB
    ### TABLE user
      id             unsigned int(11) not null auto_increment primary key
      email          varchar(25)      not null
      password       varchar(30)      not null
      username       varchar(40)      not null

    Create table command: 
    ```
    create table user(
      id int(11) unsigned auto_increment primary key not null, 
      username varchar(25) not null, 
      password varchar(30) not null, 
      email varchar(40) not null
    );
    ``` 
    
TABLE score 
id             unsigned int(11) not null auto_increment primary key
user_id        unsigned int(11) not null 
game_id        unsigned int(11) not null 
score          unsigned int(11) not null
create table score(
  id int(11) unsigned auto_increment not null primary key, 
  user_id int(11) unsigned not null, 
  game_id int(11) unsigned not null, 
  score int(11) unsigned not null 
);

TABLE game    
id             unsigned int(11) not null auto_increment primary key
title          varchar(20)      not null
create table game(
  id int(11) unsigned auto_increment not null primary key,
  title varchar(20) not null
);
