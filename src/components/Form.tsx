import { useState, useEffect } from 'react';
import '../style/Form.css';

type EstadoInicial = {
  url: string;
  nameService: string;
  login: string;
  password: string;
};

export default function Form() {
  const [nameService, setNameService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [infos, setInfos] = useState<EstadoInicial[]>([]);
  const [hidePassword, setHidePassword] = useState(false);
  const [typePassword, setTypePassword] = useState('password');

  // Atualiza a validade do formulário sempre que algum campo muda
  useEffect(() => {
    const isValid = validEverything && isPasswordValid();
    setFormValid(isValid);
  }, [nameService, login, password, url]);

  // form ta visível ou não
  const handleCadastrarButton = () => {
    setFormVisible(true);
  };

  const handleCancelarButton = () => {
    setFormVisible(false);
  };

  // Evento enviar o form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: EstadoInicial = {
      nameService,
      login,
      password,
      url,
    };
    setInfos([newService, ...infos]);
    setFormVisible(false);
    resetForm();
  };

  // Remove um serviço da lista de informações
  const deleteService = (index: number) => {
    const updatedInfos = infos.filter((_, i) => i !== index);
    setInfos(updatedInfos);
  };

  // CHECKBOX -- visível ou não a senha
  const passwordHideOrNot = () => {
    setHidePassword(!hidePassword);
  };

  // Senha visível como text ou não visível como password
  const passwordType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTypePassword(typePassword === 'password' ? 'text' : 'password');
  };

  // Verifica se a string não está vazia
  const stringValid = (value: string) => value.trim() !== '';

  // Verifica se login e nome são válidos
  const validEverything = stringValid(nameService) && stringValid(login);

  // Requisito senha
  const isPasswordValid = () => {
    const passwordMin = password.length >= 8;
    const passwordMax = password.length <= 16;
    const hasNumberAndLetters = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
    const caracteresEspeciais = /\W|_/.test(password);

    return passwordMin && passwordMax && hasNumberAndLetters && caracteresEspeciais;
  };

  // Requisitos do formulário
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const resetForm = () => {
    setNameService('');
    setLogin('');
    setPassword('');
    setUrl('');
    setTypePassword('password');
  };

  // Atualiza o estado da senha
  const handleTargetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {formVisible ? (
        <form>
          <label htmlFor="nameService">Nome do Serviço</label>
          <input
            id="nameService"
            type="text"
            value={ nameService }
            onChange={ ({ target }) => setNameService(target.value) }
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
          <button
            id="buttonCadastrar"
            type="submit"
            disabled={ !formValid }
            onClick={ handleSubmit }
          >
            Cadastrar
          </button>
          <button onClick={ handleCancelarButton } id="remove-btn">Cancelar</button>
        </form>
      ) : (
        <div className="formsClass">
          <label htmlFor="hidePassword">
            <input
              type="checkbox"
              id="hidePassword"
              checked={ hidePassword }
              onChange={ passwordHideOrNot }
            />
            Esconder senhas
          </label>
          {infos.length === 0 ? (
            <p>Nenhuma senha cadastrada</p>
          ) : (
            <>
              <h4>Serviços cadastrados:</h4>
              <ul>
                {infos.map((estadoInicial, index) => (
                  <li key={ index } className="password-card">
                    <a
                      href={ estadoInicial.url }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {estadoInicial.nameService}
                    </a>
                    <p>{estadoInicial.login}</p>
                    <p>{hidePassword ? '******' : estadoInicial.password}</p>
                    <button
                      id="remove-btn"
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
          <button
            onClick={ handleCadastrarButton }
            name="Cadastrar nova senha"
            id="buttonCadastrar"
          >
            Cadastrar nova senha
          </button>
        </div>
      )}
    </div>
  );
}
