var memoBoxIdx = 1;
var totalCosts = 0;
var totalTime = 0;
var memoKey;

initialize();

function initialize(){
    $(document).ready( function() {
        $(".memoBox_0").load("../inputform/memoBox.html", function(){
            $(".memoBox_0").find("#cost").on("keyup", function(){
                calculateTotalCost();
            });
            $(".memoBox_0").find("#time").on("keyup", function(){
                calculateTotalTime();
            });
        });
        $("#plusButton").click(function(){
            createMemoBox("memoContainer", "../inputform/memoBox.html")
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
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost();
        });
        $(".memoBox_"+memoBoxIdx).find("#time").on("keyup", function(){
            calculateTotalTime();
        });
        memoBoxIdx += 1;
    });
}

function deleteMemoBox(buttonId, parentDivId, memoBoxDivId){

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
    $("#totalCostAndTime").text(totalTime/60 + " 시간 " + totalTime%60 + " 분 " + totalCosts + " 원");
}

function calculateTotalTime(){
    var time = 0;
    for(var i = 0; i < memoBoxIdx; i++) {
        var hour = parseInt($(".memoBox_"+i).find("#time").val().split(":")[0]);
        var min = parseInt($(".memoBox_"+i).find("#time").val().split(":")[1]);
        time += hour * 60 + min;
    }
    totalTime = time;
    $("#totalCostAndTime").text(parseInt(totalTime/60) + " 시간 " + totalTime%60 + " 분 " + totalCosts + " 원");
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
    memoKey = $("#memoTitle").val();
    if(memoKey.length==0)
        memoKey = "default";
    var value = transforMemoIntoDataFormat();

    whale.storage.local.set({"default" : value}, function() {
        console.log(memoKey);
        console.log(value);
    });
}

function loadMemos(){
    whale.storage.local.get(memoKey.toString(), function(result) {
        var value = result.default;
        console.log(value);
        var numMemo = value.split("\n")[0];
        for(var i = 0; i < numMemo ; i++){
            var source = value.split("\n")[(i*5)+1];
            var dest = value.split("\n")[(i*5)+2];
            var transport = value.split("\n")[(i*5)+3];
            var cost = value.split("\n")[(i*5)+4];
            var hour = value.split("\n")[(i*5)+5].split(":")[0];
            var min = value.split("\n")[(i*5)+5].split(":")[1];
            console.log(source);
            console.log(dest);
            console.log(transport);
            console.log(cost);
            console.log(hour + ":" + min);
        }
    });
}
