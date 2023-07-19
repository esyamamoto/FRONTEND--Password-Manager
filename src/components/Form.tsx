import { useState } from 'react';

type EstadoInicial = {
  url: string;
  nameService: string;
  login: string;
  password: string;
};

export default function Form() {
  const [nameService, setnameService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [formVisible, setformVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [infos, setInfos] = useState<EstadoInicial[]>([]);
  const [hidePassword, setHidePassword] = useState(false); // senhas começam mostrando
  const [typePassword, setTypePassword] = useState('password');

  // form ta visivel ou nao
  const handleCadastrarButton = () => {
    setformVisible(true);
  };

  const handleCancelarButton = () => {
    setformVisible(false);
  };

  // evento enviar o form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: EstadoInicial = {
      nameService,
      login,
      password,
      url,
    };
    setInfos([newService, ...infos.slice().reverse()]);
    setformVisible(false);
    resetForm();
  };

  // remove um serviço da lista de informações
  const deleteService = (index: number) => {
    const updatedinfos = [...infos]; // atribuir a nova variavel para nao perder o estado inicial
    updatedinfos.splice(index, 1); // pode ser filter?
    setInfos(updatedinfos);
  };
  // CHECKBOX -- visivel ou nao a senha
  const passwordHideorNot = () => {
    setHidePassword(!hidePassword);
  };
  // senha ta visivel como text ou nao visivel como password
  const passwordType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  };
  // requisitos senha e login
  // Verifica se a string não está vazia
  const stringValid = (value: string) => value !== '';
  // Verifica se login e  nome sao validos
  const validEverthing = stringValid(nameService) && stringValid(login);
  // requisição senha
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
  // verifica login, nome e a senha
  const isFormValid = () => {
    setFormValid(validEverthing && isPasswordValid);
  };

  // req4 - Validação dos campos do formulário
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const resetForm = () => {
    setnameService('');
    setLogin('');
    setPassword('');
    setUrl('');
    setTypePassword('password');
  };

  // atualizar o estado password
  const handleTargetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    isFormValid();
  };

  // req2 - form
  // req 4 - botao - isFormValid -> true: o botão será habilitado
  // req 5 - display para a validação da senha-----------------------------------------------
  return (
    <div>
      {formVisible ? (
        <form>
          <label htmlFor="nameService">Nome do Serviço</label>
          <input
            id="nameService"
            type="text"
            value={ nameService }
            onChange={ ({ target }) => setnameService(target.value) }
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
            type={ typePassword }
            value={ password }
            onChange={ handleTargetPassword }
          />

          <button
            data-testid="show-hide-form-password"
            onClick={ passwordType }
          >
            Mostrar/Esconder senha
          </button>

          <div>
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

          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={ url }
            onChange={ ({ target }) => setUrl(target.value) }
          />

          <button type="submit" disabled={ !formValid } onClick={ handleSubmit }>
            Cadastrar
          </button>
          <button onClick={ handleCancelarButton }>Cancelar</button>
        </form>
      ) : (
        <>
          <label htmlFor="hidePassword">
            <input
              type="checkbox"
              id="hidePassword"
              checked={ hidePassword }
              onChange={ passwordHideorNot }
            />
            Esconder senhas
          </label>

          {infos.length === 0 ? (
            <p>Nenhuma senha cadastrada</p>
          ) : (
            <>
              <h4>Serviços cadastrados:</h4>
              <ul>
                {infos.reverse().map((estadoInicial, index) => (
                  <li key={ index }>
                    <a 
                      href= {estadoInicial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {estadoInicial.nameService}
                    </a>
                    <p>{estadoInicial.login}</p>
                    <p>{ hidePassword ? '******' : estadoInicial.password}</p>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => deleteService(index) }
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button onClick={ handleCadastrarButton } name="Cadastrar nova senha">
            Cadastrar nova senha
          </button>
        </>
      )}
    </div>
  );
}
