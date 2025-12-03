import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Filme.module.css";

type Filme = {
  id: number;
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

export default function CompraFilme() {
  const { id } = useParams<{ id: string }>();

  const [filme, setFilme] = useState<Filme | null>(null);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [sessaoSelecionada, setSessaoSelecionada] = useState<number | null>(null);
  const [poltronaSelecionada, setPoltronaSelecionada] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const poltronas = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"];

  useEffect(() => {
    if (!id) return;

    const carregarFilmeReal = async () => {
      try {
        // 🌍 PEGAR FILME REAL DO TMDB
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=396a9240a4ab4e099cdcded28f677dd0&language=pt-BR`
        );

        const data = await res.json();

        setFilme({
          id: data.id,
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          runtime: data.runtime,
          adult: data.adult,
        });

        // 🎫 SESSÕES DEFINIDAS MANUALMENTE
        const mockSessoes: Sessao[] = [
          {
            id_sessao: 1,
            tipo_sala: "2D",
            data_hora_inicio: "2025-12-11T16:00:00",
            preco: 25,
          },
          {
            id_sessao: 2,
            tipo_sala: "IMAX",
            data_hora_inicio: "2025-12-13T22:00:00",
            preco: 45,
          },
          {
            id_sessao: 3,
            tipo_sala: "XD",
            data_hora_inicio: "2025-12-14T19:20:00",
            preco: 35,
          },
          {
            id_sessao: 4,
            tipo_sala: "IMAX",
            data_hora_inicio: "2025-12-18T14:00:00",
            preco: 45,
          },
          {
            id_sessao: 5,
            tipo_sala: "VIP",
            data_hora_inicio: "2025-12-22T22:00:00",
            preco: 60,
          },
        ];

        setSessoes(mockSessoes);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar filme:", err);
        setLoading(false);
      }
    };

    carregarFilmeReal();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!filme) return <p>Filme não encontrado.</p>;

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

    const sessao = sessoes.find((s) => s.id_sessao === sessaoSelecionada);
    if (!sessao) return;

    alert(`🎟️ Compra realizada com sucesso!\nFilme: ${filme.title}`);

    navigate("/ingressos", {
      state: {
        ingresso: {
          filme: filme.title,
          sala: sessao.tipo_sala,
          data: sessao.data_hora_inicio,
          poltrona: poltronaSelecionada,
          preco: sessao.preco,
          poster: filme.poster_path,
        },
      },
    });
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
                  className={`${styles.card} ${sessaoSelecionada === s.id_sessao ? styles.selecionado : ""
                    }`}
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

