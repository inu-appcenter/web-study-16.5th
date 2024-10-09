import { useState, useEffect } from "react";

interface Article {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export default function News() {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Apple");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.articles);
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옴
  useEffect(() => {
    fetchData(searchQuery);
  }, []);

  const handleSubmit = () => {
    fetchData(searchQuery);
  };

  return (
    <div>
      <h1>News</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search keyword"
      />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Search
      </button>

      {/* 로딩 중일 때 */}
      {loading && <div>Loading...</div>}

      {/* 에러 발생 시 */}
      {error && <div>Error: {error}</div>}

      {/* 데이터가 성공적으로 로드된 경우 */}
      {data.length > 0 ? (
        <div>
          {data.map((article, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
              }}
            >
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={{ width: "100%" }}
                />
              )}
              <p>Author: {article.author ? article.author : "Unknown"}</p>
              <p>
                Published at:{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && <div>No articles found</div>
      )}
    </div>
  );
}
