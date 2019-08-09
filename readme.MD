# API NO IDEA

## Description

I wrote this API for a Vues-js front-end app, it's juste a simple example of a project possible with VueJS and Koa-JS. The app will can create projects with tasks. And each task can have a category. It's something like Jira or Trello (but better of course !).

For the API, I use Koajs, Joi-validator, Jest For the tests and Mongoose for the DB.

### ***@TODO***

* Make Validators
* Finish all Jest test
* Work on routes names
* Check the rest normes for API
* Check the controller syntax
* Create tasks
* Put category in projects
* Update the doc

## Specification of API

### Route for the projects

### GET /v1/

Return the version of the API, the date now and if everything is setup and ok

__Request:__

__Headers:__


__Response:__

__Status Code:__ 200 (OK)

__Body:__

*200 OK*

```
{
    "ok": true,
    "version": "0.0.1",
    "now": "2019-06-01T13:54:04.941Z"
}
```

### GET /v1/project

Return all the projects

__Request:__

__Headers:__

__Response:__

__Status Code:__ 200 (OK)

__Body:__

*200 OK*

```
[
    {
        "name": "test",
        "version": "v1.0.0",
        "tasks": [],
        "date": "2019-06-01T16:03:21+02:00"
    },
    {
        "name": "test2",
        "version": "v1.5.0",
        "tasks": [],
        "date": "2019-06-01T16:03:21+02:00"
    }
]
```

### POST /v1/project/create-project

Create a new project

__Request:__

```
[
    {
        "name": "test",
        "version": "v1.0.0",
        "tasks": [],
        "date": "2019-06-01T16:03:21+02:00"
    },
]
```

__Headers:__

__Response:__

__Status Code:__ 200 (OK)

__Body:__

*200 OK*

### PUT /v1/project/

Update a project

__Request:__

```
[
    {
        "name": "test",
        "version": "v1.0.0",
        "tasks": [],
        "date": "2019-06-01T16:03:21+02:00",
        "_id": "eefsd48a98454"
    },
]
```

__Headers:__

* Accept : application/json
* Content-Type : application/json

__Response:__

__Status Code:__ 200 (OK)

__Body:__

*200 OK*

### DELETE /v1/project/:id

Update a project

__Request:__

__Headers:__

* Accept : application/json
* Content-Type : application/json

__Response:__

__Status Code:__ 200 (OK)

__Body:__

*200 OK*

### GET /v1/project/:id

Get a project by id

__Request:__

__Headers:__

* Accept : application/json
* Content-Type : application/json

__Response:__

__Status Code:__ 200 (OK)

__Body:__

```
[
    {
        "name": "test",
        "version": "v1.0.0",
        "tasks": [],
        "date": "2019-06-01T16:03:21+02:00",
        "_id": "eefsd48a98454"
    },
]
```

*200 OK*

