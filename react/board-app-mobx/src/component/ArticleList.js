import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import useStore from "../store/useStore";
import Modal from "./Modal";

const ArticleList = (props) => {
    const { article, setArticle } = props;
    const [openModal, setOpenModal] = useState(false);
    const { articleListStore, saveInfoStore } = useStore();
    useEffect(() => {
        saveInfoStore.setDate(new Date().toLocaleTimeString());
        setInterval(() => saveInfoStore.setDate(new Date().toLocaleTimeString()), 1000);
    }, [saveInfoStore]);
    const userNameChangeHandler = (e) => {
        saveInfoStore.setAuthor(e.target.value);
    };
    const createButtonClickHandler = () => {
        setOpenModal(!openModal);
    };
    const updateButtonClickHandler = () => {
        articleListStore.updateArticle(article);
    };
    const deleteButtonClickHandler = () => {
        articleListStore.deleteArticle(article);
    };
    const rowClickHandler = (e) => {
        const { number, title, author, date, content } = e.data;
        setArticle({
            number,
            title,
            author,
            date,
            content,
        });
    };
    return useObserver(() => (
        <>
            <section className="article-list">
                <div className="article-list__header">
                    <div className="userInfo">
                        <label htmlFor="user">사용자</label>
                        <input id="user" onChange={userNameChangeHandler} value={saveInfoStore.author} />
                    </div>
                    <div className="time">
                        <label htmlFor="time">현재시간</label>
                        <input id="time" className="userInfo__time" value={saveInfoStore.date} readOnly></input>
                    </div>
                </div>
                <div className="board">
                    <div className="board__buttons">
                        <button onClick={createButtonClickHandler}>신규</button>
                        <button onClick={updateButtonClickHandler}>수정</button>
                        <button onClick={deleteButtonClickHandler}>삭제</button>
                    </div>
                    <div
                        className="board__list ag-theme-material"
                        style={{
                            height: "100%",
                            minHeight: "200px",
                        }}
                    >
                        <AgGridReact
                            columnDefs={[
                                { field: "number", headerName: "번호" },
                                { field: "title", headerName: "제목" },
                                { field: "author", headerName: "작성자" },
                                { field: "date", headerName: "작성일" },
                            ]}
                            defaultColDef={{
                                flex: 1,
                                resizable: true,
                                sortable: true,
                                filter: true,
                            }}
                            rowData={articleListStore.articleList}
                            onRowClicked={rowClickHandler}
                        />
                    </div>
                </div>
            </section>
            {openModal && <Modal setOpenModal={setOpenModal} author={saveInfoStore.author} />}
        </>
    ));
};

export default ArticleList;
