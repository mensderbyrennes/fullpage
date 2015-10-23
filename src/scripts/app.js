$(document).ready(function() {
    'use strict';
    $('#fullpage').fullpage({
        sectionsColor: ['#305065', '#305065', '#305065'],
        anchors: ['firstPage', 'secondPage', 'roster'],
        menu: '#menu',
        afterLoad: function(anchorLink, index) {
            if (index === 1) {
                $('#nav-up').hide();
            } else {
                $('#nav-up').show();
            }
            if (index === 3) {
                $('#nav-down').hide();
            } else {
                $('#nav-down').show();
            }
        }

    });
    
    $('#next-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });

    $('#previous-button').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
    });
});