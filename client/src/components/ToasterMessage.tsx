import { ToastContainer, Toast } from "react-bootstrap";
import IToasterState from "../models/IToasterState";

type Props = {
    setToasterstate: (params: IToasterState) => void;
    toasterstate: IToasterState;
}

const ToasterMessage = (props: Props) => {

    return (
        <>
            {
                props.toasterstate.responseState !== 'initial' && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg={props.toasterstate.responseState === 'success' ? 'success' : 'danger'}
                            show={props.toasterstate.show}
                            autohide
                            delay={5000}
                            onClose={() => props.setToasterstate({ ...props.toasterstate, show: false })}
                        >
                            <Toast.Header closeButton={false}>
                                {props.toasterstate.responseState === 'success' ? 'Success' : 'Error'}
                            </Toast.Header>
                            <Toast.Body>
                                {props.toasterstate.toastMessage}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default ToasterMessage;