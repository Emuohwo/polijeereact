import React, { Component } from 'react';


class PageNotFound extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>404</h2>
                    <h3>Page not Found</h3>
                    <p>
                        Click <a href="/">here</a> to go back
                    </p>
                </div>
            </React.Fragment>
        );
    }
}


PageNotFound.propTypes = {
    
};


export default PageNotFound;
