import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import "@coreui/coreui/dist/css/coreui.css";
import {
    CDataTable,
    CButton,
} from '@coreui/react';

import { SET_LOADING } from '../store/types';
import { AuthorListGetApi } from '../api/index';

const AuthorList = () => {

    const dispatch = useDispatch(null);
    const history = useHistory();
    const [authorListData, setAuthorListState] = useState();

    useEffect( () => {
        getAuthorLists();
    }, []);

    const getAuthorLists = async () => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        const author_list_data = await AuthorListGetApi();
        setAuthorListState(author_list_data.data);
        dispatch({
            type: SET_LOADING,
            payload: false
        })
    }

    const fields = [
        { key: 'id', _style: { width: '10%'}},
        'name',
        'from',
        'age',
        { key: 'buttonGroups', label: '', _style: { width: '84px' }, sorter: false }
    ]

    const rowClickHandler = (item) => {
        console.log(item);
        history.push('/author_detail/' + item.id);
    }

    return (
        <>
            <div>
                <h1>Author Lists</h1>
                <div>
                    <Link to="/top_commented">
                        <CButton
                            color="success"
                            className="float-right"
                            style={{ margin: '0px 0px 0px 16px' }}
                        ><i className="fa fa-reorder" /><span style={{ padding: '4px' }} />10 Top Commented</CButton>
                    </Link>
                    <Link to="/top_liked">
                        <CButton
                            color="primary"
                            className="float-right"
                            style={{ margin: '0px 0px 0px 16px' }}
                        ><i className="fa fa-server" /><span style={{ padding: '4px' }} />10 Top Liked</CButton>
                    </Link>
                </div>
                <div>
                    <CDataTable
                        items={authorListData}
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

export default AuthorList;