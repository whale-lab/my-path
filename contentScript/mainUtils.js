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
                calculateTotalCost();
            });
            $(".memoBox_0").find("#time_hour").on("keyup", function(){
                calculateTotalHour();
            });
            $(".memoBox_0").find("#time_min").on("keyup", function(){
                calculateTotalMin();
            });
            $(".memoBox_0").find("#createMemo").on("click", function(){
                createMemoBox("memoContainer", "../inputform/memoBox.html");
            });
        });
        $("#clipBoard").click(function(){
            copyToClipBoard();
        });
        $("#clear").click(function(){
            clearAllMemos();
        });
        $("#save").click(function(){
            saveMemos();
        });
        $("#load").click(function(){
            loadMemos();
        });
    });
}
function createMemoBox(parentDivId, memoBoxHtmlPath) {
    var parentDiv = document.getElementById(parentDivId);
    var memoBoxDiv = document.createElement('div');
    memoBoxDiv.setAttribute("class", "memoBox_"+(memoBoxIdx));
    parentDiv.appendChild(memoBoxDiv);
    $(".memoBox_"+memoBoxIdx).load(memoBoxHtmlPath, function(){
        $(".memoBox_"+memoBoxIdx).find("#sourceButton").on("click", function(){
            var source = $(".memoBox_"+idx).find("#source").val();
            createTabMenu(source);
        });
        $(".memoBox_"+memoBoxIdx).find("#destButton").on("click", function(){
            var dest = $(".memoBox_"+idx).find("#dest").val();
            createTabMenu(dest);
        });
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost();
        });
        $(".memoBox_"+memoBoxIdx).find("#time_hour").on("keyup", function(){
            calculateTotalHour();
        });
        $(".memoBox_"+memoBoxIdx).find("#time_min").on("keyup", function(){
            calculateTotalMin();
        });
        $(".memoBox_"+memoBoxIdx).find("#createMemo").on("click", function(){
            createMemoBox("memoContainer", "../inputform/memoBox.html");
        });
        memoBoxIdx += 1;
    });
}

function deleteMemoBox(idx){
    $(".memoBox_"+idx).remove();
    enabledIdx[idx]=false;
    if(memoBoxIdx == idx + 1){
        memoBoxIdx -= 1;
    }
}

function createTabMenu(query){
    whale.tabs.create({
        url:"https://map.naver.com/v5/search/"+query+"?",
        selected:true  // We open the tab in the background
    })
}

function calculateTotalCost(){
    var cost = 0;
    for(var i = 0; i < memoBoxIdx; i++) {
        var value = parseInt($(".memoBox_"+i).find("#cost").val());
        if(!isNaN(value)){
            cost += value;
        }
    }
    totalCosts = cost;
    $("#totalCost").text(totalCosts + " 원");
}

function calculateTotalHour(){
    var time = 0;
    var totalTime = 0;
    for(var i = 0; i < memoBoxIdx; i++) {
        var hour = parseInt($(".memoBox_"+i).find("#time_hour").val());
        if(!isNaN(hour)){
            time += hour * 60;
        }
    }
    totalHour = time;
    totalTime = totalHour + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + totalTime%60 + " 분");
}

function calculateTotalMin(){
    var time = 0;
    var totalTime = 0;
    for(var i = 0; i < memoBoxIdx; i++) {
        var min = parseInt($(".memoBox_"+i).find("#time_min").val());
        if(!isNaN(min)){
            time += min;
        }
    }
    totalMin = time;
    totalTime = totalHour + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + totalTime%60 + " 분");
}

function transformMemoIntoString(){
    var str = "총 경유지 수 : " + parseInt(memoBoxIdx-1) + "\n" + "총 비용 : " + totalCosts +"\n" + "총 시간 : " + parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분 \n\n";
    for(var i = 0; i< memoBoxIdx; i++) {
        var source = $(".memoBox_"+i).find("#source").val();
        var dest = $(".memoBox_"+i).find("#dest").val();
        var transport = $(".memoBox_"+i).find("#transportation").val();
        var cost = $(".memoBox_"+i).find("#cost").val();
        var hour = $(".memoBox_"+i).find("#time").val().split(":")[0];
        var min = $(".memoBox_"+i).find("#time").val().split(":")[1];
        str += "출발지 : " + source + "\n" + "도착지 : " + dest + "\n" + "이동수단 : " + transport + "\n" + "비용 : " + cost + "\n" + "시간 : " + hour + " 시간 " + min + " 분 " + "\n\n";
    }
    return str;
}

function copyToClipBoard(){
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = transformMemoIntoString();
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    alert("Copy Success!");
}

function clearAllMemos(){
    for(var i = 1; i< memoBoxIdx; i++) {
        $(".memoBox_"+i).remove();
    }
    memoBoxIdx = 1;
    calculateTotalCost();
    calculateTotalTime();
}

function transforMemoIntoDataFormat(){
    var str = parseInt(memoBoxIdx)+"\n";
    for(var i = 0; i< memoBoxIdx; i++) {
        var source = $(".memoBox_"+i).find("#source").val();
        var dest = $(".memoBox_"+i).find("#dest").val();
        var transport = $(".memoBox_"+i).find("#transportation").val();
        var cost = $(".memoBox_"+i).find("#cost").val();
        var hour = $(".memoBox_"+i).find("#time").val().split(":")[0];
        var min = $(".memoBox_"+i).find("#time").val().split(":")[1];
        str += source + "\n" + dest + "\n" + transport + "\n" + cost + "\n" +  hour + ":" + min +"\n";
    }
    return str;
}

function saveMemos(){
    var memoObject = {};
    var memoKey = $("#memoTitle").val();
    if(memoKey.length==0)
        memoKey = "default";
    var value = transforMemoIntoDataFormat();
    memoObject[memoKey] = value;

    whale.storage.sync.set(memoObject, function() {
        alert(memoKey);
        alert(value);
    });
}

function loadMemos(){
    whale.storage.sync.get(memoTitle, function(result) {
        var value = result[memoTitle];
        alert(value);
        clearAllMemos();
        $(".memoBox_0").find("#source").text(value.split("\n")[1]);
        $(".memoBox_0").find("#dest").text(value.split("\n")[2]);
        $(".memoBox_0").find("#transportation").val(value.split("\n")[3]);
        $(".memoBox_0").find("#cost").text(value.split("\n")[4]);
        $(".memoBox_0").find("#time").text(value.split("\n")[5]);
        var numMemo = value.split("\n")[0];
        for(var i = 1; i < numMemo ; i++){
            createMemoBox();
            $(".memoBox_"+i).find("#source").text(value.split("\n")[(i*5)+1]);
            $(".memoBox_"+i).find("#dest").text(value.split("\n")[(i*5)+2]);
            $(".memoBox_"+i).find("#transportation select").val(value.split("\n")[(i*5)+3]);
            $(".memoBox_"+i).find("#cost").text(value.split("\n")[(i*5)+4]);
            $(".memoBox_"+i).find("#time").text(value.split("\n")[(i*5)+5]);
        }
        calculateTotalCost();
        calculateTotalHour();
        calculateTotalMin();
        memoBoxIdx = numMemo + 1;
    });
}
