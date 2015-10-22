$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#305065', '#305065', '#305065'],
        anchors: ['firstPage', 'secondPage'],
        menu: '#menu'
    });
    
    $('#first-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });
});