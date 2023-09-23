import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import { request } from "../server";
import { Fragment, useEffect, useState } from "react";

const TeacherStudents = () => {
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
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
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteStudent = async (idx) => {
    const con = confirm("Delete");
    if (con) {
      await request.delete(`categories/${id}/products/${idx}`);
      getStudents();
    }
  };

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selected === null) {
        await request.post(`/categories/${id}/products`, values);
      } else {
        await request.put(`/categories/${id}/products/${selected}`, values);
      }
      getStudents();
      setIsModalOpen(false);
    } catch (err) {
      message.error(err);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editData = async (idx) => {
    console.log(idx);
    console.log(id);
    setSelected(id);
    let { data } = await request.get(`/categories/${id}/products/${idx}`);
    form.setFieldsValue(data);
    setIsModalOpen(true);
  };

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
                <Button
                  type="primary"
                  onClick={() => {
                    const idx = student.id;
                    return editData(idx);
                  }}
                >
                  Edit
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    const idx = student.id;
                    return deleteStudent(idx);
                  }}
                >
                  Delete ({student.id})
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="FirstName"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="LastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isMarried"
            wrapperCol={{
              span: 24,
            }}
            valuePropName="checked"
          >
            <Checkbox>IsMarried</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeacherStudents;
