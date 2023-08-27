import { FC, useState } from "react";
import Papa from "papaparse";

interface UserData {
  name: string;
  email: string;
  role: "admin" | "normal";
  license: "basic" | "premium";
}

const Home: FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<UserData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
        },
      });
    }
  };

  return (
    <div>
      <h1>CSV File Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>氏名</th>
              <th>メールアドレス</th>
              <th>権限</th>
              <th>ライセンス</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>{row.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
