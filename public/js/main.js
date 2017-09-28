var btnBudget = document.querySelector('#btn_budget')
var fepiModal = document,querySelector('.fepi-modal')

window.onLoad = function() {
    btnBudget.onclick = showFIPEModal
}

function showFIPEModal() {
    fepiModal.classList.add('show')
}
