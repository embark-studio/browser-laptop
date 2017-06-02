/* global describe, it, before, beforeEach, after, afterEach */
const Immutable = require('immutable')
const assert = require('assert')
const mockery = require('mockery')
const sinon = require('sinon')
const appConstants = require('../../../../../js/constants/appConstants')
const dragTypes = require('../../../../../js/constants/dragTypes')
const fakeElectron = require('../../../lib/fakeElectron')
const fakeAdBlock = require('../../../lib/fakeAdBlock')
require('../../../braveUnit')

describe('tabsReducer unit tests', function () {
  let tabsReducer
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    })
    this.state = Immutable.fromJS({
      tabs: [{
        tabId: 1,
        windowId: 1,
        pinned: false,
        active: true
      }, {
        tabId: 2,
        pinned: true,
        windowId: 1
      }, {
        tabId: 3,
        pinned: false,
        windowId: 2,
        active: true
      }, {
        tabId: 4,
        pinned: false,
        windowId: 2,
        active: false
      }],
      tabsInternal: {
        index: {
          1: 0,
          2: 1,
          3: 2,
          4: 3
        }
      },
      windows: [{
        windowId: 1,
        windowUUID: 'uuid'
      }, {
        windowId: 2,
        windowUUID: 'uuid2'
      }]
    })
    mockery.registerMock('electron', fakeElectron)
    mockery.registerMock('ad-block', fakeAdBlock)
    mockery.registerMock('leveldown', {})

    this.tabsAPI = {
      isDevToolsFocused: (tabId) => {
        return tabId === 1
      },
      toggleDevTools: sinon.mock(),
      closeTab: sinon.mock(),
      moveTo: sinon.mock()
    }

    this.windowsAPI = {
      closeWindow: sinon.mock()
    }

    this.tabStateAPI = {
      TAB_ID_NONE: -1,
      TAB_ID_ACTIVE: -2,
      removeTabByTabId: sinon.mock(),
      getActiveTabId: sinon.mock(),
      resolveTabId: function (state, tabId) {
        return tabId
      },
      getWindowId: function (state, tabId) {
        return 1
      },
      getNonPinnedTabsByWindowId: function () { return [] },
      getPinnedTabsByWindowId: function () { return [] }
    }

    mockery.registerMock('tabs', this.tabsAPI)
    mockery.registerMock('../tabs', this.tabsAPI)
    mockery.registerMock('../windows', this.windowsAPI)
    mockery.registerMock('../../common/state/tabState', this.tabStateAPI)
    tabsReducer = require('../../../../../app/browser/reducers/tabsReducer')
  })

  after(function () {
    mockery.disable()
  })

  describe.skip('APP_SET_STATE', function () {
    it('initializes a tab', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_CREATED', function () {
    it('creates a tab', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_MOVED', function () {
    it('moves a tab', function () {
      // TODO
    })
  })

  describe.skip('APP_CREATE_TAB_REQUESTED', function () {
    it('creates a new tab', function () {
      // TODO
    })
  })

  describe.skip('APP_CREATE_TAB_REQUESTED', function () {
    it('creates a tab that does not exist yet', function () {
      // TODO
    })
    it('does not create a tab that already exists', function () {
      // TODO
    })
  })

  // It this one really needed?
  describe.skip('APP_TAB_UPDATED', function () {
    it('updates a tab?', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_CLOSED', function () {
    const action = {
      actionType: appConstants.APP_TAB_CLOSED,
      tabId: 3
    }
    before(function () {
      this.clock = sinon.useFakeTimers()
    })
    after(function () {
      this.clock.restore()
    })
    afterEach(function () {
      this.tabsAPI.toggleDevTools.reset()
      this.tabsAPI.closeTab.reset()
      this.tabsAPI.moveTo.reset()
      this.tabsAPI.isDevToolsFocused.restore()
    })
    it('closes devtools when opened and focused', function () {
      this.isDevToolsFocused = sinon.stub(this.tabsAPI, 'isDevToolsFocused', () => true)
      tabsReducer(this.state, action)
      this.clock.tick(1510)
      assert(this.tabsAPI.toggleDevTools.withArgs(this.state, 1).calledOnce)
      assert(this.tabsAPI.closeTab.notCalled)
    })
    it('closes tab when tab is focused with no devtools', function () {
      this.isDevToolsFocused = sinon.stub(this.tabsAPI, 'isDevToolsFocused', () => false)
      tabsReducer(this.state, action)
      this.clock.tick(1510)
      assert(this.tabsAPI.toggleDevTools.notCalled)
      assert(this.tabsAPI.closeTab.withArgs(this.state, 1).calledOnce)
    })

    it('does nothing if tabId is TAB_ID_NONE')

    it('calls tabState.removeTabByTabId', function () {
      tabsReducer(this.state, action)
    })
  })

  describe.skip('APP_ALLOW_FLASH_ONCE', function () {
    it('allows flash once', function () {
      // TODO
    })
  })

  describe.skip('APP_ALLOW_FLASH_ALWAYS', function () {
    it('allows flash always', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_CLONED', function () {
    it('clones a tab', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_PINNED', function () {
    it('pins a tab', function () {
      // TODO
    })
  })

  describe.skip('WINDOW_SET_AUDIO_MUTED', function () {
    it('mutes audio', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_ACTIVATED', function () {
    it('sets the frame as active', function () {
      // TODO
    })
  })

  describe.skip('APP_TAB_TOGGLE_DEV_TOOLS', function () {
    it('toggles dev tools for the tab', function () {
      // TODO
    })
  })

  describe('APP_TAB_CLOSE_REQUESTED', function () {
    const action = {
      actionType: appConstants.APP_TAB_CLOSE_REQUESTED,
      tabId: 1
    }

    before(function () {
      this.clock = sinon.useFakeTimers()
    })
    after(function () {
      this.clock.restore()
    })

    afterEach(function () {
      this.tabsAPI.toggleDevTools.reset()
      this.tabsAPI.closeTab.reset()
      this.tabsAPI.moveTo.reset()
      this.windowsAPI.closeWindow.reset()
      this.tabStateAPI.getActiveTabId.reset()
    })

    describe('when tabId == TAB_ID_ACTIVE', function () {
      it('calls getActiveTabId to get the actual tabId', function () {
        const actionActiveTab = {
          actionType: action.actionType,
          tabId: this.tabStateAPI.TAB_ID_ACTIVE
        }
        tabsReducer(this.state, actionActiveTab)
        this.clock.tick(1510)
        assert(this.tabStateAPI.getActiveTabId.withArgs(this.state, 1).calledOnce)
      })
    })

    describe('when tabId == TAB_ID_NONE', function () {
      it('exits without taking action', function () {
        const actionNoTab = {
          actionType: action.actionType,
          tabId: this.tabStateAPI.TAB_ID_NONE
        }
        tabsReducer(this.state, actionNoTab)
        this.clock.tick(1510)
        assert(this.tabsAPI.toggleDevTools.notCalled)
        assert(this.tabsAPI.closeTab.notCalled)
        assert(this.windowsAPI.closeWindow.notCalled)
      })
    })

    describe('with isDevToolsFocused', function () {
      afterEach(function () {
        this.tabsAPI.isDevToolsFocused.restore()
      })

      describe('when true', function () {
        beforeEach(function () {
          this.isDevToolsFocused = sinon.stub(this.tabsAPI, 'isDevToolsFocused', () => true)
          this.tabStateAPI.resolveTabId = sinon.stub(this.tabStateAPI, 'resolveTabId', () => {
            return action.tabId
          })
        })
        afterEach(function () {
          this.tabStateAPI.resolveTabId.restore()
        })

        it('closes devtools when opened and focused', function () {
          tabsReducer(this.state, action)
          this.clock.tick(1510)
          assert(this.tabsAPI.toggleDevTools.withArgs(this.state, 1).calledOnce)
          assert(this.tabsAPI.closeTab.notCalled)
        })
      })

      describe('when false', function () {
        beforeEach(function () {
          this.isDevToolsFocused = sinon.stub(this.tabsAPI, 'isDevToolsFocused', () => false)
        })
        afterEach(function () {
          this.tabStateAPI.getNonPinnedTabsByWindowId.restore()
          this.tabStateAPI.getPinnedTabsByWindowId.restore()
        })

        describe('when more than 1 tab exists', function () {
          beforeEach(function () {
            this.nonPinnedTabs = sinon.stub(this.tabStateAPI, 'getNonPinnedTabsByWindowId', (state, windowId) => {
              return Immutable.fromJS([{
                tabId: 1,
                windowId: 1,
                pinned: false,
                active: true
              }, {
                tabId: 2,
                pinned: false,
                windowId: 1
              }])
            })
            this.pinnedTabs = sinon.stub(this.tabStateAPI, 'getPinnedTabsByWindowId', (state, windowId) => Immutable.fromJS([]))
          })

          it('closes tab', function () {
            tabsReducer(this.state, action)
            this.clock.tick(1510)
            assert(this.tabsAPI.toggleDevTools.notCalled)
            assert(this.tabsAPI.closeTab.withArgs(action.tabId, undefined).calledOnce)
          })
        })

        describe('when there are no tabs left', function () {
          beforeEach(function () {
            this.nonPinnedTabs = sinon.stub(this.tabStateAPI, 'getNonPinnedTabsByWindowId', (state, windowId) => {
              return Immutable.fromJS([{
                tabId: 1,
                windowId: 1,
                pinned: false,
                active: true
              }])
            })
          })

          describe('when pinnedTabs.size > 0', function () {
            beforeEach(function () {
              this.pinnedTabs = sinon.stub(this.tabStateAPI, 'getPinnedTabsByWindowId', (state, windowId) => Immutable.fromJS([{
                tabId: 2,
                windowId: 1,
                pinned: true
              }]))
            })

            it('closes tab', function () {
              tabsReducer(this.state, action)
              this.clock.tick(1510)
              assert(this.tabsAPI.toggleDevTools.notCalled)
              assert(this.tabsAPI.closeTab.withArgs(action.tabId, undefined).calledOnce)
            })
          })

          describe('when pinnedTabs.size == 0', function () {
            beforeEach(function () {
              this.pinnedTabs = sinon.stub(this.tabStateAPI, 'getPinnedTabsByWindowId', (state, windowId) => Immutable.fromJS([]))
            })

            it('closes window when there are no tabs left', function () {
              tabsReducer(this.state, action)
              this.clock.tick(1510)
              assert(this.tabsAPI.toggleDevTools.notCalled)
              assert(this.windowsAPI.closeWindow.withArgs(this.state, 1).calledOnce)
            })
          })
        })
      })
    })
  })

  describe.skip('APP_LOAD_URL_REQUESTED', function () {
    it('loads the specified URL', function () {
      // TODO
    })
  })

  describe.skip('APP_LOAD_URL_IN_ACTIVE_TAB_REQUESTED', function () {
    it('loads the specified URL in the active tab', function () {
      // TODO
    })
  })

  describe.skip('APP_FRAME_CHANGED', function () {
    it('updates frame data', function () {
      // TODO
    })
  })

  describe('APP_DRAG_ENDED', function () {
    const action = {
      actionType: appConstants.APP_DRAG_ENDED
    }
    before(function () {
      tabsReducer = require('../../../../../app/browser/reducers/tabsReducer')
    })
    afterEach(function () {
      this.tabsAPI.moveTo.reset()
    })

    it('calls into tabs.moveTo for tabs', function () {
      const state = this.state.set('dragData', Immutable.fromJS({
        windowId: 1,
        type: dragTypes.TAB,
        data: this.state.getIn(['tabs', 0]),
        dropWindowId: -1
      }))
      tabsReducer(state, action)
      const args = this.tabsAPI.moveTo.args[0]
      assert.equal(args.length, 5)  // Function signature has 5 args
      assert.equal(args[0], state)  // State is passed in as first arg
      assert.equal(args[1], 1)  // tabId is 1 for first tab
      // frameOpts being dragged is for the first tab
      assert.deepEqual(args[2], { tabId: 1,
        windowId: 1,
        pinned: false,
        active: true,
        indexByFrameKey: undefined,
        prependIndexByFrameKey: undefined
      })
      // Passes browser options for position by mouse cursor
      assert.deepEqual(args[3], {
        positionByMouseCursor: true
      })
      // Dropping on window ID is -1
      assert.equal(args[4], -1)
    })
    it('does not call into tabs.moveTo for other drop types', function () {
      const state = this.state.set('dragData', Immutable.fromJS({
        windowId: 1,
        type: dragTypes.BOOKMARK,
        data: this.state.getIn(['tabs', 0]),
        dropWindowId: -1
      }))
      tabsReducer(state, action)
      assert(this.tabsAPI.moveTo.notCalled)
    })
  })
})
