import { useEffect } from "react";
// import { request } from "../server";

const StudentsPage = () => {
  // const [student, setStudent] = useState([]);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      // const { data } = await request.get(`/categories`);
      // const ali = await data.map((element) => {
      //   return request.get(`/categories/${element.id}/products`);
      // });
      // console.log(ali);
      // const all = await Promise.all(ali);
      // const allProducts = all.flatMap((product) => {
      //   product.data;
      // });
      // console.log(allProducts);
      // setStudent(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      {/* {student.map((student) => (
        <div key={student.id}>
          <img
            src={student.avatar}
            alt=""
            style={{ width: "200px", height: "200px" }}
          />
          <p>{student.firstName}</p>
        </div>
      ))} */}
    </div>
  );
};

export default StudentsPage;
