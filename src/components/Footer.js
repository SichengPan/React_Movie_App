import React from 'react';
import 'bootswatch/dist/cosmo/bootstrap.min.css';

function Footer() {
    return (
        <footer 
            className="mt-auto navbar-dark" 
            style={{
                backgroundColor: '#2d3e50',
                padding: '1rem 0',
                width: '100%'
            }}
        >
            <div className="container-fluid text-center text-light">
                <div className="row justify-content-center mb-3">
                    <p className="mb-2">Follow me:</p>
                    <div>
                        <a href="https://www.linkedin.com/in/pansicheng" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/SichengPan" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <p className="mb-0">© 2024 Show Scount. All rights reserved.</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;


