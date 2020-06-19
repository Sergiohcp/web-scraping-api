import app from "./app";
import serverless from "serverless-http";

const handler = serverless(app);

export { handler };

// Local running
// app.listen(3000, function () {
//   console.log("Example app listening on port 3000!");
// });
