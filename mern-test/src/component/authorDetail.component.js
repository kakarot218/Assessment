import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.css";
import {
    CDataTable,
    CButton,
} from '@coreui/react';
import NavbarButton from "./navbarButton.component";

import { useParams } from "react-router-dom";
import { SET_LOADING } from '../store/types';
import { AuthorDetailGetApi } from '../api/index';

const AuthorDetail = () => {
    const { detail_id } = useParams();
    const dispatch = useDispatch(null);
    const history = useHistory();
    const [authorDetailData, setAuthorDetailData] = useState();

    useEffect( () => {
        getAllAuthorDetail();
    }, []);

    const getAllAuthorDetail = async () => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        const dss_data = await AuthorDetailGetApi(detail_id);
        console.log(detail_id);
        let real_data = dss_data.data;
        for ( let i = 0 ; i < real_data.length; i ++) {
            real_data[i].likes = real_data[i].likes[0];
        }
        setAuthorDetailData(real_data);
        dispatch({
            type: SET_LOADING,
            payload: false
        })
    }

    const fields = [
        'id',
        'post_id',
        'query',
        'title',
        'author',
        'views',
        'date',
        'likes',
        { key: 'buttonGroups', label: '', _style: { width: '84px' }, sorter: false }
    ]

    const rowClickHandler = (item) => {
        history.push('/post_detail/' + item.post_id);
    }

    return (
        <>
            <div>
                <h1>Author Detail</h1>
                <NavbarButton />
                <div>
                    <CDataTable
                        items={authorDetailData}
                        fields={fields}
                        itemsPerPage={5}
                        itemsPerPageSelect
                        tableFilter
                        sorter
                        pagination
                        hover
                        clickableRows
                        onRowClick={rowClickHandler}
                        scopedSlots={{
                            'buttonGroups':
                            (item, index) => {
                                return (
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                
                                                <Link to=''><CButton
                                                    color="success"
                                                    size="sm"
                                                ><i className="fa fa-link" />
                                                </CButton></Link>
                                            </div>
                                        </td>
                                    )
                                }
                        }}
                    />
                </div>

            </div>
        </>
    )
}

export default AuthorDetail;