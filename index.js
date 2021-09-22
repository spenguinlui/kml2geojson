// index.js
const converter = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;

// for node.js 用的
const fs = require("fs");
// 找到檔案路徑解析
// const parsedKML = new DOMParser().parseFromString(fs.readFileSync("<PATH_TO_KML>", "utf8"));
// const parsedKML = new DOMParser().parseFromString(fs.readFileSync("/Users/lui/Desktop/082044.kml", "utf8"));

// 編譯為 json
// const geojson = converter.kml(parsedKML);

// 寫入成檔案
// fs.writeFile('/Users/lui/Desktop/082044.json', JSON.stringify(geojson),function (error) {
//   console.log(error)
//   console.log('文件寫入成功')
// })

// 下載函式
const downloadJson = (dataStr, fileName) => {
  if (dataStr && fileName) {
    // 建立 DOM
    const downloadDOM = document.createElement('a');
  
    // 設定連結與下載屬性
    downloadDOM.setAttribute("href", dataStr);
    downloadDOM.setAttribute("download", fileName);
  
    // 掛到 body 上並觸發點擊，然後再移除
    document.body.appendChild(downloadDOM);
    downloadDOM.click();
    document.body.removeChild(downloadDOM);
  }
}


// 轉換函式
const convertKml2JSON = (file) => {
  if (file) {
    // 註冊檔案讀取元件
    const reader = new FileReader();
    let dataStr;
    reader.onload = (e) => {
      // 解析字串
      const xmlStr = e.target.result;
      const parsedKML = new DOMParser().parseFromString(xmlStr, "text/xml");

      // 轉換 kml 成 json 物件再轉 data文字
      const geojson = converter.kml(parsedKML);
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson));

      // 執行下載函式下載 json檔
      const fileName = file.name.replace('kml', 'json');
      downloadJson(dataStr, fileName)
    }
    // 以文字讀取
    reader.readAsText(file);
  }
}

// 監聽
document.addEventListener('DOMContentLoaded', () => {

  // DOM
  const fileUploadInput = document.getElementById('fileUpload');
  const convertBtn = document.getElementById('convertBtn');

  // 點擊後觸發
  convertBtn.addEventListener('click', () => {
    const file = fileUploadInput.files[0];
    convertKml2JSON(file);
  })
})
