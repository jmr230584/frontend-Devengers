import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Filme = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_language: string;
};

type Sessao = {
  id_filme: number;
  id_sessao: number;
  id_sala: number;
  tipo: "VIP" | "3D" | "IMAX" | "2D";
  data_hora_inicio: string;
  data_hora_fim: string | null;
  preco: number;
};

export default function Compra() {
  const { id } = useParams<{ id: string }>();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [sessaoSelecionada, setSessaoSelecionada] = useState<number | null>(null);
  const [poltronaSelecionada, setPoltronaSelecionada] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFilme = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=396a9240a4ab4e099cdcded28f677dd0&language=pt-BR`
        );
        if (!res.ok) throw new Error("Erro ao buscar filme");
        const data = await res.json();
        setFilme(data);
      } catch (err) {
        console.error("Erro ao carregar filme:", err);
      }
    };

    const fetchSessoes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/sessoes`); // sua rota real de sessões
        if (!res.ok) throw new Error("Erro ao carregar sessões");
        const data = await res.json();
        // Filtrar apenas as sessões do filme atual
        const sessoesFiltradas = data.filter((s: Sessao) => s.id_filme === Number(id));
        setSessoes(sessoesFiltradas);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilme();
    fetchSessoes().finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: "center", marginTop: 40 }}>Carregando...</div>;
  if (!filme) return <div style={{ textAlign: "center", marginTop: 40 }}>Filme não encontrado.</div>;

  const datasDisponiveis = Array.from(
    new Set(
      sessoes.map((s) =>
        new Date(s.data_hora_inicio).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        })
      )
    )
  );

  const sessoesFiltradas = dataSelecionada
    ? sessoes.filter(
        (s) =>
          new Date(s.data_hora_inicio).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }) === dataSelecionada
      )
    : [];

  const agruparPorTipo = (tipo: string) => sessoesFiltradas.filter((s) => s.tipo === tipo);

  const comprarIngresso = async () => {
    if (!sessaoSelecionada || !poltronaSelecionada || !filme) return;

    const sessao = sessoes.find((s) => s.id_sessao === sessaoSelecionada);
    if (!sessao) return;

    try {
      const res = await fetch("http://localhost:3000/ingressos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filmeId: filme.id.toString(),
          sessaoId: sessao.id_sessao,
          poltrona: poltronaSelecionada,
          preco: sessao.preco,
          tipo: sessao.tipo,
          data: sessao.data_hora_inicio,
        }),
      });

      if (!res.ok) throw new Error("Erro ao comprar ingresso");

      alert("Ingresso comprado com sucesso!");
      setPoltronaSelecionada(null);
      setSessaoSelecionada(null);
      setDataSelecionada(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar a compra.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px", fontFamily: "Poppins, sans-serif", backgroundColor: "#fff" }}>
      <div style={{ display: "flex", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "90%", maxWidth: 1100 }}>
        <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} style={{ width: 360, objectFit: "cover" }} />
        <div style={{ padding: 24, flex: 1 }}>
          <h1 style={{ fontSize: 28, marginBottom: 10, color: "#222" }}>{filme.title}</h1>
          <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{filme.overview}</p>

          {/* DATAS */}
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: 10 }}>ESCOLHA UMA DATA</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {datasDisponiveis.map((data) => (
                <div
                  key={data}
                  style={{
                    width: 90,
                    height: 60,
                    background: dataSelecionada === data ? "#ffe9d0" : "#f3f3f3",
                    border: dataSelecionada === data ? "2px solid #ff7b00" : "2px solid transparent",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => {
                    setDataSelecionada(data);
                    setSessaoSelecionada(null);
                    setPoltronaSelecionada(null);
                  }}
                >
                  {data}
                </div>
              ))}
            </div>
          </div>

          {/* HORÁRIOS */}
          {dataSelecionada && (
            <div style={{ marginTop: 25 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 10 }}>ESCOLHA UM HORÁRIO</h3>
              {["VIP", "3D", "IMAX", "2D"].map((tipo) => {
                const sessoesTipo = agruparPorTipo(tipo);
                if (sessoesTipo.length === 0) return null;
                return (
                  <div key={tipo} style={{ marginBottom: 15 }}>
                    <h4 style={{ margin: "10px 0 8px" }}>
                      {tipo} - Dublado {sessoesTipo[0] ? `R$ ${sessoesTipo[0].preco.toFixed(2)}` : "-"}
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {sessoesTipo.map((s) => (
                        <div
                          key={s.id_sessao}
                          style={{
                            width: 80,
                            height: 50,
                            background: sessaoSelecionada === s.id_sessao ? "#ffe9d0" : "#f3f3f3",
                            border: sessaoSelecionada === s.id_sessao ? "2px solid #ff7b00" : "2px solid transparent",
                            borderRadius: 8,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "0.3s",
                          }}
                          onClick={() => {
                            setSessaoSelecionada(s.id_sessao);
                            setPoltronaSelecionada(null);
                          }}
                        >
                          {new Date(s.data_hora_inicio).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* POLTRONA */}
          {sessaoSelecionada && (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 10 }}>ESCOLHA SUA POLTRONA</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["A1", "A2", "A3", "B1", "B2", "B3"].map((poltrona) => (
                  <div
                    key={poltrona}
                    style={{
                      width: 50,
                      height: 50,
                      background: poltronaSelecionada === poltrona ? "#ffe9d0" : "#f3f3f3",
                      border: poltronaSelecionada === poltrona ? "2px solid #ff7b00" : "2px solid transparent",
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() => setPoltronaSelecionada(poltrona)}
                  >
                    {poltrona}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTÃO COMPRAR */}
          {sessaoSelecionada && poltronaSelecionada && (
            <div style={{ marginTop: 30, textAlign: "center" }}>
              <button
                style={{
                  background: "#ff7b00",
                  border: "none",
                  padding: "12px 32px",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={comprarIngresso}
              >
                Comprar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
