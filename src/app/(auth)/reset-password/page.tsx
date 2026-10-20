import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordPage = () => {
    return (
        <div>
            <Suspense fallback= "Loading">
                <ResetPasswordForm/>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;