import { JSX } from 'react';
import estilo from './CadastroForm.module.css';

function CadastroForm(): JSX.Element {
    return (
        <main className={estilo.cadastro}>
            <div className={estilo.superior}>
                <h2>CADASTRAR</h2>
            </div>
            <section className={estilo['container-cadastro']}>
                <form action="" className={estilo['form-cadastro']}>
                    <label>
                        Nome Completo
                        <input
                            type="text"
                            placeholder="Digite seu nome completo..."
                            className={estilo['input-nome-cadastro']}
                        />
                    </label>

                    <label>
                        E-mail
                        <input
                            type="email"
                            placeholder="Digite seu email..."
                            className={estilo['input-email-cadastro']}
                        />
                    </label>

                    <label>
                        Senha
                        <input
                            type="password"
                            placeholder="Digite sua senha..."
                            className={estilo['input-password-cadastro']}
                        />
                    </label>

                    <label>
                        Cpf
                        <input
                            type="cpf"
                            placeholder="Digite seu cpf..."
                            className={estilo['input-cpf-cadastro']}
                        />
                    </label>


                  <label>
                        Celular
                        <input
                            type="Celular"
                            placeholder="Digite seu celular..."
                            className={estilo['input-celular-cadastro']}
                        />
                    </label>
                    <div className={estilo['container-botoes']}>
                   <button type="submit" className={estilo['input-button-cadastro']}>
                  Cadastrar
                   </button>
                   <button type="button" className={estilo['input-button-ja-possuo-cadastro']}>
                  Já possuo cadastro
                </button>
               </div>

                </form>
            </section>
        </main>
    );
}

export default CadastroForm;
