import { SERVER_CFG } from '../appConfig';

interface ClienteDTO {
    idCliente?: number;       // ID do Cliente (? indica um parâmetro opcional)
    nomeCompleto?: string;          // Nome do cliente
    email?: string;         // E-mail do cliente
    senha?: string;  // senha do cliente
    cpf?: string;      // cpf do cliente
    celular?: string;       // Celular do Cliente
}

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Cliente
 */
class ClienteRequests {

    private serverURL: string;          // Variável para o endereço do servidor
    private routeListaCliente: string;   // Variável para a rota de listagem de Cliente
    private routeCadastraCliente: string; // Variável para a rota de cadastro de Cliente

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;     // Endereço do servidor web
        this.routeListaCliente = '/lista/cliente';    // Rota configurada na API
        this.routeCadastraCliente = '/cadastro/cliente';    // Rota configurada na API
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de Cliente cadastrados
     * @returns Retorna um JSON com a lista de Cliente ou null em caso de erro
     */
    async listarCliente(): Promise<ClienteDTO | null> {
        try {
            // faz a requisição no servidor
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaCliente}`);

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // converte a reposta para um JSON
                const listaDeCliente: ClienteDTO = await respostaAPI.json();
                // retorna a resposta
                return listaDeCliente;
            }
            
            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao fazer a consulta de Cliente: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }

    /**
     * Envia os dados do formulário Cliente para a API
     * @param formCliente Objeto com os valores do formulário
     * @returns **true** se cadastro com sucesso, **false** se falha
     */
    async enviarFormularioCliente(formulario: any): Promise<boolean> {

        // Criar um FormData para envio multipart
        const formDataToSend = new FormData();  // criando o objeto FormData
        formDataToSend.append('nome', formulario.nome);
        formDataToSend.append('email', formulario.email);
        formDataToSend.append('cpf', formulario.cpf);
        formDataToSend.append('celular', formulario.celular);
        formDataToSend.append('senha', formulario.senha);
        if(formulario.imagemPerfil instanceof File) {
            formDataToSend.append('imagemPerfil', formulario.imagemPerfil);
        }

       
       
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraCliente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formDataToSend
            });

            if(!respostaAPI.ok) {
                throw new Error('Erro ao fazer requisição com o servidor.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário. ${error}`);
            return false;
        }
    }
    
}

// Exporta a classe já instanciando um objeto da mesma
export default new ClienteRequests();
