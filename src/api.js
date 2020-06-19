import axios from "axios";

// Watching debugger in Safari i noticed that the files have the following base URL:
// https://github.com/ebradyjobory/finance.js/blob/master/
const api = axios.create({
  baseURL: "https://github.com/ebradyjobory/finance.js/blob/master",
  timeout: 15000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
