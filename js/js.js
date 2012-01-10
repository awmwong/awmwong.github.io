$(function() {    

    var aboutContent = $("#About");
    var contactContent = $("#Contact");
    
    aboutContent.hide();
    contactContent.hide();
    
    $("#link_about").click(showAbout);
    $("#link_contact").click(showContact);
    
    var headerHeight = $("header").height();
    
    function showAbout() {    
        
        // resizes contentBox
        var contentBox = $("#MainContent");
        var h = $("#About").height();
        
        // fade in text
        $("#Contact").fadeOut(200, function(){
            contentBox.animate({ height: h + headerHeight - 35 }, 350, function(){
                $("#About").fadeIn(200);
            });
        });
        
        return false;
        
    }
    
    function showContact(){
        
        var contentBox = $("#MainContent");
        var h = $("#Contact").height();
        
        // fade in text
        $("#About").fadeOut(200, function(){
            contentBox.animate({ height: h + headerHeight - 35 }, 350, function(){
                $("#Contact").fadeIn(200);
            });
        });
        
        return false;
    
    }    

    $(window).load(showAbout);
    
});