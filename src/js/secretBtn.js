import img1 from '../assets/angular.png';
import img2 from '../assets/react.png';
import img3 from '../assets/vue.png';
const arr = [];

const secretBtn = () => {
  const btn = document.createElement('button');
  btn.style.backgroundColor = 'black';
  btn.style.color = 'white';
  btn.style.padding = '20px';
  btn.innerText = 'Не нажимай меня!';

  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img');
    arr.push(img);
  }

  const wrapper = document.createElement('div');
  const text = document.createElement('p');
  text.classList.add('text');
  text.innerText = 'Серьёзно?';

  document.body.appendChild(btn);
  document.body.appendChild(wrapper);

  const arr1 = [];

  btn.onclick = () => {
    btn.classList.toggle('active');

    const active = btn.classList.contains('active');

    if (active) {
      arr.map((i, idx) => {
        if (idx === 0) i.src = img1;
        if (idx === 1) i.src = img2;
        if (idx === 2) i.src = img3;
        wrapper.append(i);
        wrapper.append(text);
      });
    } else {
      wrapper.innerHTML = '';
    }

    setTimeout(() => {
      text.innerText = 'Вот и все!';
    }, 3000);
  };
};

export {secretBtn};
