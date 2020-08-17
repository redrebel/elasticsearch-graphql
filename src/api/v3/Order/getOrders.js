import { Client } from "@elastic/elasticsearch";

export default {
  Query: {
    getOrders: async (_, args) => {
      let client = null;
      let searchResult = null;
      let hits = null;

      let Orders = null;

      try {
        Orders = new Array();

        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD,
          },
        });

        searchResult = await client.search({
          index: "order",
          body: {
            query: {
              match_all: {},
            },
          },
        });

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

  Order: {
    products: async (parent) => {
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
              match: { _id: parent.product_id },
            },
          },
        });

        hits = searchResult.body.hits.hits;
        //console.log(hits);

        for (let hit of hits) {
          Products.push(hit._source);
        }
      } catch (e) {
        console.log("getProducts exception: " + e);
      }
      return Products;
    },
    customers: async (parent) => {
      let client = null;
      let searchResult = null;
      let hits = null;

      let Customers = null;

      try {
        Customers = new Array();

        client = new Client({
          node: { url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD,
          },
        });

        searchResult = await client.search({
          index: "customer",
          body: {
            query: {
              match: { _id: parent.user_id },
            },
          },
        });

        hits = searchResult.body.hits.hits;
        //console.log(hits);

        for (let hit of hits) {
          Customers.push(hit._source);
        }
      } catch (e) {
        console.log("getProducts exception: " + e);
      }
      return Customers;
    },
  },
};
