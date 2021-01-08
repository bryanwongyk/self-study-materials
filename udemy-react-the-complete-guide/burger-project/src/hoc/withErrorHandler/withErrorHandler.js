import React, {Fragment, useState, useEffect} from 'react';

import Modal from '../../components/UI/Modal/Modal';

// functional based component, that returns another functional based component
const withErrorHandler = (WrappedComponent, axios) => {
    const WithErrorHandler = props => {
        //set state of error to null initially
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            // We want to clear any errors when we make a request.
            // We only want to set an error when we make a response.
            setError(null);
            return req;
        })
        // We aren't interested in the response, so we just immediately return the response.
        // We just want to catch errors
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
            return Promise.reject(error);
        })

        // We need to make a handler for clicking out the modal.
        // Basically reversing the state that is responsible for the modal showing up in the first place.
        const errorConfirmedHandler = () => {
            setError(null);
        }

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        return (
            <Fragment>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        );
    };
    return WithErrorHandler;
}


// HOC is a function that takes a component, and returns a new component
// const withErrorHandler = (WrappedComponent, axios) => {

//     return class extends Component {
//         state = {
//             error: null
//         }

//         constructor(props){
//             super(props);
//             axios.interceptors.request.use(req => {
//                 // We want to clear any errors when we make a request.
//                 // We only want to set an error when we make a response.
//                 this.setError({error: null});
//                 return req;
//             })
//             // We aren't interested in the response, so we just immediately return the response.
//             // We just want to catch errors
//             axios.interceptors.response.use(res => res, error => {
//                 this.setError({error: error});
//             })
//         }

//         // We need to make a handler for clicking out the modal.
//         // Basically reversing the state that is responsible for the modal showing up in the first place.
//         errorConfirmedHandler = () => {
//             this.setError({error: null});
//         }
//         render(){
//             return (
//                 <Fragment>
//                     <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props}/>
//                 </Fragment>
//             );
//         }
//     }
// }

export default withErrorHandler;