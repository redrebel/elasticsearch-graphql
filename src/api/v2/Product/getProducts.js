import { Client } from "@elastic/elasticsearch";

export default {
  Query: {
    getProducts: async (_, args) => {
      let client = null;
      let searchResult = null;
      let hits = null;

      let Products = null;

      try {
        Products = new Array();

        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD,
          },
        });

        searchResult = await client.search({
          index: "product",
          body: {
            query: {
              match_all: {},
            },
          },
        });

        hits = searchResult.body.hits.hits;
        console.log(hits);

        for (let hit of hits) {
          Products.push(hit._source);
        }
      } catch (e) {
        console.log("getProducts exception: " + e);
      }
      return Products;
    },
  },
};
