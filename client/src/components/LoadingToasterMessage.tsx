import { ToastContainer, Toast } from "react-bootstrap";

type Props = {
    error: string;
    show: boolean;
    setShow: (params: boolean) => void;
}

const LoadingToasterMessage = (props: Props) => {

    return (
        <>
            {
                props.error && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg="danger"
                            show={props.show}
                            autohide
                            delay={5000}
                            onClose={() => props.setShow(false)}
                        >
                            <Toast.Header closeButton={false}>
                                Error
                            </Toast.Header>
                            <Toast.Body>{props.error}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default LoadingToasterMessage;