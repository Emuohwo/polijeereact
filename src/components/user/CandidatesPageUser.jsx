import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserHeader from '../partials/UserHeader.jsx';

import { getCandidates, deleteCandidateAction} from '../../actions/candidateAction';
import Candidates from "./CandidatesUser";

/**
 * CandidatesPage class declaration
 * 
 * @extends {React.Component}
 */
export class CandidatesPage extends Component {
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
            candidates: [],
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
     * @member of CandidatesPage
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};
        if (nextProps.candidateState.success) {
            nextState.candidates = nextProps.candidateState.candidates;
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
        this.props.getCandidates({ limit: 10, offset: 0 });
    }

    /**
     * Handles parties deletion
     * 
     * @method handleDelete
     * 
     * @param { object } candidateId
     * 
     * @return {void} 
     */
    handleDelete = (candidateId) => {
        this.props.deleteCandidateAction(candidateId);
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
        const { limit } = this.props.candidateState.paginate;
        const nextOffset = data.selected * limit;
        this.props.getCandidates({ limit, offset: nextOffset });
    }

    render() {
        const { candidates, loading } = this.state;
        const { paginate } = this.props.candidateState;
        return (
            <div>
                {
                    candidates.length > 0 ? (
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
                                        <Link to="/candidate-constest" className="btn edit">Contest</Link>
                                    </p>
                                </section>
                                <section id="table_section">
                                    <div className="table_container">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Office ID</th>
                                                    <th>Party ID</th>
                                                    <th>Candidate ID</th>
                                                    {/* <th>Modified On</th> */}
                                                    <th>Call to Action</th>
                                                </tr>
                                                {
                                                    candidates.map(candidate => (
                                                        <Candidates 
                                                          key={candidate.id}
                                                          candidates={candidate} 
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
                            <UserHeader/>
                            <h4>No Candidate to dsiplay</h4>
                        </div>
                    )
                }
            </div>
        );
    }
}


CandidatesPage.propTypes = {
    deleteCandidateAction: PropTypes.func.isReauired,
    getCandidates: PropTypes.func.isRequired,
    candidateState: PropTypes.object.isRequired,
    match: PropTypes.object,
    paginate: PropTypes.object
};

export const mapStateToProps = state => ({
    candidateState: state.candidateReducer
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getCandidates, deleteCandidateAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CandidatesPage);
