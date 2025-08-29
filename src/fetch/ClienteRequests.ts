/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    private serverUrl: string;
    private routeLogin: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param login - email e senha
     * @returns true caso sucesso, false caso erro
     */
    async login(login: { email: string; senha: string; }) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (!response.ok) {
                // retorna erro com mensagem do backend
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha no login');
            }

            const data = await response.json();
            console.log('Resposta do login:', data);

            // Corrigido: agora usa data.cliente em vez de data.usuario
            if (data.auth) {
                this.persistToken(
                    data.token,
                    data.cliente.email,
                    data.cliente.id_cliente.toString(),
                    data.auth.toString()
                );
            }

            return true;
        } catch (error: any) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    /**
     * Persiste o token no localStorage
     */
    persistToken(token: string, email: string, idCliente: string, isAuth: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('idCliente', idCliente);
        localStorage.setItem('isAuth', isAuth);
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('idCliente');
        localStorage.removeItem('isAuth');
        window.location.href = '/login';
    }

    /**
     * Verifica a validade do token
     */
    checkTokenExpiry() {
        const token = localStorage.getItem('token');

        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);

            if (payload.exp < now) {
                this.removeToken();
                return false;
            }
            return true;
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            this.removeToken();
            return false;
        }
    }
}

export default new AuthRequests();
