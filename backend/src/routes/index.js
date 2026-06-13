import { Router } from 'express';
import { adminRouter } from '../modules/admin/admin.routes.js';
import { alumniRouter } from '../modules/alumni/alumni.routes.js';
import { authRouter } from '../modules/auth/auth.routes.js';
import { bookingsRouter } from '../modules/bookings/bookings.routes.js';
import { chatRouter } from '../modules/chat/chat.routes.js';
import { mentorshipRouter } from '../modules/mentorship/mentorship.routes.js';
import { notificationsRouter } from '../modules/notifications/notifications.routes.js';
import { opportunitiesRouter } from '../modules/opportunities/opportunities.routes.js';
import { paymentsRouter } from '../modules/payments/payments.routes.js';
import { referralsRouter } from '../modules/referrals/referrals.routes.js';
import { uploadsRouter } from '../modules/uploads/uploads.routes.js';
import { usersRouter } from '../modules/users/users.routes.js';

export const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    data: {
      name: 'AlumniConnect API',
      version: 'v1'
    }
  });
});

apiRouter.get('/health', (_request, response) => {
  response.json({
    data: {
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/alumni', alumniRouter);
apiRouter.use('/referrals', referralsRouter);
apiRouter.use('/mentorship', mentorshipRouter);
apiRouter.use('/bookings', bookingsRouter);
apiRouter.use('/chat', chatRouter);
apiRouter.use('/opportunities', opportunitiesRouter);
apiRouter.use('/payments', paymentsRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/uploads', uploadsRouter);
apiRouter.use('/admin', adminRouter);

