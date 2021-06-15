const technologiesSelect = document.querySelector('#calculator-form-technologies')

const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ',',
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: 'No available options',
  itemSelectText: 'Click to select',
  classNames: {
    containerInner: 'choices__inner tech-input-container',
    input: 'choices__input',
  },
})

calculateSum()

const calculatorForm = document.querySelector('.calculator-form')

calculatorForm.addEventListener('submit', (event) => {
  event.preventDefault()
  calculateSum()
})
function calculateSum() {
  // Selectors
  const websiteTypeSelect = document.querySelector('#calculator-form-website-type')
  const websitCard = document.querySelector('#calculator-form-input-radio-container-card input:checked')
  const websitReception = document.querySelector('#calculator-form-input-radio-container-reception input:checked')

  // Values
  const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value)
  const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue())
  const websitCardValue = convertCartOptionToPrice(websitCard.value)
  const websitReceptionValue = convertReceptionOptionToPrice(websitReception.value)

  const totalSum = websiteTypeValue + technologiesValue + websitCardValue + websitReceptionValue

  renderSum(totalSum)
}

function renderSum(sum) {
  const costElement = document.querySelector('.calculator-total-form-cost')

  costElement.innerText = 'Calculating...'

  setTimeout(function () {
    costElement.innerText = sum + '$'
  }, 2000)
}

function getTechnologiesSum(technologiesArr) {
  let totalSum = 0

  technologiesArr.forEach(function (tech) {
    totalSum += +extractPriceFromValue(tech.value)
  })

  return totalSum
}

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/)

  if (price) {
    return Number(price[0].slice(1)) || 0
  }

  return 0
}

function convertCartOptionToPrice(option) {
  if (option === 'yes') {
    return 300
  }

  return 0
}

function convertReceptionOptionToPrice(option) {
  if (option === 'yes') {
    return 500
  }

  return 0
}
