import "./assets/css/index.css";

console.log(111);

const sum = (...array) => {
  return array.filter(Boolean);
};

[1, 2, 3].reduce((cur, next) => {
  return cur + next;
}, 0);
