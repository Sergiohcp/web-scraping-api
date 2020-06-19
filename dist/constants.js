"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Here we have the name of the files
var files = ["index.js", ".gitignore", "LICENSE-MIT", "Makefile", "README.md", "finance.d.ts", "finance.js", "index.d.ts", "package-lock.json", "package.json"];

// Here we have a object with key:value being name:url
var filesURL = {
  "index.js": "/test/index.js",
  ".gitignore": "/.gitignore",
  ".travis.yml": "/.travis.yml",
  "LICENSE-MIT": "/LICENSE-MIT",
  Makefile: "/Makefile",
  "README.md": "/README.md",
  "finance.d.ts": "/finance.d.ts",
  "finance.js": "/finance.js",
  "index.d.ts": "/index.d.ts",
  "package-lock.json": "/package-lock.json",
  "package.json": "/package.json"
};

// Here we have two REGEX's to take number of lines and size of each file
var regexLines = /\d+\slines\s\(\d+\ssloc\)/;
var regexSize = /[\d\.]+\s(?:Bytes|KB)/;

exports.files = files;
exports.filesURL = filesURL;
exports.regexLines = regexLines;
exports.regexSize = regexSize;
//# sourceMappingURL=constants.js.map