import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import "../css/Historique.css";

const Historique = () => {
  const [history, setHistory] = useState([]);
  const selectedPlayerId = localStorage.getItem("joueur_id");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/history/${localStorage.getItem("auth_token")}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    if (!selectedPlayerId) return history;
    return history.filter(
      (item) => item.id_joueur === parseInt(selectedPlayerId)
    );
  }, [history, selectedPlayerId]);

  const data = useMemo(() => filteredHistory, [filteredHistory]);

  const columns = useMemo(
    () => [
      {
        Header: "Joueur",
        accessor: "pseudo",
      },
      {
        Header: "Partie",
        accessor: "id_partie",
      },
      {
        Header: "Points",
        accessor: "points",
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="historique-container">
      <h1>Historique du Joueur</h1>
      <table {...getTableProps()} className="history-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Historique;
