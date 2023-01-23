import "./Tabela.css";
import React, { useState } from "react";
import { Table, Input, Button, Tag, Checkbox } from "antd";

const data = {
  restaurant_id: "54321",
  menu: [
    {
      id: "1",
      name: "Steak Frites",
      description: "Bife grelhado acompanhado de batatas fritas",
      price: "22.99",
      attributes: [
        { name: "carne", checked: false },
        { name: "batatas fritas", checked: false },
        { name: "grelhado", checked: false },
      ],
    },
    {
      id: "2",
      name: "Poulet à la crème",
      description: "Frango em molho de creme e ervas",
      price: "18.99",
      attributes: [
        { name: "frango", checked: false },
        { name: "creme", checked: false },
        { name: "ervas", checked: false },
      ],
    },
    {
      id: "3",
      name: "Sushi Maki",
      description: "Conjunto de makis de peixe e vegetais",
      price: "15.99",
      attributes: [
        { name: "vegetais", checked: false },
        { name: "sushi", checked: false },
        { name: "peixe", checked: false },
      ],
    },
    {
      id: "4",
      name: "Paella Valenciana",
      description: "Paella de frutos do mar e arroz",
      price: "21.99",
      attributes: [
        { name: "carne", checked: false },
        { name: "frutos do mar", checked: false },
      ],
    },
    {
      id: "5",
      name: "Gnocchi al Pesto",
      description: "Gnocchi em molho de pesto de manjericão",
      price: "16.99",
      attributes: [
        { name: "gnocchi", checked: false },
        { name: "pesto", checked: false },
        { name: "manjericão", checked: false },
      ],
    },
  ],
};

function Restaurante() {
  const [menu, setMenu] = useState(data.menu);

  const colunas = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Input
          value={record.name}
          onChange={(e) => salvaInformacao(e, record, "name")}
        />
      ),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <Input
          value={record.description}
          onChange={(e) => salvaInformacao(e, record, "description")}
        />
      ),
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <Tag color={etiquetaPreco(record.price)}>
          <Input
            className="preco"
            value={record.price}
            onChange={(e) => salvaInformacao(e, record, "price")}
          />
        </Tag>
      ),
    },
    {
      title: "Atributos",
      key: "attributes",
      render: (text, record) => (
        <div>
          {record.attributes.map((attribute, index) => (
            <Checkbox
              key={index}
              checked={attribute.checked}
              onChange={(e) => escolheAtributo(e, record, index)}
            >
              {attribute.name}
            </Checkbox>
          ))}
        </div>
      ),
    },
    {
      title: "Ação",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => salvarCard(record)}>
          Salvar
        </Button>
      ),
    },
  ];

  const etiquetaPreco = (price) => {
    if (price > 30) {
      return "red";
    } else if (price > 20) {
      return "yellow";
    } else if (price > 10) {
      return "green";
    } else {
      return "default";
    }
  };
  const escolheAtributo = (e, record, index) => {
    setMenu(
      menu.map((item) => {
        if (item.id === record.id) {
          let newAttributes = [...item.attributes];
          newAttributes[index].checked = e.target.checked;
          return { ...item, attributes: newAttributes };
        }
        return item;
      })
    );
  };
  const salvaInformacao = (e, record, field) => {
    e.persist(); // permite usar o evento fora do ciclo de vida atual
    setMenu(
      menu.map((item) => {
        if (item.id === record.id) {
          return { ...item, [field]: e.target.value };
        }
        return item;
      })
    );
  };

  const salvarCard = (record) => {
    // código para salvar as alterações, por exemplo, enviando uma requisição a uma API
  };

  return (
    <div>
      <Table columns={colunas} dataSource={menu} rowKey="id" />
    </div>
  );
}

export default Restaurante;
