# Assignment 2 - Web API.

Name: Alka Nixon

## Features.

 + Feature 1 - 2 new API routes (parameterised URL) for reviews endpoint is added. The get reviews endpoint will fetch all the posted reviews of a particular user. The post endpoint will add the review of the user to the Account data. 

 + Feature 2 - Integration with MongoDB. MongoDB used to store and retrieve the reviews data.

 + Feature 3 - Nested Document in Mongo/Mongoose. Reviews data is an array of objects stored in the database along with the other user details.

  + Feature 4 - Custom validation using Joi. Reviews data contain author name, rating, review text and these are validated using joi.

   + Feature 5 - Good use of express middleware (e.g. Error handling). Error handling is done by using 'http-errors' module which helps to specify error status and error messages.


    + Feature 6 - API documentation (for example Swagger/openAPI) - Documentation for all accounts endpoints and reviews endpoints.
    + Feature 7 - Logging - using 'winston' module
    + Feature 8 - React Integration- At least one GET and POST. User can call get endpoint from myReviews page to see a listed view of their reviews. The post endpoint will be called when user clicks the submit button in the review form and the data is saved to database.
    + Feature 9 - Basic Authentication and protected routes. Favourites, reviews, fantasy movies page, movie details page, actor details page are all private ones and user can only access movies listing if they are not authenticated.


## Installation Requirements
First clone the repo

```cmd
git clone https://github.com/ANSN07/ewd-api-labs-2023.git
```

followed by installation

```bat
npm install
```
Codespace is used where the relevant files are inside the .devcontainer folder.

Then start the server by using following command:

```cmd
npm start
```

The api will run in port 8081 by default. 
 

## API Configuration

Env variables are listed below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
DATABASE_DIALECT=mongo
TMDB_KEY=YourTMDBKey
DATABASE_URL=YourMongoURL
JWT_SECRET_KEY=YourJWTSecret
LOG_LEVEL=info
```


## API Design

|  |  GET | POST 
| -- | -- | --
| /api/accounts/{userId}/reviews |Gets a list of movies |

API documentation done by using Swagger, the url for Swagger UI will be
"http://localhost:8080/api-docs/"


## Security and Authentication
All pages except movie listing pages (home page, top-rated, popular, upcoming, newly released) are protected. This will include movie details, favourites, movie reviews, movie review form, fantasy movie page and so on. Users cannot access these pages without logging in to their account. Any attempt to sign in will redirect to login page.



## Validation

Custom joi validation is used to validate review data submitted by the user in the UI. Author name is validated based on a custom pattern and minimum and maximum number of characters allowed. Review text should be atleast 10 characters long. The rating should be a number and should be between 1 to 5. Also, all these fields are set as required and should not be empty. 


## Integrating with React App

The user after submitting the reviews form will be redirected to favourites page. A click on submit button will call the add review endpoint (POST) and the details will be stored in the mongodb database. The get endpoint is called when user navigate to the "myReviews" page from the home page. If no reviews are added yet by the user, then a message saying "No reviews yet" will be shown to user. Otherwise a table listing of all the reviews posted by the user will be displayed in the page.


Link to react repo: https://github.com/ANSN07/React-Movie-App.git
Example of POST API call:

~~~Javascript
export const postUserReviews = (data) => {
  const id = window.localStorage.getItem("id");
  return fetch(`/api/accounts/${id}/reviews`, {
    method: "post",
    body: JSON.stringify({
      movieId: data.movieId,
      author: data.author,
      review: data.review,
      rating: data.rating,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json());
};

~~~


## Extra features

Logging using "winston" package. This package offers differnt levels of logging such as "info", "error", "warn" and so on. This is so convenient and simple to use.


