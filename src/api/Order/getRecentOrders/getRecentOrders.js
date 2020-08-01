import {Client} from "@elastic/elasticsearch"

export default {
  Query: {
    getRecentOrders: async (_, args) => {
      let client = null;
      let searchResult = null;
      let hits = null;

      var recentOrders = null;

      try{
        recentOrders = new Array();

        client = new Client({
          node: {url: new URL(process.env.ES_ENDPOINT) },
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
          }
        });

        searchResult = await client.search({
          index: "kibana_sample_data_ecommerce",
          body: {
            "sort": [
              { "order_id": {"order": "desc", "mode": "max"}}
            ],
            "query": {
              "match_all": {}
            }
          }
        })

        console.log(searchResult);

        hits = searchResult.body.hits.hits;
        console.log(hits);

        for(let hit of hits) {
          recentOrders.push(hit._source);
        }
      } catch (e) {
        console.log("getRecentOrders exception: " + e);
      }

      return recentOrders;
    }
  }
}