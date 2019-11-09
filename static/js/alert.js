$( "#success-btn" ).click(function() {
    $( ".popup-alert-copy" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
});

$( "#clear" ).click(function() {
    $( ".reset" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
});


// 원형 메뉴 -> 클립보드 복사 버튼

$( "#clipBoard" ).click(function() {
    $('#overlay, #overlay-back').fadeIn(100);
    $('.clipboard-info-popup').fadeIn(100);
    $(".info-textarea").val("hello");
});


// 원형 메뉴 -> 클립보드 복사 창 -> 취소 버튼 누를 때 이벤트
$( ".copy-cancel" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
});

// 원형 메뉴 -> 클립보드 복사 창 -> 확인 버튼 누를 때 이벤트
$( ".copy-ok" ).click(function() {
    $( ".copy-success" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
});

