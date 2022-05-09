import { useState } from "react";
import Content from "./Content";

const Modal = (props) => {
    const { setOpenModal } = props;
    const [article, setArticle] = useState({ number: "", title: "", author: "", date: "", contente: "" });
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">New Article</h3>
                </div>
                <div className="modal-body">
                    <Content article={article} setArticle={setArticle} />
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={() => setOpenModal(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
