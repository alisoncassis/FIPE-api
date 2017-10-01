const btnBudget = document.querySelector('#btn_budget')
const fipeModal = document.querySelector('.fipe-modal')
const plate = document.querySelector('#plate')
const brand = document.querySelector('#brand')
const brandList = document.querySelector('#brand_list')
const modelList = document.querySelector('#model_list')
const year = document.querySelector('#year')
const model = document.querySelector('#model')
const wrapperBudget = document.querySelector('.wrapperBudget')
const wrapperSearch = document.querySelector('.wrapperSearch')
const wrapperData = document.querySelector('.wrapperData')
const btnSearch = document.querySelector('#btn_search')
const btnBack = document.querySelector('#btn_back')
const btnCancel = document.querySelector('#btn_cancel')
const btnVehicleData = document.querySelector('#btn_vehicle_data')
const typeSearch = document.querySelector('.type-search')
const vehicleData = document.querySelector('.vehicle-data')
const snackbar = document.querySelector('.snackbar')
const params = {
    vehicle: '',
    brands: '',
    models: ''
}

window.onload = function() {
    plate.onchange = searchByPlate
    btnBudget.onclick = showFIPEModal
    btnCancel.onclick = hideFIPEModal
    btnSearch.onclick = searchByPlate
    btnBack.onclick = hideVehicleDataModal
    btnVehicleData.onclick = showVehicleDataModal
    getRequest('api/brands', 'brands', mountBrands)
    brand.onchange = mountModels
}

function showFIPEModal() {
    fipeModal.classList.add('show')
    wrapperBudget.classList.add('hide')
    wrapperSearch.classList.add('show')
}

function hideFIPEModal() {
    fipeModal.classList.remove('show')
    wrapperBudget.classList.remove('hide')
    wrapperSearch.classList.remove('show')
    plate.value = ''
}

function mountBrands() {
    params.brands.forEach((brand) => {
        brandList.appendChild(new Option(brand.name, brand.name, false))
    })
}
function mountModels() {
    model.value = ''
    while(modelList.hasChildNodes()) {
        modelList.removeChild(modelList.firstChild);
    }
    model.removeAttribute('disabled')
    const brandSearch = params.brands.filter(arrBrand => arrBrand.name == brand.value)
    getRequest(`api/models?brand=${brandSearch[0].id}`, 'models', mountModelsOptions)
}

function mountModelsOptions() {
    params.models.forEach((model) => {
        modelList.appendChild(new Option(model.name, model.name, false))
    })
}

function getRequest(route, context, fn) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            params[context] = JSON.parse(req.responseText)
            fn()
        }
    }
    req.open("GET", route, true)
    req.send()
}

function cleanVehicleData() {
    brand.value = ''
    model.value = ''
    model.setAttribute('disabled', 'disabled')
    year.value = ''
    while(modelList.hasChildNodes()) {
        modelList.removeChild(modelList.firstChild);
    }
}

function showVehicleDataModal() {
    typeSearch.classList.add('hide')
    vehicleData.classList.add('show')
    wrapperSearch.classList.remove('show')
    wrapperData.classList.add('show')
}

function hideVehicleDataModal() {
    typeSearch.classList.remove('hide')
    vehicleData.classList.remove('show')
    wrapperSearch.classList.add('show')
    wrapperData.classList.remove('show')
    cleanVehicleData()
}

function searchByPlate() {
    const value = plate.value.toUpperCase().replace('-', '')
    getRequest(`api/plates/${value}`, 'vehicle', vehicleResponse)
}

function snackbarAnimation() {
    snackbar.classList.add('show')
    setTimeout(() => {
        return snackbar.classList.remove('show')
    }, 2000);
}

function fillVechicleData() {
    const str = params.vehicle.marca
    brand.value = str.substr(0,str.indexOf(' '))
    model.value = str.substr(str.indexOf(' ')+1)
    year.value = params.vehicle.ano
    model.removeAttribute('disabled')
}

function vehicleResponse() {
    //api retorna 1 quando dá erro...
    if(params.vehicle.codigoRetorno == 1) {
        snackbarAnimation()
    } else {
        fillVechicleData()
        btnSearch.click()
    }
}
