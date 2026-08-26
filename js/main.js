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
    collected: 65600,
    target: 1600000
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
// COPY PAYMENT REQUISITES
// ========================================

const copyRequisitesButton =
    document.querySelector('#copyRequisites');

const copyRequisitesStatus =
    document.querySelector('#copyRequisitesStatus');

const requisites =
    document.querySelectorAll('.requisites__row');


function getRequisitesText() {
    return Array.from(requisites)
        .map((row) => {
            const label =
                row.querySelector('dt')
                    ?.textContent
                    .trim();

            const value =
                row.querySelector('dd')
                    ?.textContent
                    .trim();

            return `${label}: ${value}`;
        })
        .join('\n');
}


copyRequisitesButton?.addEventListener(
    'click',
    async () => {

        const text =
            getRequisitesText();

        try {
            await navigator.clipboard.writeText(text);

            if (copyRequisitesStatus) {
                copyRequisitesStatus.textContent =
                    'Реквизиты скопированы';
            }

            copyRequisitesButton.textContent =
                'Скопировано ✓';


            setTimeout(() => {
                copyRequisitesButton.textContent =
                    'Скопировать реквизиты';

                if (copyRequisitesStatus) {
                    copyRequisitesStatus.textContent =
                        '';
                }
            }, 2500);

        } catch (error) {

            if (copyRequisitesStatus) {
                copyRequisitesStatus.textContent =
                    'Не удалось скопировать реквизиты';
            }

            console.error(
                'Clipboard error:',
                error
            );
        }
    }
);