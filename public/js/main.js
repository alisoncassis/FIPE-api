const btnBudget = document.querySelector('#btn_budget')
const fepiModal = document.querySelector('.fepi-modal')
const plate = document.querySelector('#plate')

window.onload = function() {
    btnBudget.onclick = showFIPEModal
    plate.onchange = searchByPlate
}

function showFIPEModal() {
    fepiModal.classList.add('show')
}

function searchByPlate() {
    const value = plate.value
    value.replace('-', '')
    getRequest(`api/plate/${value}`)
}

function getRequest(route) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(req.responseText))
        }
    }
    req.open("GET", route, true)
    req.send()
}
