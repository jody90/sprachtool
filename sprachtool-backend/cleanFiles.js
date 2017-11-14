// var filedata = fs.readFileSync('base_de_clean.properties').toString().split("\n");
//
// var beFileObject = {};
// var deFileObject = {};
//
// for (let i = 0; i < filedata.length; i++) {
//     if (filedata[i] != undefined || filedata[i].trim() != "") {
//
//         filedata[i].replace("\t", "");
//
//         var tItem = filedata[i].split("=");
//         var key = tItem[0].trim();
//
//         beFileObject[key] = tItem[1] == undefined ? "" : tItem[1].replace("\r", "").trim();
//     }
// }
//
// // console.log(beFileObject);
//
// var filedataDe = fs.readFileSync('base_en.properties').toString().split("\n");
//
// for (let i = 0; i < filedataDe.length; i++) {
//     if (filedataDe[i] != undefined || filedataDe[i].trim() != "") {
//         // filedata.splice(i, 1);
//         filedataDe[i].replace("\t", "");
//
//         var tItem = filedataDe[i].split("=");
//         var key = tItem[0].trim();
//         var value = tItem[1] == undefined ? "" : tItem[1].replace("\r", "").trim();
//
//         if (beFileObject[key] !== undefined) {
//             deFileObject[key] = value;
//         }
//     }
// }
//
// var fileString = "";
//
// for (var tkey in deFileObject) {
//     fileString += tkey + " = " + deFileObject[tkey] + "\n";
// }
//
// fs.writeFileSync("base_en_clean.properties", fileString);
// console.log("Fertig");
//
// console.log(deFileObject);
//
// 
// var filedata = fs.readFileSync('base_nl_BE_clean.properties').toString().split("\n");
//
// setTimeout(function() {
//     // importService.insertFromFile(filedata, 0, "de")
//     importService.addTranslation(filedata, 0, "nl_BE")
// }, 1000)
