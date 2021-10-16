import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.css";
import {
    CDataTable,
    CButton,
} from '@coreui/react';
import NavbarButton from "./navbarButton.component";

import { SET_LOADING } from '../store/types';
import { PostListGetApi } from '../api/index';

const TopLiked = () => {
    const dispatch = useDispatch(null);
    const history = useHistory();
    const [topPostData, setTopPostData] = useState();

    useEffect( () => {
        getTopPostList();
    }, []);

    const getTopPostList = async () => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        const result = await PostListGetApi();
        let real_data = result.data;
        for ( let i = 0 ; i < real_data.length; i ++) {
            real_data[i].likes = real_data[i].likes[0];
        }
        real_data.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
        setTopPostData(real_data.slice(0, 10));
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
                <h1>10 Top Liked Posts</h1>
                <NavbarButton />
                <div>
                    <CDataTable
                        items={topPostData}
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

export default TopLiked;