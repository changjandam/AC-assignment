const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users'

const userList = []

const dataPanel = document.querySelector('#data-panel')

function renderUserList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
      <div class="col-auto">
        <img src=${item.avatar} alt="" class="rounded border border-dark" data-toggle="modal"
data-target="#user-modal" data-id=${item.id}>
        <p>${item.name}</p>
      </div>
    `
  });
  dataPanel.innerHTML = rawHTML
}

axios.get(BASE_URL)
  .then(response => {
    userList.push(...response.data.results)
    renderUserList(userList)

  })
  .catch((err) => console.log(err))

function changeModalData(id) {
  const userTitle = document.querySelector('#user-modal-title')
  const userImage = document.querySelector('#user-modal-img')
  const userEmail = document.querySelector('#user-modal-email')
  axios.get(BASE_URL + "/" + id)
    .then(response => {
      userTitle.innerHTML = response.data.name
      userImage.src = response.data.avatar
      userEmail.innerHTML = "E-mail:" + response.data.email


    })
}

dataPanel.addEventListener('click', function userImageClicked(event) {
  changeModalData(event.target.dataset.id)
})

const genderFilter = document.querySelector('#genderFilter')
let genderSelector = "all gender"

genderFilter.addEventListener('click', function searchBarBtnclicked(event) {

  if (event.target.className === "dropdown-item") {
    genderSelector = event.target.innerText
    document.querySelector('#gender').innerText = genderSelector
    genderSelector = genderSelector.toLocaleLowerCase()
    console.log(genderSelector)
  }
  renderUserList(userList.filter(filterUser).filter(filterGender))
})

const inputBar = document.querySelector('#inputBar')
const userNameInput = document.querySelector('#userNameInput')

inputBar.addEventListener("submit", function searchUser(event) {
  event.preventDefault()
  console.log(userNameInput.value)

  renderUserList(userList.filter(filterUser).filter(filterGender))
})

function filterGender(user) {
  if (genderSelector === "all gender") {
    return user
  }
  else {
    return user.gender === genderSelector
  }
}

function filterUser(user) {

  return user.name.toLocaleLowerCase().includes(userNameInput.value)


}
