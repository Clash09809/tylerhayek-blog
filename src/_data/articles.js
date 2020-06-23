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
          .substring(0, 200),
        img: data.image.url,
        slug: data.slug,
        imgName: data.image.name,
        description: data.meta_description_for_SEO,
        keywords: data.meta_keywords_for_SEO,
        author: data.author.name,
        authorFb: data.author.facebook_profile_link,
        authorInsta: data.author.instagram_profile_link,
        authorTwitter: data.author.twitter_profile_link,
        authorAvatar: data.author.avatar.url,
        created: data.created_at,
        updated: data.updated_at
      };
      articlesArray.unshift(artObj);
    });
    return articlesArray;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
