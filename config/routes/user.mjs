import express from 'express';
import * as HomeController from '../../app/controllers/home_controller.mjs';

const router = express.Router();

/* GET home page. */
router.get('/', HomeController.index);

export default router;
