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
import { PostDetailGetApi } from '../api/index';

const PostDetail = () => {
    const { post_id } = useParams();
    const dispatch = useDispatch(null);
    const history = useHistory();
    const [postDetailData, setPostDetailData] = useState();

    useEffect( () => {
        getAllPostDetail();
    }, []);

    const getAllPostDetail = async () => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        const result = await PostDetailGetApi(post_id);
        console.log(post_id);
        let real_data = result.data[0].comments;
        setPostDetailData(real_data);
        dispatch({
            type: SET_LOADING,
            payload: false
        })
    }

    const fields = [
        'id',
        'comment',
        'authId',
        'author',
        { key: 'buttonGroups', label: '', _style: { width: '84px' }, sorter: false }
    ]

    const rowClickHandler = (item) => {
        console.log(item);
        history.push('/author_detail/' + item.authId);
    }

    return (
        <>
            <div>
                <h1>Post Detail</h1>
                <NavbarButton />
                <div>
                    <CDataTable
                        items={postDetailData}
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

export default PostDetail;