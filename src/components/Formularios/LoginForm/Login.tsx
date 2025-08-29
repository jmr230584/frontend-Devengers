import estilo from './LoginForm.module.css';
import { useState } from 'react';
import AuthRequests from '../../../fetch/AuthRequests';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const login = { email: email, senha: senha };

        try {
            // faz a requsição de login, se sucesso redireciona a página
            if (await AuthRequests.login(login)) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        <main className={estilo.login}>
            <div className={estilo.superior}>
                <h2>LOGIN</h2>
            </div>
            <section className={estilo['container-login']}>
                <form action="" className={estilo['form-login']} onSubmit={handleSubmit}>
                    <label htmlFor="">
                        E-mail
                        <input
                            type="email"
                            placeholder='Digite seu email aqui...'
                            required
                            className={estilo['input-email-login']}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label htmlFor="" >
                        Senha
                        <input
                            type="password"
                            placeholder='Digite sua senha aqui...'
                            className={estilo['input-password-login']}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </label>

                    <input
                        type="submit"
                        value="Entrar"
                        className={estilo['input-button-login']}
                    />
                </form>
            </section>
        </main>
    );
}

export default LoginForm;