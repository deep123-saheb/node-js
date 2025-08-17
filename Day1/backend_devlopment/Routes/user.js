import express from 'express';
import { register,getUsersList,loginUser} from '../Controllers/user.js';

const router = express.Router();

// User registration route
router.post('/', register);

// Get userList from database
router.get('/userList', getUsersList);

// User login route
router.post('/login', loginUser);

export default router;
