<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A Contacts managing REST API built in <a href="http://nodejs.org" target="_blank">Node.js</a> using <a href="https://nestjs.com/" target="_blank">NestJS</a> framework.</p>
    <p align="center">

## Description

Built as the first project in NestJS, the Contacts API intends to make managing contacts easier

## Docs

Once running, you can find a swagger version of the docs at `/docs`.
<br>
And test it with:
<br>
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Contacts&uri=https%3A%2F%2Fgithub.com%2FCToH10%2Fcontacts%2Fblob%2Fdocs%2FInsomnia_2023-05-25.json)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

# ENDPOINTS

## /users

### POST - Create User

Expected body:

```json
{
  "fullName": "string",
  "email": "string@email.com",
  "phone": "string",
  "password": "$Tring000"
}
```

<br>

Email is unique.

<br>
There's no verification on the phone, as phone numbers vary by region and may be landline or mobile.

<br>
Password must be strong.

<br>
Expected result:

```json
{
  "id": "18bf5782-666c-4abf-b018-00b87e04c8bc",
  "fullName": "string",
  "email": "string@email.com",
  "phone": "string",
  "registered": "2023-05-22T22:22:37.273Z"
}
```

<br>

### GET - List all users

<br>
Must provide authentication - Bearer Token.
<br>
Intended to admin users in future, list all users.

<br>

Expected result:

```json
[
  {
    "id": "f655649f-52c9-4c0b-a086-24a2afe69981",
    "fullName": "stringa",
    "email": "stringa@email.com",
    "phone": "stringa",
    "registered": "2023-05-23T13:48:10.160Z"
  },
  {
    "id": "18bf5782-666c-4abf-b018-00b87e04c8bc",
    "fullName": "Yoichi Hiruma",
    "email": "string@email.com",
    "phone": "string",
    "registered": "2023-05-22T22:22:37.273Z"
  }
]
```

### GET /`${id}` - List a user

<br>
Must provide authentication - Bearer Token.
<br>
Returns user info and their contacts.
<br>
Expected result:

```json
{
  "id": "18bf5782-666c-4abf-b018-00b87e04c8bc",
  "fullName": "Yoichi Hiruma",
  "email": "string@email.com",
  "phone": "string",
  "registered": "2023-05-22T22:22:37.273Z",
  "contacts": [
    {
      "id": "b2fe4e80-1e96-4ffa-96d3-222ece927c6e",
      "fullName": "San Set",
      "email": "email@email.com",
      "phone": "phone",
      "registered": "2023-05-23T19:31:29.664Z",
      "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
    },
    {
      "id": "50bba3b3-21b1-4825-a6f2-c961ab9d14f7",
      "fullName": "Some Name",
      "email": "email@email.com",
      "phone": "+1 678 999 8212",
      "registered": "2023-05-23T19:35:00.884Z",
      "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
    }
  ]
}
```

### PATCH /`${id}` - Update user

<br>
Must provide authentication - Bearer Token.
<br>
User can only change information about themselves.
<br>
Can change all info provided in creation.
<br>
Expected result (contacts list kept clean for space purposes):

```json
{
  "id": "18bf5782-666c-4abf-b018-00b87e04c8bc",
  "fullName": "Another Name",
  "email": "string@email.com",
  "phone": "string",
  "registered": "2023-05-22T22:22:37.273Z",
  "contacts": []
}
```

### DELETE - /`${id}` - Delete user

<br>
Must provide authentication - Bearer Token.
<br>
User can only delete themselves.
<br>
No body is returned.
<br>
<br>

## /login

### POST - Login

Expected body:

```json
{
  "email": "string@email.com",
  "password": "$Tring000"
}
```

<br>
Expected result:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BlbWFpbC5jb20iLCJzdWIiOiIxOGJmNTc4Mi02NjZjLTRhYmYtYjAxOC0wMGI4N2UwNGM4YmMiLCJpYXQiOjE2ODQ4NjYyMDIsImV4cCI6MTY4NDkwOTQwMn0.u_1JUuIAoF5batiFja5jm-tbexTYId00ikktir5dwzM"
}
```

<br>

## /contacts

#### All routes require access token

<br>

### POST - Create new contact

<br>
Phone follows the absence restriction in user, but email is no longer unique.

<br>
Expected body:

```json
{
  "fullName": "Some Name",
  "email": "email@email.com",
  "phone": "phone"
}
```

<br>

Expected result:

```json
{
  "id": "50bba3b3-21b1-4825-a6f2-c961ab9d14f7",
  "fullName": "Some Name",
  "email": "email@email.com",
  "phone": "phone",
  "registered": "2023-05-23T19:35:00.884Z",
  "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
}
```

<br>

### GET - List all contacts

<br>
List all contacts registered to logged user.
<br>
Can provide query params <mark>name</mark> and <mark>email</mark> to find corresponding contacts.
<br>
Expected result:

```json
[
  {
    "id": "b2fe4e80-1e96-4ffa-96d3-222ece927c6e",
    "fullName": "San Set",
    "email": "email@email.com",
    "phone": "phone",
    "registered": "2023-05-23T19:31:29.664Z",
    "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
  },
  {
    "id": "50bba3b3-21b1-4825-a6f2-c961ab9d14f7",
    "fullName": "Some Name",
    "email": "email@email.com",
    "phone": "phone",
    "registered": "2023-05-23T19:35:00.884Z",
    "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
  }
]
```

<br>

### GET /`${id}` - List a contact

<br>
Information about especific contact.
<br>
Expected result:

```json
{
  "id": "50bba3b3-21b1-4825-a6f2-c961ab9d14f7",
  "fullName": "Some Name",
  "email": "email@email.com",
  "phone": "phone",
  "registered": "2023-05-23T19:35:00.884Z",
  "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
}
```

<br>

### PATCH - /`${id}` - Update contact info

<br>
Can change any of the information provided in creation.
<br>
Expected result:

```json
{
  "id": "50bba3b3-21b1-4825-a6f2-c961ab9d14f7",
  "fullName": "Some Name",
  "email": "email@email.com",
  "phone": "+1 678 999 8212",
  "registered": "2023-05-23T19:35:00.884Z",
  "userId": "18bf5782-666c-4abf-b018-00b87e04c8bc"
}
```

### DELETE - /`${id}` - Delete contact

<br>
No body is returned.
<br>
