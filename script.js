const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")

const dayError = document.querySelector("#error-day")
const monthError = document.querySelector("#error-month")
const yearError = document.querySelector("#error-year")

const dayLabel = document.querySelector("#day-label")
const monthLabel = document.querySelector("#month-label")
const yearLabel = document.querySelector("#year-label")

const dayText = document.querySelector("#days-text")
const monthText = document.querySelector("#months-text")
const yearText = document.querySelector("#years-text")

const submitButton = document.querySelector("#submit-button")

dayInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length >= this.maxLength) {
        monthInput.focus()
    }
})
monthInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length >= this.maxLength) {
        yearInput.focus()
    }
})
yearInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length >= this.maxLength) {
        submitButton.focus()
    }
})

submitButton.addEventListener("click", function () {
    const isDateValid = validateDate()
    if (isDateValid) {
        const age = calculateAge(parseInt(dayInput.value), parseInt(monthInput.value), parseInt(yearInput.value))
        dayText.innerText = age.days
        monthText.innerText = age.months
        yearText.innerText = age.years
    } else {
        dayText.innerText = "--"
        monthText.innerText = "--"
        yearText.innerText = "--"
    }
})

const validateDate = () => {
    // reset all error message
    dayError.style.display = "none"
    monthError.style.display = "none"
    yearError.style.display = "none"

    dayInput.classList.remove("error")
    monthInput.classList.remove("error")
    yearInput.classList.remove("error")

    dayLabel.classList.remove("error")
    monthLabel.classList.remove("error")
    yearLabel.classList.remove("error")

    const isDateValid = {
        day: false,
        month: false,
        year: false
    }

    // VALIDATION FOR DAY
    if (dayInput.value === "") {
        dayError.innerHTML = "This field is required"
        dayError.style.display = "block"
        dayInput.classList.add("error")
        dayLabel.classList.add("error")
    } else if (isNaN(dayInput.value) || dayInput.value < 1 || dayInput.value > 31) {
        dayError.innerHTML = "Must be valid day"
        dayError.style.display = "block"
        dayInput.classList.add("error")
        dayLabel.classList.add("error")
    } else {
        isDateValid.day = true
    }

    // VALIDATION FOR MONTH
    if (monthInput.value === "") {
        monthError.innerHTML = "This field is required"
        monthError.style.display = "block"
        monthInput.classList.add("error")
        monthLabel.classList.add("error")
    } else if (isNaN(monthInput.value) || monthInput.value < 1 || monthInput.value > 12) {
        monthError.innerHTML = "Must be valid month"
        monthError.style.display = "block"
        monthInput.classList.add("error")
        monthLabel.classList.add("error")
    } else {
        isDateValid.month = true
    }

    // VALIDATION FOR YEAR
    if (yearInput.value === "") {
        yearError.innerHTML = "This field is required"
        yearError.style.display = "block"
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
    } else if (isNaN(yearInput.value) || yearInput.value.length !== 4 || yearInput.value > new Date().getFullYear()) {
        yearError.innerHTML = "Must be in the past"
        yearError.style.display = "block"
        yearInput.classList.add("error")
        yearLabel.classList.add("error")
    } else {
        isDateValid.year = true
    }

    // VALIDATE IF IT'S VALID DATE IN FEBRUARY
    if (monthInput.value == 2) {
        if (dayInput.value > 29) {
            dayError.innerHTML = "must be valid date"
            dayError.style.display = "block"
            dayInput.classList.add("error")
            dayLabel.classList.add("error")
            isDateValid.day = false
        } else {
            isDateValid.day = true
        }
    }
    const validDate = checkValidity(isDateValid)

    return validDate
}

function checkValidity(obj) {
    let countTrue = 0

    for (let key in obj) {
        if (obj[key] === true) {
            countTrue++
        }
    }

    if (countTrue === 3) {
        return true
    } else {
        return false
    }
}

function calculateAge(birthDay, birthMonth, birthYear) {
    const currentDate = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    // Calculate age in milliseconds
    const ageInMillis = currentDate - birthDate;

    // Convert milliseconds to years
    const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));

    // Calculate remaining milliseconds after whole years
    const remainingMillis = ageInMillis % (1000 * 60 * 60 * 24 * 365.25);

    // Convert remaining milliseconds to months
    const ageInMonths = Math.floor(remainingMillis / (1000 * 60 * 60 * 24 * 30.4375));

    // Calculate remaining days
    const remainingDays = Math.floor((remainingMillis % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

    return {
        years: ageInYears,
        months: ageInMonths,
        days: remainingDays
    };
}