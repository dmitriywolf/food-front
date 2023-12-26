import { z } from 'zod';
import { i18n } from 'shared/i18n';

export const employerProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: i18n.t('sv_first_name_should_have_at_least_2_letters'),
  }),
  lastName: z.string().min(2, {
    message: i18n.t('sv_last_name_should_have_at_least_2_letters'),
  }),
});
