import { useEffect, useState } from "react";
import "./Ingressos.module.css";
import { SERVER_CFG } from "../../appConfig"; // ✅ só o necessário

type Ingresso = {
  id_ingresso: number;
  id_filme_api: string;
  id_sessao: number;
  numero_assento: number;
  fileira: string;
  preco_ingresso: number;
  status_ingresso: string;
};

export default function Ingressos() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);

  useEffect(() => {
    async function carregarIngressos() {
      try {
        const res = await fetch(`${SERVER_CFG.SERVER_URL}/ingressos`);
        if (!res.ok) throw new Error("Erro ao carregar ingressos");
        const data = await res.json();
        setIngressos(data);
      } catch (err) {
        console.error(err);
      }
    }
    carregarIngressos();
  }, []);

  if (ingressos.length === 0) {
    return <p>Nenhum ingresso comprado ainda 🎟️</p>;
  }

  return (
    <div className="container">
      <h2>Meus ingressos</h2>
      <div className="lista">
        {ingressos.map((ingresso) => (
          <div key={ingresso.id_ingresso} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w300${ingresso.id_filme_api}.jpg`}
              alt="Filme"
              className="poster"
            />
            <div>
              <p><strong>Filme:</strong> {ingresso.id_filme_api}</p>
              <p><strong>Sessão:</strong> {ingresso.id_sessao}</p>
              <p><strong>Assento:</strong> {ingresso.fileira}{ingresso.numero_assento}</p>
              <p><strong>Preço:</strong> R$ {ingresso.preco_ingresso.toFixed(2)}</p>
              <p><strong>Status:</strong> {ingresso.status_ingresso}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
