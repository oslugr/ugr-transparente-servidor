function datos(){
  var data = {
    resource_id: '5a47a757-8670-4880-8fa0-446d054adf70'
  };

  var result = JSON.parse($.ajax({
    type: 'GET',
    url: 'http://opendata.ugr.es/api/action/datastore_search',
    data: data,
    dataType: 'json',
    global: false,
    async:false,
    success: function(data) {
      return data;
    }
  }).responseText).result.records;

  console.log(result);
}
