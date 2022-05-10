import { observable } from "mobx";

export const articleListStore = observable({
    articleList: [
        // { number: 1, title: "title1", author: "author1", date: "date1", content: "content1" },
        // { number: 2, title: "title2", author: "author2", date: "date2", content: "content2" },
        // { number: 3, title: "title3", author: "author3", date: "date3", content: "content3" },
        // { number: 4, title: "title4", author: "author4", date: "date4", content: "content4" },
    ],
    // 화살표 함수를 사용할 경우 this는 undefined
    // TODO: this 바인딩 규칙에 대해 좀 더 살펴보자
    createArticle(item) {
        if (this.articleList.length === 0) {
            item.number = 1;
        } else {
            const numList = this.articleList.map((a) => parseInt(a.number));
            item.number = Math.max(...numList) + 1;
        }
        this.articleList = [...this.articleList, item];
    },

    updateArticle(item) {
        this.articleList = this.articleList.map((article) => {
            if (item.author === article.author && item.date === article.date) {
                return item;
            }
            return article;
        });
    },

    deleteArticle(item) {
        this.articleList = this.articleList.filter((article) => {
            return !(item.author === article.author && item.date === article.date);
        });
    },
});
