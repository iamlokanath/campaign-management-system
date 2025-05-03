import express from 'express';
import {
  getProfiles,
  getProfileById,
  createProfile,
  deleteProfile
} from '../controllers/linkedinController';

const router = express.Router();

router.route('/')
  .get(getProfiles)
  .post(createProfile);

router.route('/:id')
  .get(getProfileById)
  .delete(deleteProfile);

export default router; 