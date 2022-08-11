let userName = '';
let userSurname = '';
let userEmail = '';
let userYearOfBirth = '';

while (!userName) {
  userName = prompt('What is your name?');
  if (userName) userName = userName.trim();
}

while (!userSurname) {
  userSurname = prompt('What is your surname?');
  if (userSurname) userSurname = userSurname.trim();
}

while (!userEmail || !userEmail.includes('@') || userEmail.startsWith('@') || userEmail.endsWith('@')){
  userEmail = prompt('What is your email?');
  if (userEmail) userEmail = userEmail.replaceAll(' ', '').toLowerCase();
}

while (!userYearOfBirth) {
  userYearOfBirth = prompt('What year were you born in?');
  if (userYearOfBirth) userYearOfBirth = parseInt(userYearOfBirth.replaceAll(' ', ''));
}

const age = new Date().getFullYear() - userYearOfBirth;

document.write(`
  <ul>
    <li>Full name: ${userName} ${userSurname}</li>
    <li>Email: ${userEmail}</li>
    <li>Age: ${age}</li>
  </ul>
`);

