import { z } from 'zod';
import { i18n } from 'config/i18n';

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: i18n.t('sv_invalid_email') }),
});
