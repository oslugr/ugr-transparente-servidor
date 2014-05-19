$(document).ready(function() {   
 
    //select all the a tag with name equal to modal 
    $('a[class=view]').click(function(e) { 
        //Cancel the link behavior 
        e.preventDefault(); 
        //Get the A tag

        $.ajax({
            type: "GET",
            url: $(this).attr("name"),
            dataType: "text",
            success: function (data) {
                drawTable($.csv.toArrays(data));
            }
        });

        var id = $(this).attr('href'); 
     
        //Get the screen height and width 
        var maskHeight = $(document).height(); 
        var maskWidth = $(window).width(); 
     
        //Set height and width to mask to fill up the whole screen 
        $('#mask').css({'width':maskWidth,'height':maskHeight}); 
         
        //transition effect       
        $('#mask').fadeIn(10);     
        $('#mask').fadeTo("slow",0.8);   
     
        //Get the window height and width 
        var winH = $(window).height(); 
        var winW = $(window).width(); 
               
        //Set the popup window to center 
        $(id).css('top',  winH/2-$(id).height()/2); 
        $(id).css('left', winW/2-$(id).width()/2); 
     
        //transition effect 
        $(id).fadeIn(2000);

        $.ajax({
            type: "GET",
            url: $(this).attr("rel"),
            dataType: "text",
            success: function (data) {
                drawTable($.csv.toArrays(data));
            }
        });   
     
    }); 
     
    //if close button is clicked 
    $('.window .close').click(function (e) { 
        //Cancel the link behavior 
        e.preventDefault(); 
        $('#mask, .window').hide(); 
    });       
     
    //if mask is clicked 
    $('#mask').click(function () { 
        $(this).hide(); 
        $('.window').hide(); 
    });           
     
}); 


google.load('visualization', '1', {packages:['table']});


function drawTable(csv) {
    var data = new google.visualization.DataTable();
    for (var i = 0; i < csv[0].length; i++) {
         data.addColumn('string', csv[0][i]);
    }

    for (var j=1; j<csv.length;j++) {
        data.addRow(csv[j]);
    }
    var table = new google.visualization.Table(document.getElementById('dialog'));
    table.draw(data, {showRowNumber: true});
}