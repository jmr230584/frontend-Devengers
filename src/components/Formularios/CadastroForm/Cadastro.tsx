import { JSX } from 'react';
import { useState } from 'react';
import estilo from './CadastroForm.module.css';
import ClienteRequests from '../../../fetch/ClienteRequests';
import { APP_ROUTES } from '../../../appConfig';

function CadastroForm(): JSX.Element {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        senha: '',
        cpf: '',
        celular: '',
        imagemPerfil: '' as string | File
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'imagemPerfil' && files) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    // Função para atualizar o state
    const handleChange = (nomeCompleto: string, valor: string) => {
        setFormData({ ...formData, [nomeCompleto]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resposta = await ClienteRequests.enviarFormularioCliente(formData);
        if (resposta) {
            alert('Cadastro realizado com sucesso.');
        } else {
            alert('Erro ao realizar cadastro.');
        }
    }

    return (
        <main className={estilo.cadastro}>
            <div className={estilo.superior}>
                <h2>CADASTRAR</h2>
            </div>

            <div className={estilo['profile-upload']}>
                        <div className={estilo['profile-picture']}>
                            {formData.imagemPerfil && typeof formData.imagemPerfil !== "string" ? (
                                <img
                                    src={URL.createObjectURL(formData.imagemPerfil)}
                                    alt="Pré-visualização"
                                    className={estilo['profile-img']}
                                />
                            ) : (
                                <div className={estilo['profile-placeholder']}>
                                    <span>👤</span>
                                </div>
                            )}

                            {/* Ícone de câmera clicável */}
                            <label htmlFor="imagemPerfil" className={estilo['camera-icon']}>
                                📷
                            </label>
                            <input
                                type="file"
                                name="imagemPerfil"
                                id="imagemPerfil"
                                accept="image/*"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    
            <section className={estilo['container-cadastro']}>
                <form onSubmit={(e) => { handleSubmit(e); }}
                    className={estilo['form-cadastro']}
                >
                    <label htmlFor="">
                        Nome Completo
                        <input
                            type="text"
                            placeholder="Digite seu nome completo..."
                            required
                            className={estilo['input-nome-cadastro']}
                            onChange={(e) => handleChange("nomeCompleto", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        E-mail
                        <input
                            type="email"
                            placeholder="Digite seu email..."
                            required
                            className={estilo['input-email-cadastro']}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Senha
                        <input
                            type="password"
                            placeholder="Digite sua senha..."
                            required
                            className={estilo['input-password-cadastro']}
                            onChange={(e) => handleChange("senha", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Cpf
                        <input
                            type="number"
                            placeholder="Digite seu cpf..."
                            className={estilo['input-cpf-cadastro']}
                            onChange={(e) => handleChange("cpf", e.target.value)}
                        />
                    </label>


                    <label htmlFor="">
                        Celular
                        <input
                            type="number"
                            placeholder="Digite seu celular..."
                            className={estilo['input-celular-cadastro']}
                            onChange={(e) => handleChange("celular", e.target.value)}
                        />
                    </label>

                    <div className={estilo['container-botoes']}>

                        <button type="submit" className={estilo['input-button-cadastro']} value="Cadastrar">
                            Cadastrar
                        </button>
                        <a href={APP_ROUTES.ROUTE_LOGIN} className={estilo['input-button-ja-possuo-cadastro']}>Já possuo cadastro</a>
                    </div>
                </form>
            </section>
        </main >
    );
}

export default CadastroForm;
