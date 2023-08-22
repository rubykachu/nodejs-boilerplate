import express from 'express';

import * as HomeController from '../../app/controllers/admin/home_controller.mjs';
import * as ArticleController from '../../app/controllers/admin/article_controller.mjs';

const router = express.Router();

/* GET users listing. */
router.get('/', HomeController.index);

/* GET articles listing. */
router.get('/articles', ArticleController.index);

export default router;
