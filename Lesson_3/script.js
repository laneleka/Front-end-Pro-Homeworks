const ONE_HUNDRED_PERCENT = 100;
const date = new Date(); 
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

let captionString = `Food prices ≠ ${day}.${month}.${year}\n\n`,
    apple = `🍎`,
    applePrice = 10,
    appleCount = 3,
    appleSalePercent = 7,

    orange = `🍊`,
    orangePrice = 12,
    orangeCount = 2,
    orangeSalePercent = 3,

    kiwi = `🥝`,
    kiwiPrice = 15,
    kiwiCount = 10,
    kiwiCountryPercent = 10;

captionString = captionString.replace(`≠`, `-`);

let applePriceWithSale = applePrice - applePrice * (appleSalePercent / ONE_HUNDRED_PERCENT);
let applePriceSum = +(applePriceWithSale * appleCount).toFixed();
captionString += `Final price for ${appleCount} ${apple} = ${applePriceSum} UAH\n`;

let orangePriceWithSale = orangePrice - orangePrice * (orangeSalePercent / ONE_HUNDRED_PERCENT);
let orangePriceSum = +(orangePriceWithSale * orangeCount).toFixed();
captionString += `Final price for ${orangeCount} ${orange} = ${orangePriceSum} UAH\n`;

let kiwiPriceWithCountryPercent = kiwiPrice + kiwiPrice * (kiwiCountryPercent / ONE_HUNDRED_PERCENT);
let kiwiPriceSum = +(kiwiPriceWithCountryPercent * kiwiCount).toFixed();
captionString += `Final price for ${kiwiCount} ${kiwi} = ${kiwiPriceSum} UAH\n\n`;


let FinalPriceForAll = applePriceSum + orangePriceSum + kiwiPriceSum;
captionString += `Final price for all products = ${FinalPriceForAll} UAH`;

console.log(captionString);
