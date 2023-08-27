import { FC, useState } from "react";
import Papa from "papaparse";
import { useFieldArray, useForm } from "react-hook-form";

type User = {
  fullName: string;
  email: string;
  role: "admin" | "normal";
  license: "basic" | "premium";
};

const Home: FC = () => {
  const [data, setData] = useState<User[]>([]);

  const { getValues, reset, setValue, control, register } = useForm<{
    users: User[];
  }>({
    defaultValues: {
      users: [],
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control: control,
    name: "users",
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<User>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          reset({
            users: result.data,
          });
        },
      });
    }
  };

  return (
    <div>
      <h1>CSV File Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
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
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.license}</td>
            </tr>
          ))}
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <input {...register(`users.${index}.fullName`)} />
              </td>
              <td>
                <input {...register(`users.${index}.email`)} />
              </td>
              <td>
                <input {...register(`users.${index}.role`)} />
              </td>
              <td>
                <input {...register(`users.${index}.license`)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
