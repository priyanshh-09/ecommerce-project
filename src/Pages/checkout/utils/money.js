export function formatMoney(amount){
   return `$${(Number(amount)/ 100).toFixed(2)}`
}

// export function formatMoney(cents) {
//   return `$${(Number(cents) / 100).toFixed(2)}`;
// }