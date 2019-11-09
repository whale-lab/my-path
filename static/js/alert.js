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
    $(".info-textarea").val(transformMemoIntoString($("#memoContainer")[0]));
});


// 원형 메뉴 -> 클립보드 복사 창 -> 취소, 회색 바탕 버튼 누를 때 이벤트
$( ".copy-cancel" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
});

$( "#overlay-back" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
});

// 원형 메뉴 -> 클립보드 복사 창 -> 확인 버튼 누를 때 이벤트
$( ".copy-ok" ).click(function() {
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = $(".info-textarea").val();
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    $( ".copy-success" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
});

