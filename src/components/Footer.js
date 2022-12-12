import React from 'react'

export default function Footer() {
    return (
        <footer className="text-center text-lg-start" Style="background-color: #4e63d7;">
            <div className="container d-flex justify-content-center py-5">
                <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" Style="color: #4e63d7; background-color: white; border-radius: 100px;">
                    <i className="fa fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" Style="color: #4e63d7; background-color: white; border-radius: 100px;">
                    <i className="fa fa-linkedin"></i>
                </button>
                <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" Style="color: #4e63d7; background-color: white; border-radius: 100px;">
                    <i className="fa fa-instagram"></i>
                </button>
                <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" Style="color: #4e63d7; background-color: white; border-radius: 100px;">
                    <i className="fa fa-twitter"></i>
                </button>
            </div>


            <div className="text-center text-white p-3" Style="background-color: rgba(0, 0, 0, 0.2);">
                © 2022 Copyright: Made With ❤ JobLifts

            </div>

        </footer>
    )
}
