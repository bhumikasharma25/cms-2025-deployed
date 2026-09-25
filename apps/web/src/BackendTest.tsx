import { useEffect, useState } from "react";

type TestResponse = {
  message: string;
  blogs: string[];
};

function BackendTest() {
  const [data, setData] = useState<TestResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/test")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.message}</h1>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog}>{blog}</li>
        ))}
      </ul>
    </div>
  );
}

export default BackendTest;
