const axios = require("axios");
const htmlToText = require("html-to-text");
const showdown = require("showdown");
const converter = new showdown.Converter();
require("dotenv").config();

module.exports = axios
  .get(`${process.env.HOST}/articles`)
  .then(function (response) {
    var articlesArray = [];
    response.data.forEach((data) => {
      var artObj = {
        id: data.id,
        title: data.title,
        content: converter.makeHtml(data.content),
        summary: htmlToText
          .fromString(converter.makeHtml(data.content))
          .substring(0, 100),
        img: data.image.url,
        slug: data.slug,
        categories: data.categories,
        imgName: data.image.name,
        description: data.meta_description,
        keywords: data.meta_keywords,
      };
      articlesArray.unshift(artObj);
    });

    return articlesArray;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
