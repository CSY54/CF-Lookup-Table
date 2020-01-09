url = "https://codeforces.com/api/user.info?handles=";
handles = Array.of("joylintp", "YoJaHuang", "emanlaicepsa", "WiwiHo",
"ub33", "YJU", "LiPro", "HNO2", "ToMmyDong", "detaomega", "nella17",
"2qbingxuan", "Seanliu", "casperwang", "wanling1212", "tim25871014",
"SorahISA", "arctan", "PolarisChiba", "daniel071292", "erd1",
"doublewang", "YenSean", "Kevin_Zhang-TW", "balbit", "coldEr66",
"hg8398", "Nkl5RDZZZVq1N2F0", "Yayun146");



function getData() {
    var req = new XMLHttpRequest();
    for (let i = 0; i < handles.length; ++i) {
        url = url + handles[i] + ";";
    }
    req.open("GET", url);
    req.onload =function() {
        var res = JSON.parse(this.responseText);
        ModifyTable(res);
    }
    req.send();
}

function ModifyTable(table) {
    var str, shandle, srating, color;
    var handle, rating;
    var tmp;

    for (let i = 0; i < table.result.length; ++i) {
        handle = table.result[i].handle; rating = table.result[i].rating;
        str = `<div class="divTableRow" onclick="window.open('https://codeforces.com/profile/${table.result[i].handle}');">`;

        if (rating < 1200) color = "gray";
        else if(rating < 1400) color = "green";
        else if(rating < 1600) color = "cyan-blue";
        else if(rating < 1900) color = "blue";
        else if(rating < 2100) color = "purple";
        else if(rating < 2400) color = "orange";
        else color = "red";

        shandle = `<div class="divTableCell"><span class="${color}">${handle}</span></div>`;
        srating = `<div class="divTableCell">${rating}</div>`;
        str = str + shandle + srating + '</div>';

        tmp = document.getElementById("tablebody");
        tmp.innerHTML = tmp.innerHTML + str;
    }
}
