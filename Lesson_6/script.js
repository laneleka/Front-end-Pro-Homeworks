const AMOUNT_WORDS = 3;
let word;
let isValidWord;
let formatting;
let finalString = '';

const userQuestionGeneral = confirm('Tell me three most important words 💚');

if (userQuestionGeneral) {
  for (let i = 1; i <= AMOUNT_WORDS; i++) {
      do {
        word = prompt(`Enter word #${i}`);
        if (word) {
          for (let j = 0; j < word.length; j++) {
            if (!isNaN(word[j])) {
              isValidWord = false;
              break;
            }

            if (word.length - 1 === j) {
              isValidWord = true;
            }
          }

          if (!isValidWord) {
            continue;
          }

          while (!formatting || (formatting !== 'uppercase' && formatting !== 'lowercase' && formatting !== 'capitalize')) {
            formatting = prompt(`Choose your formating for ${word}: uppercase/lowercase/capitalize`, 'uppercase');

            if (formatting){
              formatting = formatting.replaceAll(' ', '').toLowerCase();

              switch (formatting){
                case 'uppercase':
                  word = word.toUpperCase();
                break;
    
                case 'lowercase': 
                  word = word.toLowerCase();
                break;
    
                case 'capitalize': 
                  word = word[0].toUpperCase() + word.slice(1).toLowerCase();
                break;
    
                default:
                  word = word[0].toUpperCase() + word.slice(1).toLowerCase();
               }
            }
          }

          formatting = '';

          if(i === AMOUNT_WORDS){
            word += '!';
            } else{
              word += ' ';
            }
          
        }
      } while (!isValidWord || !word);
      
      finalString += word;   
  }
}
    
console.log(finalString);