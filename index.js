const server = require("./api/server");

//PORT 5000
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}....`);
});
