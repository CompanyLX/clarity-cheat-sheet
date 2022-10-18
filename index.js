const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const buildDir = "./build";
const dataDir = "./data";

const dataInDir = fs
  .readdirSync(dataDir)
  .filter((file) => path.extname(file) === ".json");

const data = [];
dataInDir.forEach((file) => {
  const fileData = fs.readFileSync(path.join(dataDir, file));
  data.push(JSON.parse(fileData.toString()));
});

fs.rmdirSync(buildDir, { recursive: true, force: true });

fs.mkdirSync(buildDir);

const template = handlebars.compile(fs.readFileSync("./template.hbt", "utf8"));

fs.writeFileSync(`${buildDir}/index.html`, template(data));
