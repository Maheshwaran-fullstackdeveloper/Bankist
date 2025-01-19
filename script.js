'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
//ACCOUNTS
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2023-11-18T21:21:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:11:04.504Z',
    '2024-04-01T10:17:24.185Z',
    '2024-10-06T14:11:59.604Z',
    '2024-10-08T17:01:17.194Z',
    '2024-10-12T20:26:17.929Z',
    '2024-10-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:13:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'de', //French
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account5 = {
  owner: 'Mahesh Waran',
  movements: [
    430, 1000, 700, 50, 90, 5000, 3400, -150, -790, -3210, -1000, 8500, -30,
    8400,
  ],
  interestRate: 2,
  pin: 1688,
  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-02-05T16:33:06.386Z',
    '2024-10-06T14:11:59.604Z',
    '2024-10-08T17:21:17.194Z',
    '2024-10-12T20:36:17.929Z',
    '2024-10-13T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-GB',
};

//ALL ACCOUNTS IN AN ARRAY
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//CURRENCIES
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//FUNCTIONS

function formatMovementDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) {
    const hour = `${date.getHours()}`.padStart(2, 0);
    const min = `${date.getMinutes()}`.padStart(2, 0);
    return `Today, ${hour}:${min}`;
  }
  if (daysPassed === 1) {
    const hour = `${date.getHours()}`.padStart(2, 0);
    const min = `${date.getMinutes()}`.padStart(2, 0);
    return `Yesterday, ${hour}:${min}`;
  }
  if (daysPassed <= 7) {
    const hour = `${date.getHours()}`.padStart(2, 0);
    const min = `${date.getMinutes()}`.padStart(2, 0);
    return `${daysPassed} days ago, ${hour}:${min}`;
  }
  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  const hour = `${date.getHours()}`.padStart(2, 0);
  const min = `${date.getMinutes()}`.padStart(2, 0);
  //return `${day}/${month}/${year}, ${hour}:${min}`;
  return `${new Intl.DateTimeFormat(locale).format(date)}, ${hour}:${min}`;
}

function updateMovements(val, acc) {
  const options = {
    style: 'currency',
    currency: acc.currency,
  };
  return new Intl.NumberFormat(acc.locale, options).format(val);
}

function formatCur(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);
  // console.log(combinedMovsDates);
  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;
  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? `deposit` : `withdrawal`;
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(movement, acc.locale, acc.currency);
    // const updatedMovements = updateMovements(mov, acc);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcBalance(accou) {
  accou.balance = accou.movements.reduce(function (acc, val) {
    return (acc += val);
  }, 0);
  const updatedMovements = updateMovements(accou.balance, accou);
  labelBalance.textContent = updatedMovements; //accou.balance.toFixed(2) + '€';
}

function dispIn(acc) {
  const calcIN = acc.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (acc, val) {
      return (acc += val);
    }, 0);
  const updatedMovements = updateMovements(calcIN, acc);
  labelSumIn.textContent = updatedMovements; //calcIN.toFixed(2) + '€';
}

function dispOut(acc) {
  const calcOUT = acc.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (acc, val) {
      return (acc += val);
    }, 0);
  const updatedMovements = updateMovements(Math.abs(calcOUT), acc);
  labelSumOut.textContent = updatedMovements; //Math.abs(calcOUT).toFixed(2) + '€';
}

function interest(acc) {
  const intr = acc.movements
    .filter(function (val) {
      return val > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (val) {
      return val > 1;
    })
    .reduce(function (acc, val) {
      return (acc += val);
    }, 0);
  const updatedMovements = updateMovements(intr, acc);
  labelSumInterest.textContent = updatedMovements; //intr.toFixed(2) + '€';
}

function createUserNames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
}
createUserNames(accounts);

function updateUI(acc) {
  displayMovements(acc);
  interest(acc);
  calcBalance(acc);
  dispIn(acc);
  dispOut(acc);
}

//EVENT HANDLERS
let currentAccount, timer;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin !== +inputLoginPin.value) {
    labelWelcome.textContent = `❌INVALID USERNAME OR PASSWORD❌`;
  }
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    //if (timer) clearInterval(timer);;
    setInterval(function () {
      const now = new Date();
      //const locale = navigator.language;
      const options = {
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        month: 'long',
        weekday: 'long',
      };

      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);
    }, 1);
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

