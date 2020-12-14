Component({
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_/,
        multipleSlots: true
    },
    properties: {
        vtabs: { type: Array, value: [] },
        tabClass: { type: String, value: '' },
        tabBarClass: { type: String, value: '' },
        activeClass: { type: String, value: '' },
        tabBarLineColor: { type: String, value: '#ff0000' },
        tabBarInactiveTextColor: { type: String, value: '#000000' },
        tabBarActiveTextColor: { type: String, value: '#ff0000' },
        tabBarInactiveBgColor: { type: String, value: '#eeeeee' },
        tabBarActiveBgColor: { type: String, value: '#ffffff' },
        contentBgColor: { type: String, value: '#ffffff' },
        tabBarWidth: { type: String, value: '110px', optionalTypes: [Number, String] },
        activeTab: { type: Number, value: 0 },
        animation: { type: Boolean, value: true },
        refreshThreshold: { type: Number, value: 60 },
        lowerThreshold: { type: Number, value: 0 },
        refreshIcon: { type: String, value: '/images/icon_pulldown.png' },
        pullIcon: { type: String, value: '/images/icon_pullup.png' },
        allData: { type: Array, value: [] }
    },
    data: {
        currentView: 0,
        contentScrollTop: 0,
        _heightRecords: [],
        _contentHeight: {},
        refresherStatus: false,
        pullupTitle: '',
        pulldownTitle: ''
    },
    observers: {
        activeTab: function activeTab(_activeTab) {
            this.scrollTabBar(_activeTab);
        }
    },
    relations: {
        '../vtabs-content/index': {
            type: 'child',
            linked: function linked(target) {
                let _this = this;

                target.calcHeight(function (rect) {
                    _this.data._contentHeight[target.data.tabIndex] = rect.height;
                    if (_this._calcHeightTimer) {
                        clearTimeout(_this._calcHeightTimer);
                    }
                    _this._calcHeightTimer = setTimeout(function () {
                        _this.calcHeight();
                    }, 100);
                });
            },
            unlinked: function unlinked(target) {
                delete this.data._contentHeight[target.data.tabIndex];
            }
        }
    },
    lifetimes: {
        attached: function attached() {}
    },
    methods: {
        calcHeight: function calcHeight() {
            let length = this.data.vtabs.length;
            let _contentHeight = this.data._contentHeight;
            let _heightRecords = [];
            let temp = 0;
            for (let i = 0; i < length; i++) {
                _heightRecords[i] = temp + (_contentHeight[i] || 0);
                temp = _heightRecords[i];
            }
            this.data._heightRecords = _heightRecords;
        },
        scrollTabBar: function scrollTabBar(index) {
            let len = this.data.vtabs.length;
            if (len === 0) return;
            let currentView = index < 6 ? 0 : index - 5;
            if (currentView >= len) currentView = len - 1;
            this.setData({ currentView: currentView });
        },
        handleTabClick: function handleTabClick(e) {
            let _heightRecords = this.data._heightRecords;
            let index = e.currentTarget.dataset.index;
            let contentScrollTop = _heightRecords[index - 1] || 0;
            this.triggerEvent('tabclick', { index: index });
            this.setData({
                activeTab: index,
                contentScrollTop: contentScrollTop
            });
        },

        handleContentScroll: function handleContentScroll(e) {
            let { vtabs, activeTab, _heightRecords } = this.data
            ////////////////
            this.setData({
                pulldownTitle: vtabs[activeTab + 1].title
            })
            ////////////////

            if (_heightRecords.length === 0) return;
            let length = vtabs.length;
            let scrollTop = e.detail.scrollTop;
            let index = 0;
            if (scrollTop >= _heightRecords[0]) {
                for (let i = 1; i < length; i++) {
                    if (scrollTop >= _heightRecords[i - 1] && scrollTop < _heightRecords[i]) {
                        index = i;
                        break;
                    }
                }
            }
            if (index !== activeTab) {
                this.triggerEvent('change', { index: index });
                this.setData({ activeTab: index });
            }
        },

        ////////////////
        handleRefresherPulling: function handleRefresherPulling(e) {
            let { vtabs, activeTab } = this.data
            this.setData({
                pullupTitle: vtabs[activeTab - 1].title
            })
        },
        handleContentRefresherRefresh: function handleContentRefresherRefresh(e) {
            let _heightRecords = this.data._heightRecords;
            let index = this.data.activeTab - 1;
            let contentScrollTop = _heightRecords[index - 1] || 0;
            this.setData({
                refresherStatus: true
            }, () => {
                setTimeout(() => {
                    this.setData({
                        refresherStatus: false,
                        contentScrollTop: contentScrollTop
                    })
                    this.triggerEvent('tabclick', { index: index });
                }, 500)
                
            });
        },
        handleContentTolower: function handleContentTolower(e) {
            let _heightRecords = this.data._heightRecords;
            let index = this.data.activeTab + 1;
            let contentScrollTop = _heightRecords[index - 1] || 0;
            this.triggerEvent('tabclick', { index: index });
            this.setData({
                activeTab: index,
                contentScrollTop: contentScrollTop
            });
        }
        ////////////////
    }
});