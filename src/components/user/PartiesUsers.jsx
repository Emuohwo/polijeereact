import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

/**
 * Parties declaration
 * 
 * @class Parties
 * 
 * @extends {React.Component}
 */
export class Parties extends React.Component {
    /**
     * Handle Party deletion
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
                swal("Party Deleted Successfully", {
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
        const { parties } = this.props;
        return (
            <tr>
                <td>{parties.logourl}</td>
                <td>{parties.name}</td>
                <td>{parties.hqaddress}</td>
                {/* <td>{parties.createddate}</td>
                <td>{parties.modifieddate}</td> */}
                <td>
                    <button className="btn edit">
                        <Link to={`edit-party/${parties.id}`}>
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

Parties.propTypes = {
    deleteAction: PropTypes.func.isRequired,
    parties: PropTypes.object.isRequired
};

export default Parties;
