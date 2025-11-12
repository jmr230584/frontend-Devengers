import { useEffect, useState } from "react";
import styles from "./Filme.module.css";

type Filme = {
  title: string;
  overview: string;
  poster_path: string;
  runtime: number;
  adult: boolean;
};

type Sessao = {
  id_sessao: number;
  tipo_sala: string;
  data_hora_inicio: string;
  preco: number;
};

export default function PFilme() {
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [sessaoSelecionada, setSessaoSelecionada] = useState<number | null>(null);
  const [poltronaSelecionada, setPoltronaSelecionada] = useState<string | null>(null);

  const poltronas = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"];

  // simula busca de filme e sessões
  useEffect(() => {
    // você pode substituir por uma requisição real futuramente
    const mockFilme: Filme = {
      title: "Filme Exemplo",
      overview: "Um filme incrível cheio de aventuras e surpresas.",
      poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      runtime: 120,
      adult: false,
    };
    setFilme(mockFilme);

    const agora = new Date();
    const mockSessoes: Sessao[] = Array.from({ length: 6 }).map((_, i) => ({
      id_sessao: i + 1,
      tipo_sala: ["2D", "3D", "IMAX"][i % 3],
      data_hora_inicio: new Date(agora.getTime() + i * 86400000 + 18 * 3600000).toISOString(),
      preco: 30 + i * 5,
    }));
    setSessoes(mockSessoes);
  }, []);

  if (!filme) return <p>Carregando filme...</p>;

  // agrupar sessões por data
  const sessoesPorData: Record<string, Sessao[]> = {};
  sessoes.forEach((s) => {
    const data = s.data_hora_inicio.split("T")[0];
    if (!sessoesPorData[data]) sessoesPorData[data] = [];
    sessoesPorData[data].push(s);
  });

  const sessoesDoDia = dataSelecionada ? sessoesPorData[dataSelecionada] || [] : [];

  const comprarIngresso = () => {
    if (!sessaoSelecionada || !poltronaSelecionada) {
      alert("Selecione uma sessão e uma poltrona!");
      return;
    }
    alert(
      `✅ Compra finalizada!\nData: ${dataSelecionada}\nSessão: ${sessaoSelecionada}\nPoltrona: ${poltronaSelecionada}`
    );
  };

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`}
        alt={filme.title}
        className={styles.poster}
      />

      <div className={styles.info}>
        <h1>{filme.title}</h1>
        <p>{filme.overview}</p>
        <p><strong>Duração:</strong> {filme.runtime} min</p>
        <p><strong>Classificação:</strong> {filme.adult ? "18+" : "Livre"}</p>

        <h3>📅 Escolha uma data</h3>
        <div className={styles.grid}>
          {Object.keys(sessoesPorData).map((data) => {
            const label = new Date(data).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            });
            return (
              <div
                key={data}
                className={`${styles.card} ${dataSelecionada === data ? styles.selecionado : ""}`}
                onClick={() => {
                  setDataSelecionada(data);
                  setSessaoSelecionada(null);
                  setPoltronaSelecionada(null);
                }}
              >
                {label}
              </div>
            );
          })}
        </div>

        {dataSelecionada && sessoesDoDia.length > 0 && (
          <>
            <h3>🕒 Escolha o horário</h3>
            <div className={styles.grid}>
              {sessoesDoDia.map((s) => (
                <div
                  key={s.id_sessao}
                  className={`${styles.card} ${sessaoSelecionada === s.id_sessao ? styles.selecionado : ""}`}
                  onClick={() => setSessaoSelecionada(s.id_sessao)}
                >
                  {new Date(s.data_hora_inicio).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  - {s.tipo_sala} - R${s.preco}
                </div>
              ))}
            </div>
          </>
        )}

        {sessaoSelecionada && (
          <>
            <h3>💺 Escolha sua poltrona</h3>
            <div className={styles.grid}>
              {poltronas.map((p) => (
                <div
                  key={p}
                  className={`${styles.card} ${poltronaSelecionada === p ? styles.selecionado : ""}`}
                  onClick={() => setPoltronaSelecionada(p)}
                >
                  {p}
                </div>
              ))}
            </div>

            <button className={styles.botaoCompra} onClick={comprarIngresso}>
              Finalizar compra 🎟️
            </button>
          </>
        )}
      </div>
    </div>
  );
}
