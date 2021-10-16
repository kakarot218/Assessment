import React from "react";
import { Link } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.css";
import {
    CButton,
} from '@coreui/react';

const NavbarButton = () => {
    return(
            <div>
                <Link to="/">
                    <CButton
                        color="info"
                        className="float-right"
                        style={{ margin: '0px 0px 0px 16px' }}
                    ><i className="fa fa-home" /><span style={{ padding: '4px' }} />Home</CButton>
                </Link>
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
    );
}

export default NavbarButton;