let addBtn = () => {
  let body = document.querySelector('body');
  let btn = document.createElement('button');
  btn.innerText = '刘德樟';
  body.appendChild(btn);

  let div = document.createElement('div');
  body.appendChild(div);
  div.setAttribute('class', 'one');
  let one = document.querySelector('.one');
  one.style.height = '300px'
  one.style.width = '300px'
  one.style.backgroundColor = 'red'
  one.style.margin = '100px auto'

  btn.addEventListener('click', function () {
    let value = this.innerText;
    // alert(value)
    one.style.backgroundColor = 'black';
  })

}

module.exports = {
  addBtn
}
