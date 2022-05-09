const Content = (props) => {
    const { article, setArticle } = props;
    const submitHandler = () => {
        console.log("submit");
    };
    const contentChangeHandler = (e) => {
        const tempArticle = Object.assign(article);
        tempArticle[e.target.id] = e.target.value;
        setArticle({ ...tempArticle });
    };
    return (
        <section className="content">
            <form onSubmit={submitHandler}>
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
                        />
                    </label>
                    <label>
                        작성일
                        <input
                            id="date"
                            className="content__info__create-date"
                            value={article.date}
                            onChange={contentChangeHandler}
                        />
                    </label>
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
    );
};

export default Content;
