useEffect(() => {
  if (!id) return;

  const fetchFilme = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=396a9240a4ab4e099cdcded28f677dd0&language=pt-BR`
      );
      if (!res.ok) {
        throw new Error("Erro ao buscar filme");
      }
      const data = await res.json();

      const filmeAdaptado: Filme = {
        id: data.id,
        titulo: data.title,
        descricao: data.overview,
        imagem: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        legenda: "Dublado", // você pode trocar depois para algo dinâmico
      };

      setFilme(filmeAdaptado);
    } catch (err) {
      console.error("Erro ao carregar filme:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFilme();
}, [id]);
