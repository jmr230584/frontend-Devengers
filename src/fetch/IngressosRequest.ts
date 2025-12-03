class IngressoRequests {
    private baseURL = "http://localhost:3000";

    async listarPorCliente(idCliente: number) {
        try {
            const req = await fetch(`${this.baseURL}/ingresso/cliente/${idCliente}`);
            if (!req.ok) throw new Error("Erro ao buscar ingressos");

            return await req.json();

        } catch (e) {
            console.error("Erro listarPorCliente:", e);
            return null;
        }
    }
}

export default new IngressoRequests();
