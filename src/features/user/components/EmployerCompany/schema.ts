import { z } from 'zod';
import { i18n } from 'shared/i18n';

export const employerCompanySchema = z.object({
  companyName: z.string().min(2, {
    message: i18n.t('sv_first_name_should_have_at_least_2_letters'),
  }),
});
