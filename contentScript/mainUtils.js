var memoBoxIdx = 1;
var totalCosts = 0;
var totalHour = 0;
var totalMin = 0;

initialize();

function initialize(){
    $(document).ready( function() {
        $(".memoBox_0").load("../inputform/memoBox.html", function(){
            $(".memoBox_0").find("#sourceButton").on("click", function(){
                var source = $(".memoBox_0").find("#source").val();
                createTabMenu(source);
            });
            $(".memoBox_0").find("#destButton").on("click", function(){
                var dest = $(".memoBox_0").find("#dest").val();
                createTabMenu(dest);
            });
            $(".memoBox_0").find("#cost").on("keyup", function(){
                calculateTotalCost($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#time_hour").on("keyup", function(){
                calculateTotalHour($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#time_min").on("keyup", function(){
                calculateTotalMin($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#createMemo").on("click", function(){
                createMemoBox($(".memoBox_0")[0]);
            });
            $(".memoBox_0").find("#deleteMemo").on("click", function(){ // 처음 메모 삭제 선택
                //alert("First Element couldn't be deleted");
                $( ".delete-error" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
            });
        });
        $("#clipBoard").click(function(){
            copyToClipBoard($("#memoContainer")[0]);
        });
        $("#clear").click(function(){
            clearAllMemos($("#memoContainer")[0]);
        });
        $("#save").click(function(){
            saveMemos($("#memoContainer")[0]);
        });




    });
}
function createMemoBox(currElement) {
    var memoBoxDiv = document.createElement('div');
    memoBoxDiv.setAttribute("class", "memoBox_"+(memoBoxIdx));
    currElement.parentNode.insertBefore(memoBoxDiv, currElement.nextSibling);
    $(".memoBox_"+memoBoxIdx).load("../inputform/memoBox.html", function(){
        $(".memoBox_"+memoBoxIdx).find("#sourceButton").on("click", function(){
            var source = $(".memoBox_"+memoBoxIdx).find("#source").val();
            createTabMenu(source);
        });
        $(".memoBox_"+memoBoxIdx).find("#destButton").on("click", function(){
            var dest = $(".memoBox_"+memoBoxIdx).find("#dest").val();
            createTabMenu(dest);
        });
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_hour").on("keyup", function(){
            calculateTotalHour(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_min").on("keyup", function(){
            calculateTotalMin(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#createMemo").on("click", function(){
            createMemoBox(memoBoxDiv);
        });
        $(".memoBox_"+memoBoxIdx).find("#deleteMemo").on("click", function(){
            deleteMemoBox(memoBoxDiv);
        });
        memoBoxIdx += 1;
    });
}

function createMemoBoxWithData(currElement, data) {
    var memoBoxDiv = document.createElement('div');
    console.log("memoBoxIdx : " + memoBoxIdx);
    memoBoxDiv.setAttribute("class", "memoBox_"+(memoBoxIdx));
    currElement.parentNode.insertBefore(memoBoxDiv, currElement.nextSibling);
    $(".memoBox_"+memoBoxIdx).load("../inputform/memoBox.html", function(){
        $(".memoBox_"+memoBoxIdx).find("#sourceButton").on("click", function(){
            var source = $(".memoBox_"+memoBoxIdx).find("#source").val();
            createTabMenu(source);
        });
        $(".memoBox_"+memoBoxIdx).find("#destButton").on("click", function(){
            var dest = $(".memoBox_"+memoBoxIdx).find("#dest").val();
            createTabMenu(dest);
        });
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_hour").on("keyup", function(){
            calculateTotalHour(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_min").on("keyup", function(){
            calculateTotalMin(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#createMemo").on("click", function(){
            createMemoBox(memoBoxDiv);
            alert("Create Memo Click!");
        });
        $(".memoBox_"+memoBoxIdx).find("#deleteMemo").on("click", function(){
            deleteMemoBox(memoBoxDiv);
            alert("Delete Memo Click!");
        });
        $(".memoBox_"+memoBoxIdx).find("#source").val(data[0]);
        $(".memoBox_"+memoBoxIdx).find("#dest").val(data[1]);
        $(".memoBox_"+memoBoxIdx).find("#transportation select").val(data[2]);
        $(".memoBox_"+memoBoxIdx).find("#cost").val(data[3]);
        $(".memoBox_"+memoBoxIdx).find("#time_hour").val(data[4]);
        $(".memoBox_"+memoBoxIdx).find("#time_min").val(data[5]);
        memoBoxIdx += 1;
    });
}

function deleteMemoBox(currElement){
    currElement.parentNode.removeChild(currElement);
    calculateTotalCost($("#memoContainer")[0]);
    calculateTotalHour($("#memoContainer")[0]);
    calculateTotalMin($("#memoContainer")[0]);
}

function createTabMenu(query){
    whale.tabs.create({
        url:"https://map.naver.com/v5/search/"+query+"?",
        selected:true  // We open the tab in the background
    })
}

function calculateTotalCost(parentNode){
    var cost = 0;
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var value = parseInt($("."+className).find("#cost").val());
        if(!isNaN(value)){
            cost += value;
        }
    }

    totalCosts = cost;
    $("#totalCost").text(totalCosts + " 원");
}

function calculateTotalHour(parentNode){
    var time = 0;
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var hour = parseInt($("."+className).find("#time_hour").val());
        if(!isNaN(hour)){
            time += hour;
        }
    }

    totalHour = time;
    totalTime = totalHour * 60 + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분");
}

function calculateTotalMin(parentNode){
    var time = 0;

    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var min = parseInt($("."+className).find("#time_min").val());
        if(!isNaN(min)){
            time += min;
        }
    }

    totalMin = time;
    totalTime = totalHour * 60 + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분");
}

function copyToClipBoard(parentNode){
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = transformMemoIntoString(parentNode);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    //$( ".copy-success" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
}

function transformMemoIntoString(parentNode){
    var totalTime = totalHour * 60 + totalMin;
    var str = "총 경유지 수 : " + parseInt(parentNode.children.length) + "\n" + "총 비용 : " + totalCosts +"\n" + "총 시간 : " + parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분 \n\n";

    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var source = $("."+className).find("#source").val();
        var dest = $("."+className).find("#dest").val();
        var transport = $("."+className).find("#transportation").val();
        var cost = $("."+className).find("#cost").val();
        var hour = $("."+className).find("#time_hour").val();
        var min = $("."+className).find("#time_min").val();

        str += "출발지 : " + source + "\n" + "도착지 : " + dest + "\n" + "이동수단 : " + transport + "\n" + "비용 : " + cost + "\n" + "시간 : " + hour + " 시간 " + min + " 분 " + "\n\n";
    }

    return str;
}

