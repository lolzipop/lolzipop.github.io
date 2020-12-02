
function runexperiment() {
    var fileInput = document.getElementById("csv");
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById('out').innerHTML = reader.result;
    };
    reader.readAsBinaryString(fileInput.files[0]);
}

function experiment() {
    let textareavalue = document.getElementById('out').value;
    var num_list = textareavalue.split(',')
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    function percent(real, ideal) {
        percentage = Math.round((Math.abs(real - ideal) / ideal) * 100);
        percentage = 100 - percentage;
        return percentage;
    }
    function ZipfsLaw(aList) {
        aList.sort(function (a, b) {
            return b - a;
        })
        var rankList = [];
        var ranknum = 0;
        var extraranknum = 1;
        var idealDict = {};
        var realDict = {};
        for (let rank = 1; rank < aList.length + 1; rank++) {
            rankList.push(rank);
        }
        for (let i = 0; i < aList.length; i++) {
            idealnum = Math.round(aList[0] / rankList[ranknum]);
            ranknum++;
            idealDict[ranknum] = idealnum;
        }
        aList.forEach(each => {
            realDict[extraranknum] = each; extraranknum++;
        });
        var percentList = [];
        for (let i = 2; i < aList.length + 1; i++) {
            percentList.push(percent(realDict[i], idealDict[i]));
        }
        var sum = 0;
        percentList.forEach(each => {
            sum += each;
        });
        var sum = sum / percentList.length;
        return ('Zipfs Law: ' + Math.round(sum) + '%');
    }
    function BenfordsLaw(aList) {
        var onecount = 0;
        for (let i = 0; i < aList.length; i++) {
            var aNewList = [];
            var stringNum = aList[i].toString()
            for (let j = 0; j < stringNum.length; j++) {
                aNewList.push(stringNum.charAt(j));
            }
            if (aNewList[0] == 1) {
                onecount++;
            }
        }
        var realOnePercent = Math.round((onecount / aList.length) * 100, 2);
        var finalOnePercent = percent(30, realOnePercent);
        return ('Benfords Law: ' + finalOnePercent + '%')
    }
    function HeapsLaw(aList) {
        let aNewList = [...new Set(aList)];
        var v = Number(aNewList.length);
        var n = Number(aList.length);
        var x = Math.sqrt(n);
        return ('Heaps Law: ' + String(percent(v, x)) + '%')
    }
    var result1 = ZipfsLaw(num_list);
    var result2 = BenfordsLaw(num_list);
    var result3 = HeapsLaw(num_list);
    document.getElementById('result1').innerHTML = result1
    document.getElementById('result2').innerHTML = result2
    document.getElementById('result3').innerHTML = result3
}