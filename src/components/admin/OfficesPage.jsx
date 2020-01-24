import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from '../partials/AdminHeader.jsx';
import { getOffices, deleteOfficeAction } from '../../actions/officeAction';
import Offices from "./Offices.jsx";

/**
 * OfficesPage class declaration
 * 
 * @class OfficesPage
 * 
 * @extends {React.Component}
 */
export class OfficesPage extends React.Component {
    /**
     * Component constructor
     * 
     * @param {object} this.props.
     * 
     * @memberOf App
     */
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            offices: [],
            loading: true
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /**
     * @param {object} nextProps
     * 
     * @param {object} prevState
     * 
     * @memberof of OfficesPage
     */

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextState = {};
        if (nextProps.officeState.success) {
            nextState.offices = nextProps.officeState.offices;
            nextState.loading = false;
        }
        return nextState;
    }

    /**
     * Mount Offices
     * 
     * @return {XML} XML/JSX
     * 
     * @member of OfficesPage
     */
    componentDidMount() {
        this.props.getOffices({ limit: 10, offset: 0 });
    }

    /**
     * Handles offices deletion
     * 
     * @method handleDelete
     * 
     * @param { object } officeId
     * 
     * @return {void} 
     */
    handleDelete = (officeId) => {
        this.props.deleteOfficeAction(officeId);
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
        const { limit } = this.props.officeState.paginate;
        const nextOffset = data.selected * limit;
        this.props.getOffices({ limit, offset: nextOffset });
    }

    /**
     * Renders OfficesPage component
     * 
     * @return {XML} XML/JSX
     */
    render() {
        const { offices, loading } = this.state;
        const { paginate } = this.props.officeState;
        return (
            <div>
                {offices.length > 0 ? (
                    loading ? (
                        <div className="loading">
                            <Loader type="Rings" color="#ff9600" height="50" width="100"/>
                            <h3>Loading...</h3>
                        </div>
                    ) : (
                        <div>
                            <section id="page_banner">
                                <ToastContainer />
                            <h1>Available Offices</h1>
                            <p className="action">
                                <Link to="/admincreateoffice" className="btn edit">Add Office</Link>
                            </p>
                            </section> 
                            <section class="table_section">
                                <div className="table_container">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Office Type</th>
                                                <th>Office Name</th>
                                                <th>Call To Action</th>
                                            </tr>
                                            {
                                                offices.map(office => (
                                                    <Offices 
                                                      key={office.id} 
                                                      offices={office} 
                                                      deleteAtion={this.handleDelete} 
                                                    />
                                                ))
                                            }
                                    </tbody>
                                    </table>
                                </div>
                            </section>
                            <br />
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
                        <AdminHeader />
                        <h4>No offices to display </h4>
                    </div>
                )}
            </div>
        );
    }
}

OfficesPage.propTypes = {
    deleteOfficeAction: PropTypes.func.isRequired,
    getOffices: PropTypes.func.isRequired,
    officeState: PropTypes.object.isRequired,
    match: PropTypes.object,
    paginate: PropTypes.object
};

export const mapStateToProps = state => ({
    officeState: state.officeReducer
});

export const mapDispatchToProps = dispatch => 
bindActionCreators({ getOffices, deleteOfficeAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OfficesPage);
