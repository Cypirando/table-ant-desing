// import React from "react";
import {
  Form,
  InputNumber,
  Input,
  Popconfirm,
  Table,
  Typography,
  Select,
} from "antd";
import { useState } from "react";
const originData = {
  restaurant_id: "54321",
  menu: [
    {
      key: "1",
      name: "Steak Frites",
      description: "Bife grelhado acompanhado de batatas fritas",
      price: "22.99",
      attributes: ["carne", "batatas fritas", "grelhado"],
    },
    {
      key: "2",
      name: "Poulet à la crème",
      description: "Frango em molho de creme e ervas",
      price: "18.99",
      attributes: ["frango", "creme", "ervas"],
    },
    {
      key: "3",
      name: "Sushi Maki",
      description: "Conjunto de makis de peixe e vegetais",
      price: "15.99",
      attributes: ["peixe", "vegetais", "sushi"],
    },
    {
      key: "4",
      name: "Paella Valenciana",
      description: "Paella de frutos do mar e arroz",
      price: "21.99",
      attributes: ["frutos do mar", "arroz"],
    },
    {
      key: "5",
      name: "Gnocchi al Pesto",
      description: "Gnocchi em molho de pesto de manjericão",
      price: "16.99",
      attributes: ["gnocchi", "pesto", "manjericão"],
    },
  ],
};
const newData = originData.menu;
console.log(newData);

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Exemplo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(newData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      width: "50%",

      editable: true,
    },
    {
      title: "Ingredientes",
      dataIndex: "attributes",
      width: "40%",
      editable: true,
      render: (text, record) => {
        console.log(text);
        return (
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Tags Mode"
            onChange={(value) => handleTagChange(value, record.key)}
            options={text.map((atributo) => ({
              label: atributo,
              value: atributo,
            }))}
          />
        );
      },
    },
    {
      title: "Preço",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "Operaçâo",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Tem Certeza?" onConfirm={cancel}>
              <a href=".">Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Editar
          </Typography.Link>
        );
      },
    },
  ];
  const handleTagChange = (value, key) => {
    // update the data with the new tags here
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, tags: value } : item
      )
    );
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default Exemplo;
