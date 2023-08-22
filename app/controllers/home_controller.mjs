/* eslint import/prefer-default-export: "off" */

export const index = (_req, res, _next) => {
  res.render('home', { title: 'Welcome to Nodejs' });
};
