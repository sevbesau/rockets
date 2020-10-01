# games website

## TODO:

### spacewars game mechanics:
- twinkly stars
- powerups destroyed or picked by bullet
- asteroids?
- score system

#### powerups:
- rapidFire
- spreadFire

### Login an Register form
- validate

### pages:
- games overview -> create
- games -> styling
- leaderboards -> create

### page components
- footer

### bugs
- header dropdown alligned left

## games DB
- Database: rockets

### TABLE Users
| name     | type             | null     |
| -------- | ---------------- | -------- |
| email    | String           | not null | 
| password | String           | not null |
| username | String           | not null |
| imageUrl | String           |          |


### TABLE Scores
| name     | type             | null     |
| -------- | ---------------- | -------- |
| user_id  | ObjectId         | not null |
| game_id  | ObjectId         | not null |
| score    | Number           | not null |


### TABLE Games
| name     | type             | null     | 
| -------- | ---------------- | -------- |
| title    | String           | not null |
