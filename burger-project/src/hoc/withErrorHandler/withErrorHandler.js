import React, {Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

// HOC is a function that takes a component, and returns a new component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount(){
            axios.interceptors.request.use(req => {
                // We want to clear any errors when we make a request.
                // We only want to set an error when we make a response.
                this.setState({error: null});
                return req;
            })
            // We aren't interested in the response, so we just immediately return the response.
            // We just want to catch errors
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })

        }

        // We need to make a handler for clicking out the modal.
        // Basically reversing the state that is responsible for the modal showing up in the first place.
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;