import { useEffect, useState } from "react";
import { request } from "../server";

const StudentsPage = () => {
  const [student, setStudent] = useState([]);

  const getStudents = async () => {
    try {
      const { data } = await request.get(`/categories`);
      const ali = data.map((element) => {
        return request.get(`/categories/${element.id}/products`);
      });
      const all = await Promise.all(ali);
      setStudent(all);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      {student.map((student) => (
        <div key={student.id}>
          <img
            src={student.avatar}
            alt=""
            style={{ width: "200px", height: "200px" }}
          />
          <p>{student.firstName}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentsPage;
