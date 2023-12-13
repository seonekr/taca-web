import React from "react";
import "./products.css";
import { useState, useEffect } from "react";
import axios from "axios";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Color",
    selector: (row) => row.colors,
  },
  {
    name: "Cover",
    selector: (row) => row.image,
	cell: row => <img src={row.image} width={100} alt={row.name}></img>,
	width: '150'
  },
];

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);

    var url = `http://localhost:5000/searchProducts?page=${page}&per_page=${perPage}`;

	if(search) {
		url += `&search=${search}`;
	}
    if (sortColumn) {
      url += `&sortColumn=${sortColumn}&sortColumnDir=${sortColumnDir}`;
    }

    const response = await axios.get(url);

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    console.log(column);
    setSortColumn(column.name);
    setSortColumnDir(sortDirection);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, sortColumn, sortColumnDir]);

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search:
          <input type="text" name="search" onChange={handleSearchChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <DataTable
        title="Products"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
      />
    </div>
  );
};

export default Products;
