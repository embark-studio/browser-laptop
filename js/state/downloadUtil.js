/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
const Immutable = require('immutable')
const downloadStates = require('../constants/downloadStates')

const pendingStates = [downloadStates.IN_PROGRESS, downloadStates.PAUSED]
const stopStates = [downloadStates.CANCELLED, downloadStates.INTERRUPTED, downloadStates.COMPLETED]
const notErrorStates = [downloadStates.IN_PROGRESS, downloadStates.PAUSED, downloadStates.COMPLETED]

const downloadIsInState = (download, list) =>
 list.includes(download.get('state'))

const isPendingState = (download) =>
 downloadIsInState(download, pendingStates)

const shouldAllowPause = (download) =>
  downloadIsInState(download, [downloadStates.IN_PROGRESS])

const shouldAllowResume = (download) =>
  downloadIsInState(download, [downloadStates.PAUSED])

const shouldAllowCancel = (download) =>
 downloadIsInState(download, pendingStates)

const shouldAllowRedownload = (download) =>
 downloadIsInState(download, stopStates)

const shouldAllowOpenDownloadLocation = (download) =>
 downloadIsInState(download, notErrorStates)

const shouldAllowDelete = (download) =>
 downloadIsInState(download, stopStates)

const shouldAllowRemoveFromList = (download) =>
 downloadIsInState(download, stopStates)

const getL10nId = (download) => {
  switch (download.get('state')) {
    case downloadStates.INTERRUPTED:
      return 'downloadInterrupted'
    case downloadStates.CANCELLED:
      return 'downloadCancelled'
    case downloadStates.IN_PROGRESS:
      if (!download.get('totalBytes')) {
        return 'downloadInProgressUnknownTotal'
      } else {
        return 'downloadInProgress'
      }
    case downloadStates.COMPLETED:
      return 'downloadCompleted'
    case downloadStates.PAUSED:
      return 'downloadPaused'
  }
  return ''
}

const getPercentageComplete = (download) =>
  Math.ceil(download.get('receivedBytes') / download.get('totalBytes') * 100) + '%'

const shouldAllowCopyLink = (download) => !!download.get('url')

const getDownloadItems = (state) => {
  if (!state.get('downloads')) {
    return Immutable.List()
  }

  const downloadsSize = state.get('downloads').size
  const root = window.getComputedStyle(document.querySelector(':root'))
  const downloadItemWidth = Number.parseInt(root.getPropertyValue('--download-item-width'), 10)
  const downloadItemMargin = Number.parseInt(root.getPropertyValue('--download-item-margin'), 10)
  const downloadBarPadding = Number.parseInt(root.getPropertyValue('--download-bar-padding'), 10)
  const downloadBarButtons = Number.parseInt(root.getPropertyValue('--download-bar-buttons'), 10)
  const numItems = Math.floor(
    (window.innerWidth - (downloadBarPadding * 2) - downloadBarButtons) /
    (downloadItemWidth + downloadItemMargin)
  )

  return state.get('downloads')
    .sort((x, y) => x.get('startTime') - y.get('startTime'))
    .skip(downloadsSize - numItems)
    .reverse()
    .map((download, downloadId) => downloadId)
}

module.exports = {
  isPendingState,
  shouldAllowPause,
  shouldAllowResume,
  shouldAllowCancel,
  shouldAllowRedownload,
  shouldAllowOpenDownloadLocation,
  shouldAllowDelete,
  shouldAllowRemoveFromList,
  getL10nId,
  getPercentageComplete,
  shouldAllowCopyLink,
  getDownloadItems
}