// const time = new Date();
// const year = time.getFullYear();
// const month = `${time.getMonth() + 1}`.padStart(2, 0);
// const date = `${time.getDate()}`.padStart(2, 0);
// const hour = `${time.getHours()}`.padStart(2, 0);
// const min = `${time.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${date}/${month}/${year}, ${hour}:${min}`;

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferTo.blur();
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amt = Math.floor(inputLoanAmount.value);
  if (amt > 0 && currentAccount.movements.some(mov => mov >= amt * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amt);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 10000);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  clearInterval(timer);
  timer = startLogOutTimer();
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

function startLogOutTimer() {
  let time = 120;
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
      clearInterval(timer);
    }
    time--;
  }
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}
/////////////////////////////////////////////////

// const movementsDesc = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} : You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDesc);
// const movementsDescriptions = movements.map(function (mov, i) {
//   return `Movement ${
//     i + 1
//   } : You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
// });

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

// const maxValue = movements.reduce(function (acc, val) {
//   if (val > acc) {
//     acc = val;
//   }
//   return acc;
// }, movements[0]);
// console.log(maxValue);

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog + 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// function checkDogs(dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, 3);
//   const totalDogs = dogsJuliaCorrected.concat(dogsKate);
//   totalDogs.forEach(function (age, i) {
//     const type = age >= 3 ? 'Adult' : 'Puppy';
//     const text = `Dog number ${i + 1} is an ${type}, and is ${age} years old`;
//     console.log(text);
//   });
// }
// checkDogs(dogsJulia, dogsKate);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function calcAverageHumanAge(dogAge) {
//   const humanAge = dogAge.map(function (age) {
//     return age <= 2 ? 2 * age : 16 + age * 4;
//   });
//   const adultDogs = humanAge.filter(function (ageA) {
//     return ageA >= 18;
//   });
//   const averageAge = adultDogs.reduce(function (acc, val) {
//     return (acc += val / adultDogs.length);
//   }, 0);
//   console.log(averageAge);
// }
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') {
//     console.log(account);
//   }
// }
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// accounts.forEach(function (account) {
//   if ((account.owner === 'Jessica Davis')) {
//     console.log(account);
//   }
// });

//PRACTICE ARRAY METHODS
//1. Deposits sum
// const depositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce(function (accu, acc) {
//     return (accu += acc);
//   }, 0);
// console.log(depositSum);

// //2.deposits > 1000
// const deposit1K = accounts
//   .flatMap(acc => acc.movements)
//   .filter(acc => acc >= 1000).length;
// console.log(deposit1K);

// //using rerduce method
// const deposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => (mov >= 1000 ? acc + 1 : acc), 0);
// console.log(deposit1000);

// //3. Total withdrawal and deposits
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, mov) => {
//       mov > 0 ? (acc.deposits += mov) : (acc.withdrawals += mov);
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(sums);

// //4. Titlecasing
// function titleCasing(title) {
//   const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');
//   return titleCase;
// }
// console.log(titleCasing('hello guys this is mahesh'));

///////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// //1
// dogs.forEach(
//   dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
// );
// console.log(dogs);

// //2
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   `Sarah's dog is eating too ${
//     sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
//   }`
// );

// //3
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recommendedFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recommendedFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// //4
// // console.log(
// //   `"${ownersEatTooMuch[0]} and ${ownersEatTooLittle[0]} and ${ownersEatTooLittle[1]}'s dogs eat too much!" and "${ownersEatTooMuch[1]} and ${ownersEatTooMuch[2]} and ${ownersEatTooLittle[2]}'s dogs eat too little!"`
// // );
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// //5
// const correctFood = dogs.some(dog => dog.curFood == dog.recommendedFood);
// console.log(correctFood);

// //6
// const okFood = dogs.some(
//   dog =>
//     dog.curFood > dog.recommendedFood * 0.9 &&
//     dog.curFood < dog.recommendedFood * 1.1
// );
// console.log(okFood);

// //7
// console.log(
//   dogs.filter(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// //8
// const dogsSorted = dogs
//   .slice()
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);
//   console.log(dogsSorted);
