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

  Product: {
    orders: async (parent) => {
      let Orders = null;

      try {
        Orders = new Array();

        let client = null;
        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD,
          },
        });

        let searchResult = null;
        searchResult = await client.search({
          index: "order",
          body: {
            query: {
              match: { product_id: parent.id },
            },
          },
        });

        let hits = null;
        hits = searchResult.body.hits.hits;
        //console.log(hits);

        for (let hit of hits) {
          Orders.push(hit._source);
        }
      } catch (e) {
        console.log("getOrders exception: " + e);
      }
      return Orders;
    },
  },
};
