interface ToastProps {
    message: string;
}

function Toast({ message }: ToastProps) {
    return (
        <div
            role="status"
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent text-accent text-lg font-semibold bg-background px-6 py-4 text-center shadow-lg"
        >
            {message}
        </div>
    );
}

export default Toast;
