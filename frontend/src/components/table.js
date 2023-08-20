import React, {useState, useMemo, useEffect} from 'react';
import axios from "axios";
import Logout from "./logout";
import {sortRows, filterRows, paginateRows, Pagination} from "./helpers";
const baseUrl = 'http://localhost:3001/api/articles'


const Table = () => {
    const getToken = window.localStorage.getItem('token').replaceAll('"', '')
    const token = `bearer ${getToken}`
    const [articles, setArticles] = useState([])
    const config = {
        headers: { Authorization: token}
    }

    useEffect(() => {
        getArticle()
        },[]
    )
    const getArticle = async () => {
        const response = await axios.get(baseUrl, config)
        .then(function (result){
            setArticles(result.data)
        })
    }
    console.log(articles)


}

export default Table