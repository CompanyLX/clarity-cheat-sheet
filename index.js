const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const buildDir = "./build";
const jsDir = "./js";
const cssDir = "./css";
const iconDir = "./favicon";
const contentDir = "./content";

const copy = (source, extentions, destination) => {
  const files = fs
    .readdirSync(source)
    .filter((file) =>
      [...extentions].includes(path.extname(file).substring(1))
    );
  files.forEach((file) => {
    fs.copyFileSync(path.join(source, file), path.join(destination, file));
  });
};

const content = [];
const jsonFiles = fs
  .readdirSync(contentDir)
  .filter((file) => path.extname(file) === ".json");
jsonFiles.forEach((file) => {
  const fileContent = fs.readFileSync(path.join(contentDir, file));
  content.push(JSON.parse(fileContent.toString()));
});

fs.rmdirSync(buildDir, { recursive: true, force: true });

fs.mkdirSync(buildDir);

const template = handlebars.compile(fs.readFileSync("./template.hbt", "utf8"));

fs.writeFileSync(`${buildDir}/index.html`, template(content));

copy(jsDir, ["js"], buildDir);

copy(cssDir, ["css"], buildDir);

copy(iconDir, ["png", "xml", "ico", "json"], buildDir);
