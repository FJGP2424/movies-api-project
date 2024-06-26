const inputName = document.querySelector('.js_name');
const inputEmail = document.querySelector('.js_email');
const inputPassword = document.querySelector('.js_password');
const inputBtn = document.querySelector('.js_btn');
const p = document.querySelector('.js_result');

const handleClick = () => {
  const user = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };

  //Permite hacer peticiones al servidor
  fetch('https://proyecto-node-vercel.onrender.com/user/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!data.success) {
        p.innerHTML = data.message;
      } else {
        p.innerHTML = 'Registrado con éxito';
      }
    });
};

inputBtn.addEventListener('click', handleClick);
