# Article Management API

This Node.js application provides an API for managing articles. It allows users to perform CRUD (Create, Read, Update, Delete) operations on articles stored in a JSON file.

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the application using `node app.js`.

## Endpoints

### All Articles

#### `GET /articles`

- Returns a JSON array of all articles.

#### `POST /articles`

- Creates a new article.
- Requires a JSON object with `title` and `content` fields in the request body.
- Example request body:
  ```json
  {
    "title": "New Article",
    "content": "This is the content of the new article."
  }
- Response: "Successfully added a new article."

#### `DELETE /articles`

- Deletes all articles.
- Response: "Successfully deleted all the articles."

### Individual Articles

#### `GET /articles/:articleTitle`

- Returns the article with the specified title.
- If no article is found, returns "No article with that title found."

#### `PATCH /articles/:articleTitle`

- Updates the content of the article with the specified title.
- Requires a JSON object with `newContent` field in the request body.
- Response: "Successfully updated selected article."

#### `PUT /articles/:articleTitle`

- Updates the content of the article with the specified title.
- Requires a JSON object with `newContent` field in the request body.
- Response: "Successfully updated the content of the selected article."

#### `DELETE /articles/:articleTitle`

- Deletes the article with the specified title.
- Response: "Successfully deleted selected article."

## Dependencies

- Express.js
- body-parser
- fs (File System)
