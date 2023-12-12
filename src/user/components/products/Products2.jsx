import React from "react";
import "./products.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
];

const Products = () => {
  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchData = async page => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchData(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchData(1); // fetch page 1 of users
		
	}, []);

	return (
		<DataTable
			title="Users"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
		/>
	);
};

export default Products;
