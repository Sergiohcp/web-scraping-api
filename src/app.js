import express from "express";
import api from "./api";
import { files, filesURL, regexLines, regexSize } from "./constants";

const app = express();

// This function is used to make a axios http request and get the data from file url
const getFilesInfo = async (file) => {
  const response = await api.get(filesURL[file]);
  return {
    file: file,
    path: filesURL[file],
    lines: response.data.match(regexLines)[0],
    size: response.data.match(regexSize)[0],
  };
};

// Here the response is filtered
const filterResults = (response = []) => {
  const responseFiltered = {
    js: [],
    ts: [],
    json: [],
    others: [],
  };

  response.forEach((elt) => {
    const splittedElt = elt.file.split(".");
    const extensionFound = Object.keys(responseFiltered).find(
      (extension) => splittedElt[splittedElt.length - 1] === extension
    );
    if (extensionFound) {
      responseFiltered[extensionFound] = [
        ...responseFiltered[extensionFound],
        elt,
      ];
      return;
    }
    responseFiltered["others"] = [...responseFiltered["others"], elt];
  });

  return responseFiltered;
};

// This is a default route
app.get("/", (req, res) => {
  res.send({
    message: "Call /financeJS to get results or /financeJS?file=index.js",
  });
});

// This is our route to get data from all files calling /financeJS route, but if you wnat get data from just one
// file, you can call /financeJS?file=index.js for example, passing the name of file to "file="
app.get("/financeJS", async function (req, res) {
  try {
    if (req.query && req.query.file) {
      const response = await getFilesInfo(req.query.file);
      res.send(response);
      return;
    }
    const response = await Promise.all(
      files.map(async (elt) => {
        return await getFilesInfo(elt);
      })
    );

    res.send(filterResults(response));
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

export default app;
