import { Router } from 'express';
import { CreateReminder } from '../controller/reminder/createReminder.js';
import { GetAllReminders } from '../controller/reminder/getAllReminders.js';
import { GetReminderById } from '../controller/reminder/getReminderById.js';
import { UpdateReminder } from '../controller/reminder/updateReminder.js';
import { DeleteReminder } from '../controller/reminder/deleteReminder.js';

const reminderRouter = Router();
const createReminder = new CreateReminder();
const getAllReminders = new GetAllReminders();
const getReminderById = new GetReminderById();
const updateReminder = new UpdateReminder();
const deleteReminder = new DeleteReminder();

reminderRouter.post('/reminders', createReminder.handle);
reminderRouter.get('/reminders', getAllReminders.handle);
reminderRouter.get('/reminders/:id', getReminderById.handle);
reminderRouter.put('/reminders/:id', updateReminder.handle);
reminderRouter.delete('/reminders/:id', deleteReminder.handle);

export { reminderRouter };
