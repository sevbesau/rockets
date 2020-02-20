# games website

## TODO:

### spacewars game mechanics:
- twinkle twinkle litle star
- powerups destroyed or picked by bullet
- asteroids?
- score system

#### powerups:
- rapidFire

### Login an Register form
- validate
- sanitize

### pages:
- games -> styling
- leaderboards -> create

### page layout:
- footer

### bugs
- header dropdown alligned left

## games DB
### TABLE Users
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| email    | varchar(255)      | not null | 
| password | varchar(255)      | not null |
| username | varchar(255)      | not null |

Create table command: 

```
create table Users(
  id int(11) unsigned auto_increment primary key not null, 
  username varchar(255) not null, 
  password varchar(255) not null, 
  email varchar(255) not null
);
``` 

### TABLE Scores
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| user_id  | unsigned int(11) | not null 
| game_id  | unsigned int(11) | not null 
| score    | unsigned int(11) | not null

Create table command: 

```
create table Scores(
  id int(11) unsigned auto_increment not null primary key, 
  user_id int(11) unsigned not null, 
  game_id int(11) unsigned not null, 
  score int(11) unsigned not null 
);
```

### TABLE Games
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| title    | varchar(20)      | not null |

Create table command: 

```
create table Games(
  id int(11) unsigned auto_increment not null primary key,
  title varchar(20) not null
);
```
