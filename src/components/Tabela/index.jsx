import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./Tabela.css";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
const originData = {
  restaurant_id: "54321",
  menu: [
    {
      id: "1",
      name: "Steak Frites",
      description: "Bife grelhado acompanhado de batatas fritas",
      price: "22.99",
      attributes: ["carne", "batatas fritas", "grelhado"],
    },
    {
      id: "2",
      name: "Poulet à la crème",
      description: "Frango em molho de creme e ervas",
      price: "18.99",
      attributes: ["frango", "creme", "ervas"],
    },
    {
      id: "3",
      name: "Sushi Maki",
      description: "Conjunto de makis de peixe e vegetais",
      price: "15.99",
      attributes: ["peixe", "vegetais", "sushi"],
    },
    {
      id: "4",
      name: "Paella Valenciana",
      description: "Paella de frutos do mar e arroz",
      price: "21.99",
      attributes: ["frutos do mar", "arroz"],
    },
    {
      id: "5",
      name: "Gnocchi al Pesto",
      description: "Gnocchi em molho de pesto de manjericão",
      price: "16.99",
      attributes: ["gnocchi", "pesto", "manjericão"],
    },
  ],
};

let attributesOptions = [];
originData.menu.map((item) => {
  return (attributesOptions = attributesOptions.concat(
    item.attributes.map((word) => {
      return { value: word, label: word };
    })
  ));
});
console.log(attributesOptions);

console.log(attributesOptions);
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
const App = () => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState(originData.menu);
  const [editingKey, setEditingKey] = useState("");
  const handleSelectChange = (value) => {
    setSelectedAttribute(value);
  };
  console.log(selectedAttribute);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      description: "",
      price: "",
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
      console.log(data);
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
      key: uuidv4(),
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Descriçao",
      key: uuidv4(),
      dataIndex: "description",
      width: "15%",
      editable: true,
    },
    {
      title: "Preço",
      key: uuidv4(),
      dataIndex: "price",
      width: "10%",
      editable: true,
    },
    {
      title: "Atributos",
      key: uuidv4(),
      dataIndex: "attributes",
      editable: false,
      render: (attributes) => (
        <>
          <Select
            mode="tags"
            style={{
              width: "80%",
            }}
            placeholder="Atributos"
            options={attributesOptions}
          />
        </>
      ),
    },
    {
      title: "Operações",
      key: uuidv4(),
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
              Salvar
            </Typography.Link>
            <Popconfirm title="Tem certeza" onConfirm={cancel}>
              <a href="'">Cancelar</a>
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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        onChange={handleSelectChange}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowKey={(record) => record.id}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default App;
