/**
 * @description: 
 * @return {*}
 * @param {*} url
 * @param {*} name
 */
function downloadFile(url, name) {
  const a = document.createElement('a'); //创建一个a标签
  a.download = name;
  a.rel = 'noopener'; // rel =“noopener”是可以添加到外部链接的HTML属性。 它阻止打开的页面获得对原始页面的任何访问
  a.href = url;
  // 触发模拟点击
  a.dispatchEvent(new MouseEvent('click'));
  // 或者  a.click()
}

const dataJson = {
  name: '张三',
  age: 18,
  birthday: '2000-10-01',
  height: '172CM'
}

const str = JSON.stringify(dataJson, null, 2);

//方案一：Text -> DataURL
const dataUrl = `data:,${str}`;
// downloadFile(dataUrl, 'demo.json')

// 方案二：Text -> Blob -> ObjectURL
const url = URL.createObjectURL(new Blob(str.split('')))
downloadFile(url, 'demo-Blob.json')