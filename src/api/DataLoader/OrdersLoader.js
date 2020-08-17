import { Client } from "@elastic/elasticsearch";
const DataLoader = require("dataloader");
const batchLoadFn = async (orderIds) => {
  //const orders = await Comment.find({ where: { postId: In(postIds) } });
  //return postIds.map((id) => comments.filter((c) => c.postId === id));

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
    //console.log(orderIds);
    searchResult = await client.search({
      index: "order",
      body: {
        query: {
          //match: { user_id: parent.id },
          terms: { user_id: orderIds },
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
  //return Orders;

  return orderIds.map((id) => Orders.filter((c) => c.user_id === id));
};

export const ordersLoader = new DataLoader(batchLoadFn);
