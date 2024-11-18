import { describe, expect, test } from '@jest/globals';
import { container } from 'tsyringe';
import { EmailService } from '../../services/email.service';
import { userRegistrationTemplate } from '../../email_templates/user-registration.template';

describe('Email Service', () => {
    const _emailService = container.resolve(EmailService);

    test('Can send an email via SendGrid', async () => {
        const toEmail = 'dylanlegendre09@gmail.com';
        const result = await _emailService.SendEmailWithTemplate(
            userRegistrationTemplate({
                Email: toEmail,
                URL: 'http://localhost:3000/callback',
            }),
            'Unit Test User Registration Email',
            toEmail
        );
        expect(result).toBeTruthy();
    });
});
