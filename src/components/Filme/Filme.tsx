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

<<<<<<< HEAD
  // Poltronas estáticas (mantido do segundo código)
=======
  const navigate = useNavigate();

>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
  const poltronas = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"];

  useEffect(() => {
    if (!id) return;

<<<<<<< HEAD
    const carregarFilme = async () => {
=======
    const carregarFilmeReal = async () => {
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
      try {
        // 🌍 PEGAR FILME REAL DO TMDB
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=396a9240a4ab4e099cdcded28f677dd0&language=pt-BR`
        );
<<<<<<< HEAD
=======

>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
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
<<<<<<< HEAD
        console.error("Erro ao buscar filme:", err);
      }
    };

    // simula sessões (você pode trocar depois pela API real de sessões)
    const gerarSessoesMock = () => {
      const agora = new Date();
      const mockSessoes: Sessao[] = Array.from({ length: 9 }).map((_, i) => ({
        id_sessao: i + 1,
        tipo_sala: ["2D", "3D", "IMAX", "VIP"][i % 4],
        data_hora_inicio: new Date(
          agora.getTime() + Math.floor(i / 3) * 86400000 + (14 + (i % 3) * 2) * 3600000
        ).toISOString(),
        preco: 30 + (i % 4) * 5,
      }));
      setSessoes(mockSessoes);
      setLoading(false);
    };

    carregarFilme();
    gerarSessoesMock();
=======
        console.error("Erro ao carregar filme:", err);
        setLoading(false);
      }
    };

    carregarFilmeReal();
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!filme) return <p>Filme não encontrado.</p>;

<<<<<<< HEAD
  // Agrupa as sessões por data (aaaa-mm-dd)
=======
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
  const sessoesPorData: Record<string, Sessao[]> = {};
  sessoes.forEach((s) => {
    const data = s.data_hora_inicio.split("T")[0];
    if (!sessoesPorData[data]) sessoesPorData[data] = [];
    sessoesPorData[data].push(s);
  });

  const sessoesDoDia = dataSelecionada ? sessoesPorData[dataSelecionada] || [] : [];

<<<<<<< HEAD
  const comprarIngresso = async () => {
=======
  const comprarIngresso = () => {
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
    if (!sessaoSelecionada || !poltronaSelecionada) {
      alert("Selecione uma sessão e uma poltrona!");
      return;
    }

    const sessao = sessoes.find((s) => s.id_sessao === sessaoSelecionada);
    if (!sessao) return;

<<<<<<< HEAD
    try {
      const res = await fetch("http://localhost:3000/ingressos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filmeId: filme?.id,
          sessaoId: sessao.id_sessao,
          poltrona: poltronaSelecionada,
          preco: sessao.preco,
          tipo: sessao.tipo_sala,
          data: sessao.data_hora_inicio,
        }),
      });

      if (!res.ok) throw new Error("Erro ao finalizar compra");

      alert(
        `🎟️ Ingresso comprado!\nFilme: ${filme?.title}\nData: ${dataSelecionada}\nHorário: ${new Date(
          sessao.data_hora_inicio
        ).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}\nSala: ${
          sessao.tipo_sala
        }\nPoltrona: ${poltronaSelecionada}`
      );
      setDataSelecionada("");
      setSessaoSelecionada(null);
      setPoltronaSelecionada(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar a compra.");
    }
=======
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
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
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
<<<<<<< HEAD
        <p>
          <strong>Duração:</strong> {filme.runtime ? `${filme.runtime} min` : "N/A"}
        </p>
        <p>
          <strong>Classificação:</strong> {filme.adult ? "18+" : "Livre"}
        </p>
=======
        <p><strong>Duração:</strong> {filme.runtime} min</p>
        <p><strong>Classificação:</strong> {filme.adult ? "18+" : "Livre"}</p>
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd

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
<<<<<<< HEAD
                  className={`${styles.card} ${sessaoSelecionada === s.id_sessao ? styles.selecionado : ""}`}
=======
                  className={`${styles.card} ${sessaoSelecionada === s.id_sessao ? styles.selecionado : ""
                    }`}
>>>>>>> 8a0b96da7940a2fd93426ace4f28e2f180bdeadd
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

