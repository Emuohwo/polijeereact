import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from '../partials/AdminHeader.jsx';

import { getParties, deletePartyAction} from '../../actions/partyAction';
import Parties from "./Parties.jsx"

/**
 * PartiesPage class declaration
 * 
 * @extends {React.Component}
 */
export class PartiesPage extends Component {
    /**
     * Component constructor
     * 
     * @param {object} this.this.props.
     * 
     * @member 
     */
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            parties: [],
            loading: true
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * getDerivedStateFromProps method
     * 
     * @param {object} nextProps
     * 
     * @param {object} prevState
     * 
     * @member of PartiesPage
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};
        if (nextProps.partyState.success) {
            nextState.parties = nextProps.partyState.parties;
            nextState.loading = false;
        }
        return nextState;
    }

    /**
     * Mount Parties
     * 
     * @return {XML} XML/JSX
     * 
     * @member of PartiesPage
     */
    componentDidMount() {
        this.props.getParties({ limit: 10, offset: 0 });
    }

    /**
     * Handles parties deletion
     * 
     * @method handleDelete
     * 
     * @param { object } partyId
     * 
     * @return {void} 
     */
    handleDelete = (partyId) => {
        this.props.deletePartyAction(partyId);
        window.location.reload();
    };

    /**
     * Handles pagination click
     * 
     * @method handlePageClick 
     * 
     * @param {object} data
     * 
     * @return {void}
     */
    handlePageClick(data) {
        const { limit } = this.props.partyState.paginate;
        const nextOffset = data.selected * limit;
        this.props.getParties({ limit, offset: nextOffset });
    }

    render() {
        const { parties, loading } = this.state;
        const { paginate } = this.props.partyState;
        return (
            <div>
                {
                    parties.length > 0 ? (
                        loading ? (
                            <div className="loading">
                                <Loader type="Rings" color="#ff9600" height="50" width="100"/>
                                <h3>Loading...</h3>
                            </div>
                        ) : (
                            <div>
                                <section id="page_banner">
                                    <ToastContainer/>
                                    <h1>Parties Available</h1>
                                    <p>
                                        <Link to="/admincreateparty" className="btn edit">Add Party</Link>
                                    </p>
                                </section>
                                <section id="table_section">
                                    <div className="table_container">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Party Logo</th>
                                                    <th>Party Name</th>
                                                    <th>Party Address</th>
                                                    <th>Created On</th>
                                                    <th>Modified On</th>
                                                    <th>Call to Action</th>
                                                </tr>
                                                {
                                                    parties.map(party => (
                                                        <Parties 
                                                          key={party.id}
                                                          parties={party} 
                                                          deleteAction={this.handleDelete} 
                                                        />
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                                <br/>
                                {
                                    paginate && paginate.itemCount > 10 ? 
                                    <div className="search">
                                        <ReactPaginate 
                                        previousLabel={"<<"} 
                                        nextLabel={">>"} 
                                        breakLabel={<a href="">...</a>} 
                                        breakClassName={"break-me"} 
                                        pageCount={paginate.page} 
                                        marginPagesDisplayed={2} 
                                        pageRangeDisplayed={5} 
                                        onPageChange={this.handlePageClick} 
                                        containerClassName={"pagination"} 
                                        subContainerClassName={"pages pagination"} 
                                        activeClassName={"active"} 
                                        />
                                    </div>
                                    : 
                                    ''
                                } 
                                <br/>
                            </div>
                        )
                    ) : (
                        <div>
                            <AdminHeader/>
                            <h4>No Parties to dsiplay</h4>
                        </div>
                    )
                }
            </div>
        );
    }
}


PartiesPage.propTypes = {
    deletePartyAction: PropTypes.func.isReauired,
    getParties: PropTypes.func.isRequired,
    partyState: PropTypes.object.isRequired,
    match: PropTypes.object,
    paginate: PropTypes.object
};

export const mapStateToProps = state => ({
    partyState: state.partyReducer
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getParties, deletePartyAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PartiesPage);
