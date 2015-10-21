$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage']
    });
    
    $('#first-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });
});