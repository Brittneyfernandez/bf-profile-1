let paramString = location.href.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
   console.log("Key is: " + pair[0]);
   console.log("Value is: " + pair[1]);
}

console.log(queryString.get('file'));

const img = document.querySelector('img');
img.src = `../img/${queryString.get('file')}`;

const p = document.querySelector('p');
p.textContent = queryString.get('file');

document.addEventListener('click', () => {
   // back to last page
   window.history.back();
})