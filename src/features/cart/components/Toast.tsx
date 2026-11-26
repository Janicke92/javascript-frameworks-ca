interface ToastProps {
    message: string;
}

function Toast({ message }: ToastProps) {
    return <div role="status">{message}</div>;
}

export default Toast;
