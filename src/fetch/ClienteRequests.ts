import { SERVER_CFG } from '../appConfig';

interface ClienteDTO {
  idCliente?: number;
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  cpf?: string;
  celular?: string;
}

class ClienteRequests {
  private serverURL: string;
  private routeListaCliente: string;
  private routeCadastraCliente: string;

  constructor() {
    this.serverURL = SERVER_CFG.SERVER_URL;
    this.routeListaCliente = '/lista/cliente';
    this.routeCadastraCliente = '/cadastro/cliente';
  }

  async listarCliente(): Promise<ClienteDTO | null> {
    try {
      const respostaAPI = await fetch(`${this.serverURL}${this.routeListaCliente}`);
      if (respostaAPI.ok) {
        return await respostaAPI.json();
      }
      return null;
    } catch (error) {
      console.error(`Erro ao fazer a consulta de Cliente: ${error}`);
      return null;
    }
  }

  async enviarFormularioCliente(formulario: any): Promise<boolean> {
    try {
      let respostaAPI;

      // Se tiver imagem, usar FormData
      if (formulario.imagemPerfil instanceof File) {
        const formDataToSend = new FormData();
        formDataToSend.append('nomeCompleto', formulario.nomeCompleto);
        formDataToSend.append('email', formulario.email);
        formDataToSend.append('cpf', formulario.cpf);
        formDataToSend.append('celular', formulario.celular);
        formDataToSend.append('senha', formulario.senha);
        formDataToSend.append('imagemPerfil', formulario.imagemPerfil);

        respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraCliente}`, {
          method: 'POST',
          body: formDataToSend
        });
      } 
      // Caso contrário, enviar como JSON
      else {
        respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraCliente}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nomeCompleto: formulario.nomeCompleto,
            email: formulario.email,
            senha: formulario.senha,
            cpf: formulario.cpf,
            celular: formulario.celular
          })
        });
      }

      if (!respostaAPI.ok) {
        throw new Error('Erro ao fazer requisição com o servidor.');
      }

      return true;

    } catch (error) {
      console.error(`Erro ao enviar o formulário. ${error}`);
      return false;
    }
  }
}

export default new ClienteRequests();
