import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Filme/Filme.module.css"; // CSS module

type Filme = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_language: string;
};

export default function Compra() {
  const { id } = useParams<{ id: string }>();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchFilme();
  }, [id]);

  if (loading) return <div className={styles.compra__loading}>Carregando...</div>;
  if (!filme) return <div className={styles.compra__erro}>Filme não encontrado.</div>;

  return (
    <div className={styles.compra}>
      <div className={styles.compra__card}>
        <img
          src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
          alt={filme.title}
          className={styles.compra__imagem}
        />
        <div className={styles.compra__info}>
          <h1 className={styles.compra__titulo}>{filme.title}</h1>
          <p className={styles.compra__descricao}>{filme.overview}</p>
          <span className={styles.compra__legenda}>
            Legenda: {filme.original_language}
          </span>
          <button className={styles.compra__botao}>Confirmar Compra</button>
        </div>
      </div>
    </div>
  );
}
