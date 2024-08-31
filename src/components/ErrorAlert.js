function ErrorAlert({ error, searchTerm, onClose }) 
{
    return (
        <div className="alert alert-dismissible alert-danger">
            <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="alert" 
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            ></button>
            <strong>Oh snap!</strong> '{searchTerm}' resulted in '{error}' error
        </div>
    );
}

export default ErrorAlert;