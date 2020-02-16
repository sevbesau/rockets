# games website

## TODO:

### spacewars game mechanics:
- twinkle twinkle litle star
- powerups destroyed or picked by bullet
- asteroids?
- score system

#### powerups:
-rapidFire


### pages:
- games -> styling
- leaderboards -> create

### page layout:
- footer

## games DB
### TABLE user
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| email    | varchar(25)      | not null | 
| password | varchar(30)      | not null |
| username | varchar(40)      | not null |

Create table command: 

```
create table user(
  id int(11) unsigned auto_increment primary key not null, 
  username varchar(25) not null, 
  password varchar(30) not null, 
  email varchar(40) not null
);
``` 

### TABLE score 
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| user_id  | unsigned int(11) | not null 
| game_id  | unsigned int(11) | not null 
| score    | unsigned int(11) | not null

Create table command: 

```
create table score(
  id int(11) unsigned auto_increment not null primary key, 
  user_id int(11) unsigned not null, 
  game_id int(11) unsigned not null, 
  score int(11) unsigned not null 
);
```

### TABLE game    
| name     | type             | null     | primary | extra          |
| -------- | ---------------- | -------- |:-------:| -------------- |
| id       | unsigned int(11) | not null | *       | auto_increment |
| title    | varchar(20)      | not null |

Create table command: 

```
create table game(
  id int(11) unsigned auto_increment not null primary key,
  title varchar(20) not null
);
```
