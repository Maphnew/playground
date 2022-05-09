import { observable, toJS } from "mobx";

export const articleStore = observable({
    articles: [
        { number: 1, title: "title1", author: "author1", date: "date1", content: "content1" },
        { number: 2, title: "title2", author: "author2", date: "date2", content: "content2" },
        { number: 3, title: "title3", author: "author3", date: "date3", content: "content3" },
        { number: 4, title: "title4", author: "author4", date: "date4", content: "content4" },
    ],

    createArticle: (item) => {
        this.articles.push(item);
    },

    updateArticle: (item) => {
        this.articles = this.articles.map((article) => {
            if (item.author === article.author && item.date === article.date) {
                return item;
            }
            return article;
        });
    },

    deleteArticle: (item) => {
        console.log(item, toJS(this.articles));
        this.articles = this.articles.filter((article) => {
            return !(item.author === article.author && item.date === article.date);
        });
    },
});
