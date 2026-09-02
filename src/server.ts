import app from "./app";

const PORT = process.env.PORT || 3000;

//Separating the express configuration in "app.ts" from this server file is so that we can write tests for the express app without having to start the server every time.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});