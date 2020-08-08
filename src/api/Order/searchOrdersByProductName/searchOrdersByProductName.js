import {Client} from "@elastic/elasticsearch"

export default {
  Query: {
    searchOrdersByProductName: async (_, args) => {
      let client = null;
      let { searchKeyword, pageSize, pageIndex } = args;
      let searchResult = null
      let searchOrderResult = {}
      
      try {
        client = new Client({
          node: {url: new URL(process.env.ES_ENDPOINT)},
          auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
          }
        })

        searchResult = await client.search({
          index: "kibana_sample_data_ecommerce",
          body: {
            "from": (pageIndex * pageSize),
            "size": pageSize,
            "aggs": {
              "day_of_week_orders": {
                "terms": {
                  "field": "day_of_week",
                  "size": 7,
                  "order": {
                    "_count": "desc"
                  }
                }
              }
            },
            "query": {
              "match": {
                "products.product_name": searchKeyword
              }
            },
            "sort": [
              {"order_id": {"order": "desc", "mode": "max"}}
            ]
          } 
        })

        searchOrderResult.total = searchResult.body.hits.total.value;
        searchOrderResult.day_of_week_orders = searchResult.body.aggregations.day_of_week_orders;
        searchOrderResult.orders = new Array();

        for(let hit of searchResult.body.hits.hits){
          searchOrderResult.orders.push(hit._source)
        }
      } catch (e) {
        console.log("searchOrders exception: " + e)
      }

      return searchOrderResult
    }
  }
}