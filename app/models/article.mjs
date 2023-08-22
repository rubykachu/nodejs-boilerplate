const articles = [];

export default class Article {
  constructor(article) {
    this.article = article;
  }

  save() {
    articles.push(this);
  }

  static all() {
    return articles;
  }
}
