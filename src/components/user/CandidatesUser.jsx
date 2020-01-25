import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

/**
 * Candidates declaration
 * 
 * @class Candidates
 * 
 * @extends {React.Component}
 */
export class Candidates extends React.Component {
    /**
     * Handle Candidate deletion
     * 
     * @method handleDelete
     * 
     * @param {object} paartyId
     * 
     * @return {void} void
     */
    handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you can not reverse it",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteAction(this.props.parties.id);
                swal("Candidate Deleted Successfully", {
                    icon: "success",
                });
            }
        });
    }

    /**
     * Renders Parties component
     * 
     * @return {XML} XML/JSX
     */
    render() {
        const { candidates } = this.props;
        return (
            <tr>
                <td>{candidates.office}</td>
                <td>{candidates.party}</td>
                <td>{candidates.candidate}</td>
                {/* <td>{candidates.createddate}</td>
                <td>{candidates.modifieddate}</td> */}
                <td>
                    <button className="btn edit">
                        <Link to={`edit-candidate/${candidates.id}`}>
                            <i className="fa fa-pencil"></i>
                        </Link>
                    </button>
                    <button 
                      className="btn delete" 
                      onClick={this.handleDelete}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

Candidates.propTypes = {
    deleteAction: PropTypes.func.isRequired,
    candidates: PropTypes.object.isRequired
};

export default Candidates;
