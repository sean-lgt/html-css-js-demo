/*
 * 开发思维
 * 数据逻辑
 * 界面逻辑
 * 事件逻辑
 */

/**
 * @description: 解析歌词字符串，得到一个歌词对象
 * 每个歌词对象 {time:开始时间,words:歌词内容}
 * @return {Object} 歌词对象
 */
function parseLrc() {
  const lines = lrc.split('\n')
  let result = []
  for (let i = 0; i < lines.length; i++) {
    const str = lines[i]
    const parts = str.split(']')
    const timeStr = parts[0].substring(1)
    const itemObj = {
      time: parseTime(timeStr),
      words: parts[1],
    }
    result.push(itemObj)
  }
  return result
}

/**
 * @description: 将一个时间字符串解析为数字
 * @return {*} 返回秒数
 * @param {*} timeStr 时间字符串
 */
function parseTime(timeStr) {
  let parts = timeStr.split(':')
  return +parts[0] * 60 + +parts[1]
}

const lrcData = parseLrc()

console.log('🚀【歌词对象数据】', lrcData)

const doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container'),
}

/**
 * @description: 计算出在当前播放器播放到第几秒的情况下得出对应歌词索引
 * lrcData 数组中，如果没有任何一句歌词需要显示，则得到 -1
 * @return {*} 对应歌词索引
 */
function findLrcIndex() {
  const curTime = doms.audio.currentTime
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1
    }
  }
  // 遍历没找到，说明播放到最后一句
  return lrcData.length - 1
}

/**
 * @description: 创建歌词元素 li
 * @return {*}
 */
function createLrcElemnts() {
  // 创建文档片段 减少性能消耗  渲染 lr
  const frag = document.createDocumentFragment()
  for (let i = 0; i < lrcData.length; i++) {
    const li = document.createElement('li')
    li.textContent = lrcData[i].words
    // 改动了 dom 树
    frag.appendChild(li)
  }
  doms.ul.appendChild(frag)
}

// 界面逻辑
createLrcElemnts()

// 容器高度
const containerHeight = doms.container.clientHeight
// 每个 li 的高度
const liHeight = doms.ul.children[0].clientHeight
// 最大偏移量
const maxOffset = doms.ul.clientHeight - containerHeight

/**
 * @description: 设置 ul 元素的偏移量
 * @return {*}
 */
function setContainerOffset() {
  const index = findLrcIndex()
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2
  if (offset < 0) {
    offset = 0
  }
  if (offset > maxOffset) {
    offset = maxOffset
  }
  // 设置偏移量
  doms.ul.style.transform = `translateY(-${offset}px)`
  // 去掉之前的 active 样式
  const li = doms.ul.querySelector('.active')
  if (li) {
    li.classList.remove('active')
  }

  const curli = doms.ul.children[index]
  if (curli) {
    curli.classList.add('active')
  }
}

// 事件
doms.audio.addEventListener('timeupdate', setContainerOffset)
