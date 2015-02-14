$(document).ready(function() {

    var resource = '5a47a757-8670-4880-8fa0-446d054adf70';
    var source = 'http://opendata.ugr.es/dataset/6b39c91f-f6f3-4f09-a7ce-19329b4d9b40/resource/'+resource;

    var dataset = new recline.Model.Dataset({
      url: source,
      backend: 'ckan'
    });

    dataset.fetch().done(function(dataset) {
        data = dataset.records.toJSON()
        console.log(data[0]);
    });

});
