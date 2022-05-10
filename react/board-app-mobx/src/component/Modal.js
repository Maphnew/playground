import { useState } from "react";
import Content from "./Content";

const Modal = (props) => {
    const { setOpenModal } = props;
    const [article, setArticle] = useState({ number: "", title: "", author: "", date: "", content: "" });

    return (
        <div className="modal" onClick={() => setOpenModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">New Article</h3>
                </div>
                <div className="modal-body">
                    <Content article={article} setArticle={setArticle} setOpenModal={setOpenModal} modal={true} />
                </div>
                <div className="modal-footer">
                    <button className="modal-button" type="submit" form="form-content">
                        Save
                    </button>
                    <button className="modal-button" onClick={() => setOpenModal(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
