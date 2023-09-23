import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { request } from "../server";
import { Link } from "react-router-dom";

const TeachersPage = () => {
  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => <img height={50} src={data} />,
    },
    {
      title: "IsMarried",
      key: "isMarried",
      dataIndex: "isMarried",
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log(record);
        // console.log();
        return (
          <Space
            size="middle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button type="primary" onClick={() => editData(record.id)}>
              Edit
            </Button>
            <Button danger type="primary" onClick={() => deleteData(record.id)}>
              Delete
            </Button>
            <Link type="primary" to={`/categories/${record.id}`}>
              New students ({record.id})
            </Link>
          </Space>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("/categories");
      setData(data);
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  }

  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      setLoadingBtn(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("/categories", values);
      } else {
        await request.put(`/categories/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editData = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`/categories/${id}`);
    form.setFieldsValue(data);
  };

  const deleteData = async (id) => {
    let { data } = await request.delete(`/categories/${id}`);
    form.setFieldsValue(data);
    getData();
  };

  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>Teachers ({data.length})</h1>
            <Button onClick={showModal} type="primary">
              Add
            </Button>
          </div>
        )}
        dataSource={data}
        columns={columns}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected === null ? "Add teacher" : "Save teacher"}
        confirmLoading={loadingBtn}
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
export default TeachersPage;
