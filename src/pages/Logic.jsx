// import { useEffect, useState } from "react";
// import { request } from "../server";

// const LoginPage = () => {
//   const [student, setStudent] = useState([]);

//   const getStudents = async () => {
//     try {
//       const { data } = await request.get(`/categories`);
//       const ali = data.map((element) => {
//         return request.get(`/categories/${element.id}/products`);
//       });
//       console.log(ali);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getStudents();
//   }, []);

//   return (
//     <div>
//       {student.map((student) => (
//         <div key={student.id}>
//           <img
//             src={student.avatar}
//             alt=""
//             style={{ width: "200px", height: "200px" }}
//           />
//           <p>{student.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LoginPage;
