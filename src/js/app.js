// Declarando variables del form de registro
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const btnSignUp = document.getElementById('sign-up');
// Declarando variables del form de inicio de sesión
const userEmail = document.getElementById('user-email');
const userPassword = document.getElementById('user-password');
const userEmailError = document.getElementById('user-email-error');
const userPasswordError = document.getElementById('user-password-error');
const btnSignIn = document.getElementById('sign-in');
// Botones de registro con proveedor
const btnFb = document.getElementById('fbBtn');
const btnGoogle = document.getElementById('btnGoogle');
const usernameModal = document.getElementById('username-modal');
const usernameWithProvider = document.getElementById('username-with-provider');
const usernameWithProviderError = document.getElementById('username-with-provider-error');
const signInWithProvider = document.getElementById('signin-with-provider');
// Mostrando en la UI estado de validación de nombre de usuario
username.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    usernameError.innerText = 'Escribe un nombre que contenga entre 3 y 15 letras mayúsculas o minúsculas.';
    usernameError.classList.remove('hide');
    username.classList.add('invalid');
  } else {
    usernameError.classList.add('hide');
    username.classList.replace('invalid', 'valid');
  }
});
usernameWithProvider.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    usernameWithProviderError.innerText = 'Escribe un nombre que contenga entre 3 y 15 letras mayúsculas o minúsculas.';
    usernameWithProviderError.classList.remove('hide');
    usernameWithProvider.classList.add('invalid');
  } else {
    usernameWithProviderError.classList.add('hide');
    usernameWithProvider.classList.replace('invalid', 'valid');
  }
});
// Mostrando en la UI estado de validación de correo eléctrónico
email.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    emailError.innerText = 'Introduce un correo electrónico válido.';
    emailError.classList.remove('hide');
    email.classList.add('invalid');
  } else {
    emailError.classList.add('hide');
    email.classList.replace('invalid', 'valid');
  }
});
userEmail.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    userEmailError.innerText = 'Introduce un correo electrónico válido.';
    userEmailError.classList.remove('hide');
    userEmail.classList.add('invalid');
  } else {
    userEmailError.classList.add('hide');
    userEmail.classList.replace('invalid', 'valid');
  }
});
// Mostrando en la UI estado de validación de contraseña
password.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    passwordError.innerText = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
    passwordError.classList.remove('hide');
    password.classList.add('invalid');
  } else {
    passwordError.classList.add('hide');
    password.classList.replace('invalid', 'valid');
  }
});
// Mostrando en la UI estado de validación de contraseña
userPassword.addEventListener('change', (event) => {
  if (!validate(event.target)) {
    userPasswordError.innerText = 'Tu contraseña debe tener 6 caracteres como mínimo, entre letras y números.';
    userPasswordError.classList.remove('hide');
    userPassword.classList.add('invalid');
  } else {
    userPasswordError.classList.add('hide');
    userPassword.classList.replace('invalid', 'valid');
  }
});

// Regitra usuario si inputs son válidos
btnSignUp.addEventListener('click', () => {
  if (validate(username) && validate(email) && validate(password)) {
    emailSignUp(email.value, password.value)
      .then(({ user }) => saveUser(user, username.value))
      .then(() => window.location.replace('home.html'))
      .catch((error) => {
        console.log(error)
        if ( error.code === auth/user-not-found) {

        }
      });
  }
});
// Evento sign-in con correo y contraseña de usuario ya registrado
btnSignIn.addEventListener('click', () => {
  if (validate(userEmail) && validate(userPassword)) {
    emailSignIn(userEmail.value, userPassword.value)
      .then(() => window.location.replace('home.html'))
      .catch((error) => {
        console.log(error);
      });
  }
});

const processUser = (additionalUserInfo, user) => {
  const { isNewUser } = additionalUserInfo;
  if (isNewUser) {
    usernameModal.classList.add('modal-block');
    signInWithProvider.addEventListener('click', () => {
      if (validate(usernameWithProvider)) {
        saveUser(user, usernameWithProvider.value)
          .then(() => {
            window.location.replace('home.html');
          });
      }
    });
  } else {
    window.location.replace('home.html');
  }
};

// Evento sign-in con Facebook
btnFb.addEventListener('click', () => {
  fbSignIn()
    .then(({ additionalUserInfo, user }) => processUser(additionalUserInfo, user))
    .catch((error) => {
      const {
        code, message,
      } = error;
      console.log(code, message);
    });
});
// Evento sign-in con Google
btnGoogle.addEventListener('click', () => {
  googleSignIn()
    .then(({ additionalUserInfo, user }) => processUser(additionalUserInfo, user))
    .catch((error) => {
      const {
        code, message, mail, credential,
      } = error;
      console.log(code, message, mail, credential);
    });
});
