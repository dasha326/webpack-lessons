const keyHandler = () => {
  const elem = document.createElement('span');
  elem.classList.add('.hit');
  document.body.appendChild(elem);

  let result = 0;

  document.body.onkeyup = (evt) => {
    if ((evt.code == 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)) {
      result++;
    }

    elem.innerHTML = result;
  };
};

export default keyHandler;
