import { JSX } from 'react';
import estilo from './LoginForm.module.css';

function LoginForm(): JSX.Element {
    return (
        <main className={estilo.login}>
            <div className={estilo.superior}>
                <h2>LOGIN</h2>
            </div>
            <section>
                <form action="" className={estilo['form-login']}>
                    <label>
                        E-mail
                        <input
                            type="email"
                            placeholder='Digite seu email aqui...'
                            className={estilo['input-email-login']}
                        />
                    </label>

                    <label>
                        Senha
                        <input
                            type="password"
                            placeholder='Digite sua senha aqui...'
                            className={estilo['input-password-login']}
                        />
                    </label>

                    <input
                        type="button"
                        value="Entrar"
                        className={estilo['input-button-login']}
                    />
                </form>
            </section>
        </main>
    );
}

export default LoginForm;