# final-project-engineering-1

## API Reference

#### Register Account

```http
  POST /api/v1/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `password` | `string` | **Required** |
| `email` | `string` | **Required** |

#### Login

```http
  POST /api/v1/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**|
| `password`      | `string` | **Required**|

#### Fetch All Categories

```http
  POST /api/v1/category
```