function clearAllMemos(parentNode){

    $(".memoBox_0").find("#source").val("");
    $(".memoBox_0").find("#dest").val("");
    $(".memoBox_0").find("#transportation").val("---");
    $(".memoBox_0").find("#cost").val("");
    $(".memoBox_0").find("#time_hour").val("");
    $(".memoBox_0").find("#time_min").val("");

    for(var i = 1; i < parentNode.children.length; i++){
        deleteMemoBox(parentNode.children[i]);
    }
    memoBoxIdx = 1;
    calculateTotalCost($("#memoContainer")[0]);
    calculateTotalHour($("#memoContainer")[0]);
    calculateTotalMin($("#memoContainer")[0]);
}

function transformMemoIntoSaveData(parentNode){
    var str = $("#memoTitle").val()+"\n";
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var source = $("."+className).find("#source").val();
        var dest = $("."+className).find("#dest").val();
        var transport = $("."+className).find("#transportation").val();
        var cost = $("."+className).find("#cost").val();
        var hour = $("."+className).find("#time_hour").val();
        var min = $("."+className).find("#time_min").val();
        str += source + " " + dest +" " + transport + " " + cost + " " + hour + " " + min + "\n";
    }
    alert("Data\n" + str);
    return str;
}

function saveMemos(parentNode){
    var memoObject = {};
    var memoKey = $("#memoTitle").val();
    if(memoKey.length==0)
        memoKey = "기본 일정";
    var value = transformMemoIntoSaveData(parentNode);
    memoObject[memoKey] = value;

    whale.storage.sync.set(memoObject, function() {
        var parentNode = $("#default_folder").find(".submenuItems")[0];
        var menuElement = document.createElement('li');
        menuElement.innerHTML = "<a href=\"#\"> <img src=\"/images/folder_sub.png\" width=\"12px\" hegith=\"12px\">  "+ memoKey +"</a></li>";
        menuElement.onclick = function(){
            loadMemos(memoKey);
        };
        parentNode.insertBefore(menuElement, parentNode.lastChild.nextSibling);
    });
}

function loadMemos(memoKey){
    whale.storage.sync.get(memoKey, function(result) {
        var value = result[memoKey];
        clearAllMemos($("#memoContainer")[0]);

        var title = value.split("\n")[0];
        $("#memoTitle").val(title);

        var firstMemoBox = value.split("\n")[1];

        $(".memoBox_0").find("#source").val(firstMemoBox.split(" ")[0]);
        $(".memoBox_0").find("#dest").val(firstMemoBox.split(" ")[1]);
        $(".memoBox_0").find("#transportation select").val(firstMemoBox.split(" ")[2]);
        $(".memoBox_0").find("#cost").val(firstMemoBox.split(" ")[3]);
        $(".memoBox_0").find("#time_hour").val(firstMemoBox.split(" ")[4]);
        $(".memoBox_0").find("#time_min").val(firstMemoBox.split(" ")[5]);

        var numMemo = value.split("\n").length;
        for(var i = 3; i < numMemo ; i++){
            var memoBox = value.split("\n")[i-1];
            var parentNode = $("#memoContainer")[0];
            createMemoBoxWithData(parentNode.children[i-3], memoBox.split(" "));
        }
        calculateTotalCost($("#memoContainer")[0]);
        calculateTotalHour($("#memoContainer")[0]);
        calculateTotalMin($("#memoContainer")[0]);
    });
}
