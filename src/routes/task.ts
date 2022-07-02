import { Router} from "express";
import { getTasks, postTask, deleteTask, putTask } from "../apiControllers/task";
const router = Router();

router.post('/',postTask)
router.get('/',getTasks)
router.put('/:id',putTask)
router.delete('/:id',deleteTask)

export default router