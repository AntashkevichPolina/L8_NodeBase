const bcrypt = require('bcrypt');

const passwords = [
  'password1', 'password2', 'password3', 'password4',
  'password5', 'password6', 'password7', 'password8',
  'password9', 'password10', 'password11', 'password12',
  'password13'
];

const SALT_ROUNDS = 10;

(async () => {
  console.time('bcrypt time');

  for (let i = 0; i < passwords.length; i++) {
    const hash = await bcrypt.hash(passwords[i], SALT_ROUNDS);
    console.log(`Пароль ${i + 1}:`, hash);
  }

  console.timeEnd('bcrypt time');
})();
