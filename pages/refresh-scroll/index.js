import Page from '../../common/page'
import paramConfig from '../paramConfig'
let app = getApp(), pageStart = 0

let testData = [
  {
    title: "这个绝望的世界没有存在的价值，所剩的只有痛楚",
		description: "思念、愿望什么的都是一场空，被这种虚幻的东西绊住脚，什么都做不到",
		images: "../../assets/image/swipe/1.png"
  },
	{
		title: "我早已闭上了双眼，我的目的，只有在黑暗中才能实现",
		description: "有太多的羁绊只会让自己迷惘，强烈的想法和珍惜的思念，只会让自己变弱",
		images: "../../assets/image/swipe/2.png"
	},
	{
		title: "感受痛苦吧，体验痛苦吧，接受痛苦吧，了解痛苦吧。不知道痛苦的人是不会知道什么是和平",
		description: "但我已经在无限存在的痛苦之中，有了超越凡人的成长。从凡人化为神",
		images: "../../assets/image/swipe/3.png"
	},
	{
		title: "我决定了 从今天起 我要选择一条不会让自己后悔的路 我要创造出属于自己的忍道 ",
		description: "我才不要在这种时候放弃,即使当不成中忍,我也会通过其他的途径成为火影的,这就是我的忍道",
		images: "../../assets/image/swipe/4.png"
	},
	{
		title: "为什么你会这么弱？就是因为你对我的仇恨...还不够深...",
		description: "你没有杀的价值...愚蠢的弟弟啊...想要杀死我的话...仇恨吧！憎恨吧！然后丑陋地活下去吧！逃吧 逃吧...然后苟且偷生下去吧！",
		images: "../../assets/image/swipe/5.png"
	},
	{
		title: "对于忍者而言怎样活着无所谓，怎样死去才是最重要的...",
		description: "所谓的忍者就是忍人所不能忍，忍受不了饿肚子，而沦落为盗贼的人，根本不能称之为忍者",
		images: "../../assets/image/swipe/6.png"
	}
]

Page({

  data: {
		listData: [],
		page: pageStart,
    requesting: false,
    end: false,
    emptyShow: false,
		infoText: '刷新成功',

    showParam: false,
    params: paramConfig.vtabsParam,
    paramCheckeds: [0]
  },

  onLoad: function (options) {
    this.getList('refresh', pageStart)
  },
  // 刷新数据
	refresh() {
		this.getList('refresh', pageStart);
		this.setData({
			empty: false
		})
	},
	// 加载更多
	more() {
		this.getList('more', this.data.page)
  },
  getList(type, currentPage) {
		this.setData({
			requesting: true
		})

		wx.showNavigationBarLoading()

		// 模拟异步获取数据场景
		setTimeout(() => {
			this.setData({
				requesting: false
			})

			wx.hideNavigationBarLoading()

			if (type === 'refresh') {
				this.setData({
					listData: testData,
					page: currentPage + 1
				})
			} else {
				this.setData({
					listData: this.data.listData.concat(testData),
					page: currentPage + 1,
					end: false
				})
			}

		}, 1000)
	},
})