import { useState } from 'react';

type PropsForm = {
  handleCadastrar: () => void;
};

// type estadoInicial = {
//  nameService: string;
//  login: string;
//  password: string;
//  url: string;
// };

function Form({ handleCadastrar }: PropsForm) {
  const [nameService, setnameService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setpassword] = useState('');
  const [url, setUrl] = useState('');

  // req4 - Validação dos campos do formulário----------------------------------------------------------------------------------------------
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  // Verifica se a string não está vazia
  const stringValid = (value: string) => value !== '';
  // Verifica se todos os campos do formulário são válidos
  const validEverthing = stringValid(nameService) && stringValid(login);

  // Verifica se a senha atende a todas as condições
  const isPasswordValid = () => {
    const passwordMin = password.length >= 8;
    const passwordMax = password.length <= 16;
    const hasNumberandLetters = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    const caracteresEspeciais = /\W|_/.test(password); // https://pt.stackoverflow.com/questions/342605/verificar-a-exist%C3%AAncia-de-caracteres-especiais-em-uma-string-utilizando-regexp

    return (
      passwordMin
      && passwordMax
      && hasNumberandLetters
      && caracteresEspeciais
    );
  };

  // Verifica se os campos do formulário são válidos
  const isFormValid = () => {
    const nameMin = stringValid(nameService);
    const loginMin = stringValid(login);
    const urlMin = stringValid(url);
    const passwordValid = isPasswordValid();

    return (
      nameMin
      && loginMin
      && urlMin
      && passwordValid
    );
  };
  // evitar o comportamento padrão
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validEverthing) { // se for true = campos preenchidos validados ok = enviados
      resetForm();
    }
  }
  // reseta os campos o formulário para os valores iniciais
  function resetForm() {
    setnameService('');
    setLogin('');
    setpassword('');
    setUrl('');
  }
  // atualizar o estado password
  function handleTargetPassword({ target }: React.ChangeEvent<HTMLInputElement>) {
    setpassword(target.value);
  }

  // req2 - form
  // req 4 - botao - isFormValid -> true: o botão será habilitado
  // req 5 - display para a validação da senha------------------------------------------------------------------------------------------------
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="nameService">Nome do Serviço</label>
      <input
        id="nameService"
        type="text"
        value={ nameService }
        onChange={ handleTargetPassword }
      />

      <label htmlFor="login">Login</label>
      <input
        id="login"
        type="text"
        value={ login }
        onChange={ ({ target }) => setLogin(target.value) }
      />

      <label htmlFor="password">Senha</label>
      <input
        id="password"
        type="password"
        value={ password }
        onChange={ ({ target }) => setpassword(target.value) }
      />

      <label htmlFor="url">URL</label>
      <input
        id="url"
        type="text"
        value={ url }
        onChange={ ({ target }) => setUrl(target.value) }
      />

      <div className="password-validation">
        <p className={ password.length >= 8 ? valid : invalid }>
          Possuir 8 ou mais caracteres
        </p>
        <p className={ password.length <= 16 ? valid : invalid }>
          Possuir até 16 caracteres
        </p>
        <p className={ /[0-9]/.test(password) && /[a-zA-Z]/.test(password) ? valid : invalid }>
          Possuir letras e números
        </p>
        <p className={ /\W|_/.test(password) ? valid : invalid }>
          Possuir algum caractere especial
        </p>
      </div>

      <button type="submit" disabled={ !validEverthing || !isFormValid() }>
        Cadastrar
      </button>
      <button type="button" onClick={ handleCadastrar }>
        Cancelar
      </button>
    </form>
  );
}
export default Form;
