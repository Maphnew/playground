import { useObserver } from "mobx-react";
import { useEffect } from "react";
import useStore from "../store/useStore";

const Content = (props) => {
    const { article, setArticle, setOpenModal, modal } = props;
    const { articleListStore, saveInfoStore } = useStore();
    useEffect(() => {
        if (!modal) return;
        setArticle({
            ...article,
            author: saveInfoStore.author,
        });
    }, [saveInfoStore.author]);
    const submitHandler = (e) => {
        article.date = saveInfoStore.date;
        e.preventDefault();
        articleListStore.createArticle(article);
        setOpenModal(false);
    };
    const contentChangeHandler = (e) => {
        const tempArticle = Object.assign(article);
        tempArticle[e.target.id] = e.target.value;
        setArticle({ ...tempArticle });
    };
    return useObserver(() => (
        <section className="content">
            <form id="form-content" onSubmit={submitHandler}>
                <h3>Title</h3>
                <input id="title" className="content__title" value={article.title} onChange={contentChangeHandler} />
                <div className="content__info">
                    <label>
                        작성자
                        <input
                            id="author"
                            className="content__info__user-input"
                            value={article.author}
                            onChange={contentChangeHandler}
                            readOnly
                        />
                    </label>
                    {!modal && (
                        <label>
                            작성일
                            <input id="date" className="content__info__create-date" value={article.date} readOnly />
                        </label>
                    )}
                </div>
                <div className="content__text">
                    <textarea
                        id="content"
                        className="content__text__textarea"
                        rows={10}
                        value={article.content}
                        onChange={contentChangeHandler}
                    />
                </div>
            </form>
        </section>
    ));
};

export default Content;
