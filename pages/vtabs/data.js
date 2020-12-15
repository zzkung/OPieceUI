export const tabList = [
  {
    title: '推荐分类'
  }, {
    title: 'OP超市'
  }, {
    title: '男装'
  }, {
    title: '奢侈品'
  }, {
    title: '女装'
  }, {
    title: '鞋靴'
  }, {
    title: '内衣配饰'
  }, {
    title: '箱包'
  }, {
    title: '美妆护肤'
  }, {
    title: '个人清洁'
  }, {
    title: '钟表珠宝'
  }, {
    title: '手机'
  }, {
    title: '数码'
  }, {
    title: '电脑办公'
  }, {
    title: '家电'
  }, {
    title: '生鲜'
  }, {
    title: '食品酒饮'
  }, {
    title: '母婴童装'
  }, {
    title: '玩具乐器'
  }, {
    title: '医药保健'
  }, {
    title: '计生情趣'
  }, {
    title: '运动户外'
  }, {
    title: '汽摩生活'
  }, {
    title: '家居厨具'
  }, {
    title: '家具家装'
  }, {
    title: '宠物鲜花'
  }, {
    title: '生活旅行'
  }, {
    title: '图书文旅'
  }, {
    title: '二手商品'
  }, {
    title: '京东服务'
  }, {
    title: '拍卖'
  }, {
    title: '工业品'
  }
]

const title = ['常用分类','休闲零食','生鲜','粮油调味','功能箱包','手机配件','摄影摄像','影音娱乐']

const banner = ['/shop/ia_900000001.jpg','/shop/ia_900000002.jpg','/shop/ia_900000003.jpg','/shop/ia_900000004.jpg','/shop/ia_900000005.jpg','/shop/ia_900000006.jpg','/shop/ia_900000007.jpg','/shop/ia_900000008.png']

const shoplist = [
  {
    title: '空调',
    cover: '/shop/ia_100000000.jpg'
  }, {
    title: '冰箱',
    cover: '/shop/ia_100000001.jpg'
  }, {
    title: '笔记本电脑',
    cover: '/shop/ia_100000002.png'
  }, {
    title: '手机',
    cover: '/shop/ia_100000003.png'
  }, {
    title: '拍照手机',
    cover: '/shop/ia_100000004.jpg'
  }, {
    title: '千元手机',
    cover: '/shop/ia_100000005.jpg'
  }, {
    title: '维矿物质',
    cover: '/shop/ia_100000006.jpg'
  }, {
    title: '一次性口罩',
    cover: '/shop/ia_100000007.jpg'
  }, {
    title: '加湿器',
    cover: '/shop/ia_100000008.jpg'
  }, {
    title: '电磁炉',
    cover: '/shop/ia_100000009.jpg'
  }, {
    title: '电水壶',
    cover: '/shop/ia_100000010.jpg'
  }, {
    title: 'usb配件',
    cover: '/shop/ia_100000011.jpg'
  }, {
    title: '书籍',
    cover: '/shop/ia_100000012.jpg'
  }, {
    title: '保健药',
    cover: '/shop/ia_100000013.jpg'
  }, {
    title: '洗衣液',
    cover: '/shop/ia_100000014.jpg'
  }, {
    title: '膨化食品',
    cover: '/shop/ia_100000015.jpg'
  }, {
    title: '宠物用品',
    cover: '/shop/ia_100000016.jpg'
  }, {
    title: '测温仪',
    cover: '/shop/ia_100000017.jpg'
  }, {
    title: '缝纫机',
    cover: '/shop/ia_100000018.jpg'
  }, {
    title: '游戏机',
    cover: '/shop/ia_100000019.jpg'
  }
]

let listData = []
export function randomData() {
  tabList.forEach((item, index) => {
    listData[index] = {
      banner: banner.slice(0, Math.floor(Math.random() * 7)),
      list: []
    }
    let randListNum =  Math.floor(Math.random() * (8 - 1 + 1) + 1)
    randomList(randListNum, index)
  })
  return listData
}
function randomList(num, index) {
  for (let idx = 0; idx < num; idx++) {
    listData[index].list.push({
      title: title[Math.floor(Math.random() * 7)],
      data: shoplist.slice(0, Math.floor(Math.random() * 19))
    })
  }
}