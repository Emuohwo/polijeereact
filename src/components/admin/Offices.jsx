import React from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { tr } from 'date-fns/locale';

/**
 * Offices class declaration
 * 
 * @class Offices
 * 
 * @extends {React.Component}
 */
export class Offices extends React.Component {
    /**
     * Handle office deletion
     * 
     * @method handleDelete
     * 
     * @param {object} officeId
     * 
     * @return {void} void
     */
    handleDelete = () => {
        swal ({
            title: "Are you sure?",
            text: "Once delete, you can not reverse it",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteAction(this.props.offices.id);
                swal("Office Deleted Successfully", {
                    icon: "success",
                });
            }
        });
    }

    /**
     * Renders Offices component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        const { offices } = this.props;
        return (
            <tr>
                <td>{offices.type}</td>
                <td>{offices.name}</td>
                <td>
                    <button className="btn edit">
                        <Link to={`edit-office/${offices.id}`}>
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

Offices.propTypes = {
    deleteAction: PropTypes.func.isRequired,
    offices: PropTypes.object.isRequired
};

export default Offices;
