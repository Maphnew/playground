import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import useStore from "../store/useStore";
import Modal from "./Modal";

const ArticleList = (props) => {
    const { article, setArticle } = props;
    const [time, setTime] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const { articleStore } = useStore();
    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        // console.log(articleStore.articles[0].title);
    }, []);
    const createButtonClickHandler = () => {
        setOpenModal(!openModal);
    };
    const updateButtonClickHandler = () => {
        articleStore.updateArticle(article);
    };
    const deleteButtonClickHandler = () => {
        console.log(article, articleStore);
        articleStore.deleteArticle(article);
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
                        <input id="user" placeholder="ADMIN"></input>
                    </div>
                    <div className="time">
                        <label htmlFor="time">현재시간</label>
                        <input id="time" className="userInfo__time" value={time} readOnly></input>
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
                            rowData={articleStore.articles}
                            onRowClicked={rowClickHandler}
                        />
                    </div>
                </div>
            </section>
            {openModal && <Modal setOpenModal={setOpenModal} article={article} setArticle={setArticle} />}
        </>
    ));
};

export default ArticleList;
