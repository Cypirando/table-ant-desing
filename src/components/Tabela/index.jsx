import React, { useState } from "react";
import { Table, Modal, Input, Button } from "antd";

const data = {
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

function Restaurante() {
  const [visivel, setVisivel] = useState(false);
  const [mudaDado, setMudaDado] = useState({});
  const [menu, setMenu] = useState(data.menu);

  const coluna = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ação",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => editaTabela(record)}>
          Editar
        </Button>
      ),
    },
  ];

  function editaTabela(record) {
    setMudaDado(record);
    setVisivel(true);
  }

  function salvaTabela() {
    setMenu(
      menu.map((item) => {
        if (item.id === mudaDado.id) {
          return mudaDado;
        }
        return item;
      })
    );
    setVisivel(false);
  }

  return (
    <div>
      <Table columns={coluna} dataSource={menu} rowKey="id" />
      <Modal
        title="Editar Item"
        visivel={visivel}
        onOk={salvaTabela}
        onCancel={() => setVisivel(false)}
      >
        <Input
          value={mudaDado.name}
          onChange={(e) =>
            setMudaDado({ ...mudaDado, name: e.target.value })
          }
          placeholder="Nome"
        />
        <Input
          value={mudaDado.description}
          onChange={(e) =>
            setMudaDado({ ...mudaDado, description: e.target.value })
          }
          placeholder="Descrição"
        />
        <Input
          value={mudaDado.price}
          onChange={(e) =>
            setMudaDado({ ...mudaDado, price: e.target.value })
          }
          placeholder="Preço"
        />
      </Modal>
    </div>
  );
}

export default Restaurante;



;
