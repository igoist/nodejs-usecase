const flag = true;

const id = setTimeout(() => {
  console.log('the flag is not true');
}, 2000);

const id2 = setInterval(() => {
  console.log('id2...');
}, 600);

if (flag) {
  clearTimeout(id);
  clearInterval(id2);
}

setTimeout(() => {
  console.log('id2: ', id2);
  clearInterval(id2);
}, 3000);