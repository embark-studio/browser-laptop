/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const Immutable = require('immutable')
const ipc = require('electron').ipcRenderer

// Components
const Dialog = require('../common/dialog')
const Button = require('../common/button')
const SwitchControl = require('../common/switchControl')
const {
  CommonFormSmall,
  CommonFormSection,
  CommonFormTitle,
  CommonFormButtonWrapper,
  CommonFormBottomWrapper
} = require('../common/commonForm')

// Actions
const appActions = require('../../../../js/actions/appActions')

// Constants
const messages = require('../../../../js/constants/messages')

class ClearBrowsingDataPanel extends React.Component {
  constructor (props) {
    super(props)
    this.onToggleBrowserHistory = this.onToggleSetting.bind(this, 'browserHistory')
    this.onToggleDownloadHistory = this.onToggleSetting.bind(this, 'downloadHistory')
    this.onToggleCachedImagesAndFiles = this.onToggleSetting.bind(this, 'cachedImagesAndFiles')
    this.onToggleSavedPasswords = this.onToggleSetting.bind(this, 'savedPasswords')
    this.onToggleAllSiteCookies = this.onToggleSetting.bind(this, 'allSiteCookies')
    this.onToggleAutocompleteData = this.onToggleSetting.bind(this, 'autocompleteData')
    this.onToggleAutofillData = this.onToggleSetting.bind(this, 'autofillData')
    this.onToggleSavedSiteSettings = this.onToggleSetting.bind(this, 'savedSiteSettings')
    this.onClear = this.onClear.bind(this)
    this.state = {
      clearBrowsingDataDetail: props.clearBrowsingDataDefaults ? props.clearBrowsingDataDefaults : Immutable.Map()
    }
  }
  onToggleSetting (setting) {
    this.setState(({clearBrowsingDataDetail}) => ({
      clearBrowsingDataDetail: clearBrowsingDataDetail.update(setting, isChecked => !isChecked)
    }))
  }
  onClear () {
    appActions.onClearBrowsingData(this.state.clearBrowsingDataDetail)
    this.props.onHide()
    let detail = this.state.clearBrowsingDataDetail
    if (detail.get('allSiteCookies') && detail.get('browserHistory') &&
        detail.get('cachedImagesAndFiles')) {
      ipc.send(messages.PREFS_RESTART)
    }
  }
  render () {
    return <Dialog onHide={this.props.onHide} testId='clearBrowsingDataPanel' isClickDismiss>
      <CommonFormSmall onClick={(e) => e.stopPropagation()}>
        <CommonFormTitle data-l10n-id='clearBrowsingData' />
        <CommonFormSection>
          <SwitchControl
            rightl10nId='browserHistory'
            testId='browserHistorySwitch'
            checkedOn={this.state.clearBrowsingDataDetail.get('browserHistory')}
            onClick={this.onToggleBrowserHistory} />
          <SwitchControl
            rightl10nId='downloadHistory'
            checkedOn={this.state.clearBrowsingDataDetail.get('downloadHistory')}
            onClick={this.onToggleDownloadHistory} />
          <SwitchControl
            rightl10nId='cachedImagesAndFiles'
            checkedOn={this.state.clearBrowsingDataDetail.get('cachedImagesAndFiles')}
            onClick={this.onToggleCachedImagesAndFiles} />
          <SwitchControl
            rightl10nId='savedPasswords'
            checkedOn={this.state.clearBrowsingDataDetail.get('savedPasswords')}
            onClick={this.onToggleSavedPasswords} />
          <SwitchControl
            rightl10nId='allSiteCookies'
            checkedOn={this.state.clearBrowsingDataDetail.get('allSiteCookies')}
            onClick={this.onToggleAllSiteCookies} />
          <SwitchControl
            rightl10nId='autocompleteData'
            testId='autocompleteDataSwitch'
            checkedOn={this.state.clearBrowsingDataDetail.get('autocompleteData')}
            onClick={this.onToggleAutocompleteData} />
          <SwitchControl
            rightl10nId='autofillData'
            testId='autofillDataSwitch'
            checkedOn={this.state.clearBrowsingDataDetail.get('autofillData')}
            onClick={this.onToggleAutofillData} />
          <SwitchControl
            rightl10nId='savedSiteSettings'
            testId='siteSettingsSwitch'
            checkedOn={this.state.clearBrowsingDataDetail.get('savedSiteSettings')}
            onClick={this.onToggleSavedSiteSettings} />
        </CommonFormSection>
        <CommonFormButtonWrapper>
          <Button className='whiteButton'
            l10nId='cancel'
            testId='cancelButton'
            onClick={this.props.onHide}
          />
          <Button className='primaryButton'
            l10nId='clear'
            testId='clearDataButton'
            onClick={this.onClear}
          />
        </CommonFormButtonWrapper>
        <CommonFormBottomWrapper>
          <div data-l10n-id='clearDataWarning' />
        </CommonFormBottomWrapper>
      </CommonFormSmall>
    </Dialog>
  }
}

module.exports = ClearBrowsingDataPanel
