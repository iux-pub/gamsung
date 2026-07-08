// 탭 컴포넌트 — 키보드 좌우 전환 (자동 활성화)
;(function () {
  'use strict'

  function activateTab(tab) {
    var tablist = tab.closest('[role="tablist"]')
    var tabs = tablist.querySelectorAll('[role="tab"]')
    var tabContainer = tablist.closest('.tab')

    // 모든 탭 비활성화
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', 'false')
      t.setAttribute('tabindex', '-1')
    })

    // 선택된 탭 활성화
    tab.setAttribute('aria-selected', 'true')
    tab.setAttribute('tabindex', '0')
    tab.focus()

    // 패널 전환
    var panelId = tab.getAttribute('aria-controls')
    var panels = tabContainer.querySelectorAll('[role="tabpanel"]')
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== panelId
    })
  }

  // 이벤트 위임 — 클릭
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[role="tab"]')
    if (tab) activateTab(tab)
  })

  // 이벤트 위임 — 키보드
  document.addEventListener('keydown', function (e) {
    var tab = e.target.closest('[role="tab"]')
    if (!tab) return

    var tablist = tab.closest('[role="tablist"]')
    var tabs = Array.from(tablist.querySelectorAll('[role="tab"]'))
    var index = tabs.indexOf(tab)

    var newTab = null
    if (e.key === 'ArrowRight') {
      newTab = tabs[(index + 1) % tabs.length]
    } else if (e.key === 'ArrowLeft') {
      newTab = tabs[(index - 1 + tabs.length) % tabs.length]
    } else if (e.key === 'Home') {
      newTab = tabs[0]
    } else if (e.key === 'End') {
      newTab = tabs[tabs.length - 1]
    }

    if (newTab) {
      e.preventDefault()
      activateTab(newTab)
    }
  })
})()
