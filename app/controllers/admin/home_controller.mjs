/* eslint import/prefer-default-export: "off" */

export const index = (_req, res, _next) => {
  res.render('admin/index', { title: 'Dashboard | Admin' });
};
