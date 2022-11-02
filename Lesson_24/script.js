const userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}



const userDataCurrency = Object.keys(userData);

const getValidCurrency = value => value.trim().toUpperCase();

const getAvailableCurrency = (userDataCurrency, bankData) => {
    const arrayAvailableCur = [];

    userDataCurrency.forEach((key) => {

        if (bankData[key] && bankData[key].max > 0) {
            arrayAvailableCur.push(key);
        }
    });

    return arrayAvailableCur;
}

const getMoney = () => {
    return new Promise((resolve, reject) => {
        confirm('Do you want to see the card balance?') ? resolve() : reject();
    })
}

getMoney()
    .then(
        () => {
            let userBalanceCurrency = '';

            do {
                userBalanceCurrency = prompt(`Please, enter currency you would like: ${userDataCurrency.join(', ')}`, 'USD');

                if (userBalanceCurrency) {
                    userBalanceCurrency = getValidCurrency(userBalanceCurrency);
                }

            } while (!userBalanceCurrency || !userDataCurrency.includes(userBalanceCurrency));

            console.log(`Your balance is: ${userData[userBalanceCurrency]} ${userBalanceCurrency}`);
        }
    )

    .catch(
        () => {
            let userCurrencyWithdrawal = '';
            const availableCurrency = getAvailableCurrency(userDataCurrency, bankData);

            do {
                userCurrencyWithdrawal = prompt(`Please, enter currency you would like to withdrawal: ${availableCurrency.join(', ')}`, 'USD');

                if (userCurrencyWithdrawal) {
                    userCurrencyWithdrawal = getValidCurrency(userCurrencyWithdrawal)
                }

            } while (!userCurrencyWithdrawal || !availableCurrency.includes(userCurrencyWithdrawal));

            let userCurAmountWithdrawal = '';

            do {
                userCurAmountWithdrawal = +prompt(`Please, enter amount of ${userCurrencyWithdrawal} you would like to withdrawal`, '50');
            } while (!userCurAmountWithdrawal);

            const maxBankAmount = bankData[userCurrencyWithdrawal].max;
            const minBankAmount = bankData[userCurrencyWithdrawal].min;
            const userAmount = userData[userCurrencyWithdrawal];

            if (userCurAmountWithdrawal > maxBankAmount || userCurAmountWithdrawal > userAmount) {
                console.log(`Your amount is more than available. The maximum amount of withdrawal: ${(maxBankAmount > userAmount) ? userAmount : maxBankAmount} ${userCurrencyWithdrawal}`);
                return;
            }

            if (userCurAmountWithdrawal < minBankAmount) {
                console.log(`Your amount is less than available. The minimum amount of money withdrawal: ${minBankAmount} ${userCurrencyWithdrawal}`);
                return;
            }

            console.log(`Here's your money ${userCurAmountWithdrawal} ${userCurrencyWithdrawal} ${bankData[userCurrencyWithdrawal].img}`);
        }
    )

    .finally(
        () => {
            console.log('Thank you, have a good day! 😊');
        }
    )
