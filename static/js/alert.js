$( "#success-btn" ).click(function() {
    $( ".popup-alert-copy" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
});

/*
$( "#clear" ).click(function() {
    $( ".reset" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
});
*/

// 원형 메뉴 -> 클립보드 복사 버튼
$( "#clipBoard" ).click(function() {
    $('#overlay, #overlay-back').fadeIn(100);
    $('.clipboard-info-popup').fadeIn(100);
    $(".info-textarea").val(transformMemoIntoString($("#memoContainer")[0]));
    $('#overlay-back').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    $('html').css("overflow","hidden"); 
});


// 원형 메뉴 -> 클립보드 복사 창 -> 취소, 회색 바탕 버튼 누를 때 이벤트
$( ".copy-cancel" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.clipboard-info-popup').fadeOut(200);
    $('html').css("overflow","visible"); // 스크롤 보이기
});

$( "#overlay-back" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);      
    $('.clipboard-info-popup').fadeOut(200);
    $('html').css("overflow","visible"); // 스크롤 보이기
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


// 원형 메뉴 -> 메모 저장 창 POPUP 
$( "#save" ).click(function() {
    $('#overlay, #overlay-back').fadeIn(100);
    $('.folder-save-info-popup').fadeIn(100);
});

// 원형 메뉴 -> 메모 저장 창 -> 취소, 회색 바탕 버튼 누를 때 이벤트
$( ".folder-save-cancel" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.folder-save-info-popup').fadeOut(200);
});

$( "#overlay-back" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.folder-save-info-popup').fadeOut(200);
});

// 원형 메뉴 -> 메모 저장 창 -> 저장 버튼 누를 때 
$( ".folder-save-ok" ).click(function() {
    $('#overlay, #overlay-back').fadeOut(200);
    $('.folder-save-info-popup').fadeOut(200);
    $( ".save" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
    var folderName = $("#select-save-folder").val();
    saveMemos($("#memoContainer")[0], folderName);
});



/* SELECT-REMOVE 신규 기능 */
function makeSelectFolderListTag(){
    var parentFolderNode = $("#all_folder_list")[0];
    var folderName = "";
    var folderSelectTag = "<select id=\"remove-select\">";
    for(var idx = 0; idx < parentFolderNode.children.length-3; idx++){
        folderName = parentFolderNode.children[idx].children[0].innerText.trim();
        folderSelectTag += "<option value=\"" + folderName + "\">";
        folderSelectTag += folderName;
        folderSelectTag += "</option>"
    }
    folderSelectTag += "</select>";
    $("#folder-select-div").append(folderSelectTag); 
}


// 폴더 삭제 창 -> SELECT 박스 생성 
$( "#removeFolder-v2" ).click(function() {
    makeSelectFolderListTag();
    //$("#folder-select-div").append(folderSelectTag); 
});


// 팝업창 [폴더 삭제]  -> 폴더 삭제 Action
$( ".folder-remove-ok" ).click(function() {
    var folderName = $("#remove-select option:selected").val()
    var parentNode = $("#all_folder_list")[0];
    for(var idx = 1; idx < parentNode.children.length-4; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        if(title.trim().toString() == folderName.trim().toString()){
            parentNode.removeChild(parentNode.children[idx]);
            updateFolderStructure();
            $( ".remove-directory" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
            break;
        }
    }
    
    $("#remove-select").remove();
    makeSelectFolderListTag();
});


// 아코디언 -> [폴더 삭제] 버튼 클릭했을 때
$( "#removeFolder-v2" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeIn(100);
    $('.folder-remove-info-popup').fadeIn(200);
});

// 팝업창 -> [취소] 버튼 클릭했을 때
$( ".folder-remove-cancel" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeOut(100);
    $('.folder-remove-info-popup').fadeOut(200);
    $("#remove-select").remove();
});

// 팝업창 -> 검은 색깔을 클릭했을 때 
$( "#overlay-over-sidebar" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeOut(100);
    $('.folder-remove-info-popup').fadeOut(200);
    $("#remove-select").remove();
});
/* END SELECT-REMOVE 신규 기능 */