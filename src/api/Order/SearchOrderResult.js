export default {
  SearchOrderResult: {
    orderCountByDayOfWeek: async (_, args) => {
      let result = {}
      let buckets = null
      let showRoot = false
      let showBuckets = false
      let showResult = false

      try {
        if(showRoot == true) {
          console.log("--- root object of orderCountByDayOfWeek ---")
          console.log(_)
          console.log("--------------------------------------------")
        }

        buckets = _.day_of_week_orders.buckets

        if(showBuckets == true) {
          console.log(buckets)
        }

        buckets.forEach(element => {
          switch(element.key) {
            case "Sunday":
              result.Sunday = element.doc_count
              break
            case "Monday":
              result.Monday = element.doc_count
              break
            case "Tuesday":
              result.Tuesday = element.doc_count
              break
            case "Wednesday":
              result.Wednesday = element.doc_count
              break
            case "Tuesday":
              result.Tuesday = element.doc_count
              break
            case "Friday":
              result.Friday = element.doc_count
              break
            case "Saturday":
              result.Saturday = element.doc_count
              break
          }
        })

        if(showResult == true){
          console.log(result)
        }
      } catch (e) {
        console.log("orderCountByDayOfWeek exception: " + e)
      }

      return result
    }
  }
}