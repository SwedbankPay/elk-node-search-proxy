import nock from 'nock';
import request from 'supertest';
import app from '../../app.js';
import $ from 'jquery';

function mockElasticsearch(hitme) {
  const hitsTestData = {
    hits: {
      total: {
        value: 2
      },
      hits: [{
        _source: {
          title: "I am hit number one",
          url: "/hits/1.html",
        },
        highlight: {
          text: ["Highlighted text for hit number one"]
        }
      },
      {
        _source: {
          title: "I am hit number two",
          url: "/hits/2.html",
        },
        highlight: {
          text: ["Highlighted text for hit number two"]
        }
      }]
    }
  };

  const noHitsTestData = { hits: { total: { value: 0 }, hits: [] } };
  const testData = hitme ? hitsTestData : noHitsTestData;

  nock('http://192.168.1.175:9200')
    .post('/test-psp-developer-*/_search')
    .reply(200, testData);
}

describe("Search", () => {
  test("index returns 200 OK", () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($(".search-header h1").text()).toEqual("Search the Developer Portal");
      expect($("#search-content .search-results p").text()).toEqual("Type in the query you wish to search for below.")
    });
  });

  test("search returns search result", () => {
    mockElasticsearch(true);

    return request(app).get("/?q=abc").then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($(".search-header h1").text()).toEqual("Results for \"abc\"");

      const searchResults = $("#search-content .search-results .search-result");
      const searchResultTexts = $(".search-result-text", searchResults);
      const searchResultTitles = $(".search-result-title", searchResults);
      const searchResultBreadcrumbs = $(".breadcrumbs", searchResults);

      expect(searchResults.length).toBe(2);
      expect(searchResultTexts.length).toBe(2);
      expect(searchResultTitles.length).toBe(2);
      expect(searchResultBreadcrumbs.length).toBe(2);

      expect(searchResults.first().attr('href')).toEqual('https://developer.swedbankpay.com/hits/1');
      expect(searchResultTitles.first().text()).toEqual("I am hit number one")
      expect(searchResultTexts.first().text()).toEqual("Highlighted text for hit number one")
      expect(searchResultBreadcrumbs.first().text()).toEqual("hits › 1")

      expect(searchResults.last().attr('href')).toEqual('https://developer.swedbankpay.com/hits/2');
      expect(searchResultTitles.last().text()).toEqual("I am hit number two")
      expect(searchResultTexts.last().text()).toEqual("Highlighted text for hit number two")
      expect(searchResultBreadcrumbs.last().text()).toEqual("hits › 2")
    });
  });

  test("search returns no results", () => {
    mockElasticsearch(false);

    return request(app).get("/?q=nope").then(response => {
      expect(response.statusCode).toBe(200);

      document.body.innerHTML = response.text;

      expect($(".search-header h1").text()).toEqual("Results for \"nope\"");
      expect($("#search-content .search-results p").text()).toEqual("No results were found for \"nope\". Please try another search term.")
      expect($("#search-content .search-results .search-result").length).toBe(0);
    });
  });
});
