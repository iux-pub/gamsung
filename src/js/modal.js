// 모달 컴포넌트 — 포커스 트랩 + ESC 닫기
;(function () {
  'use strict'

  var FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  function openModal(modal, trigger) {
    modal.setAttribute('aria-hidden', 'false')
    modal.style.display = 'flex'
    modal.classList.add('modal--active')
    document.body.style.overflow = 'hidden'
    var firstFocusable = modal.querySelector(FOCUSABLE)
    if (firstFocusable) firstFocusable.focus()
    modal._trigger = trigger
  }

  function closeModal(modal) {
    modal.classList.remove('modal--active')
    modal.setAttribute('aria-hidden', 'true')
    modal.style.display = 'none'
    document.body.style.overflow = ''
    if (modal._trigger) modal._trigger.focus()
  }

  function trapFocus(modal, e) {
    var focusables = modal.querySelectorAll(FOCUSABLE)
    if (focusables.length === 0) return
    var first = focusables[0]
    var last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // 이벤트 위임 — 클릭
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-modal-open]')
    if (trigger) {
      var modal = document.getElementById(trigger.dataset.modalOpen)
      if (modal) openModal(modal, trigger)
    }
    var close = e.target.closest('[data-modal-close]')
    if (close) {
      var modal = close.closest('.modal')
      if (modal) closeModal(modal)
    }
    if (e.target.classList.contains('modal__overlay')) {
      var modal = e.target.closest('.modal')
      if (modal) closeModal(modal)
    }
  })

  // 이벤트 위임 — 키보드
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openModal_ = document.querySelector('.modal[aria-hidden="false"]')
      if (openModal_) closeModal(openModal_)
    }
    if (e.key === 'Tab') {
      var openModal_ = document.querySelector('.modal[aria-hidden="false"]')
      if (openModal_) trapFocus(openModal_, e)
    }
  })
})()
