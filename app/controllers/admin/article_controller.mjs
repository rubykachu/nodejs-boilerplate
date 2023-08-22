import Article from '../../models/article.mjs';

/* eslint import/prefer-default-export: "off" */
export const index = (_req, res, _next) => {
  const article = new Article({ name: 'Minh Tang' });
  article.save();

  /* eslint no-console: "off" */
  console.log(Article.all());
  res.render('admin/articles', { title: 'Article Page | Admin' });
};
