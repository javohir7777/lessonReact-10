import { Button, Card, Col, Row, message } from "antd";
import { useParams } from "react-router-dom";
import { request } from "../server";
import { Fragment, useEffect, useState } from "react";

const TeacherStudents = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getStudents() {
    try {
      setLoading(true);
      const { data } = await request.get(`categories/${id}/products`);
      setStudent(data);
      // console.log(data);
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  }

  // const deleteStudent = async (id) => {
  // let data = await request.delete(`categories/${id}/products/${id}`);
  // console.log(data);
  // getStudents();
  // };

  return (
    <Fragment>
      <h1 className="text-center my-4">StudentsId {id}</h1>
      <Row gutter={[16, 16]}>
        {student.map((student) => (
          <Col key={student.id} span={6}>
            <Card
              loading={loading}
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={student.avatar} />}
            >
              <h5 className="text-center">{student.lastName}</h5>
              <h2 className="text-center">{student.firstName}</h2>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="primary">Edit</Button>
                <Button
                  danger
                  type="primary"
                  // onClick={() => deleteStudent(id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default TeacherStudents;
