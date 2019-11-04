// 제이쿼리로 수정

function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0px";
}

$('#open-button').on('click', function () { 
    $('#overlay, #overlay-back').fadeIn(100); 
    $( '#sidebar' ).width( '250px' );
});

$('#close-button').on('click', function () { 
    $('#overlay, #overlay-back').hide();
    $('#sidebar').width( '0px' );
});

$('#overlay-back').on('click', function () { 
    $('#overlay, #overlay-back').hide();
    $('#sidebar').width( '0px' );
});


$(function() {
var Accordion = function(el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;
    
    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click',
                    { el: this.el, multiple: this.multiple },
                    this.dropdown);
};

Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        //this is the ul.submenuItems
        $next = $this.next();
    
    $next.slideToggle();
    $this.parent().toggleClass('open');
    
    if(!e.data.multiple) {
    //show only one menu at the same time
    $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
}

    var accordion = new Accordion($('.accordion-menu'), false);
})
