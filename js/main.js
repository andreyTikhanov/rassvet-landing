const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('navigation--open');

        menuButton.setAttribute(
            'aria-expanded',
            String(isOpen)
        );
    });
}


// Закрываем мобильное меню после выбора пункта
const navigationLinks = document.querySelectorAll('.navigation a');

navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navigation?.classList.remove('navigation--open');

        menuButton?.setAttribute(
            'aria-expanded',
            'false'
        );
    });
});


// ========================================
// Временные данные прогресс-бара
// Потом будем получать их с backend/API
// ========================================

const fundraising = {
    collected: 624500,
    target: 1600000,
    donors: 418
};

const collectedAmountElement =
    document.querySelector('#collectedAmount');

const targetAmountElement =
    document.querySelector('#targetAmount');

const progressBar =
    document.querySelector('#progressBar');

const progress =
    document.querySelector('.progress');

const bigCollectedAmountElement =
    document.querySelector('#bigCollectedAmount');

const bigTargetAmountElement =
    document.querySelector('#bigTargetAmount');

const bigProgressBar =
    document.querySelector('#bigProgressBar');

const bigProgress =
    document.querySelector('#bigProgress');

const progressPercent =
    document.querySelector('#progressPercent');

const donorCount =
    document.querySelector('#donorCount');


function formatMoney(value) {
    return new Intl.NumberFormat('ru-RU')
        .format(value);
}


function updateFundraisingProgress() {
    const percentage = Math.min(
        (fundraising.collected / fundraising.target) * 100,
        100
    );

    const roundedPercentage =
        Math.round(percentage);


    // Header

    if (collectedAmountElement) {
        collectedAmountElement.textContent =
            formatMoney(fundraising.collected);
    }

    if (targetAmountElement) {
        targetAmountElement.textContent =
            formatMoney(fundraising.target);
    }

    if (progressBar) {
        progressBar.style.width =
            `${percentage}%`;
    }

    if (progress) {
        progress.setAttribute(
            'aria-valuenow',
            String(roundedPercentage)
        );
    }


    // Big progress section

    if (bigCollectedAmountElement) {
        bigCollectedAmountElement.textContent =
            formatMoney(fundraising.collected);
    }

    if (bigTargetAmountElement) {
        bigTargetAmountElement.textContent =
            formatMoney(fundraising.target);
    }

    if (bigProgressBar) {
        bigProgressBar.style.width =
            `${percentage}%`;
    }

    if (bigProgress) {
        bigProgress.setAttribute(
            'aria-valuenow',
            String(roundedPercentage)
        );
    }

    if (progressPercent) {
        progressPercent.textContent =
            `${roundedPercentage}%`;
    }

    if (donorCount) {
        donorCount.textContent =
            formatMoney(fundraising.donors);
    }
}


updateFundraisingProgress();

// ========================================
// DONATION FORM
// ========================================

const donationForm = document.querySelector('#donationForm');

const amountRadios = document.querySelectorAll(
    'input[name="amount"]'
);

const customAmount =
    document.querySelector('#customAmount');

const amountError =
    document.querySelector('#amountError');


function hideAmountError() {
    if (amountError) {
        amountError.hidden = true;
    }
}


amountRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        if (radio.checked && customAmount) {
            customAmount.value = radio.value;
        }

        hideAmountError();
    });
});


customAmount?.addEventListener('input', () => {
    const value = customAmount.value.trim();

    amountRadios.forEach((radio) => {
        radio.checked =
            value !== '' &&
            radio.value === value;
    });

    hideAmountError();
});

donationForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedAmount =
        document.querySelector(
            'input[name="amount"]:checked'
        );

    const customValue =
        Number(customAmount?.value || 0);

    if (!selectedAmount && customValue <= 0) {
        if (amountError) {
            amountError.hidden = false;
        }

        customAmount?.focus();

        return;
    }

    /*
     * TODO:
     * Здесь позже будет запрос к PHP backend
     * и создание платежа.
     */

    console.log('Форма прошла frontend-проверку');
});