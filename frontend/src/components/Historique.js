import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { motion } from "framer-motion";
import "../css/Historique.css";

const Historique = () => {
  const [history, setHistory] = useState([]);
  const selectedPlayerId = localStorage.getItem("joueur_id");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `https://backendgg.ddns.net/history/${localStorage.getItem("auth_token")}`
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
    <motion.div className="historique-container">
      <h1>Historique du Joueur</h1>
      <motion.table
        {...getTableProps()}
        className="history-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <motion.tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {headerGroup.headers.map((column) => (
                <motion.th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </motion.th>
              ))}
            </motion.tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <motion.tr
                {...row.getRowProps()}
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {row.cells.map((cell) => (
                  <motion.td
                    {...cell.getCellProps()}
                    key={cell.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    {cell.render("Cell")}
                  </motion.td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default Historique;
