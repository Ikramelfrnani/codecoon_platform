<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px;">
        <h2 style="color: #333;">Hello,</h2>
        <p>
            Follow this link to reset your CodeCoon password for your <strong>{{ $email }}</strong> account.
        </p>
        <p style="text-align: left; margin: 30px 0;">
            <a href="{{ $url }}" style="background-color: #6c5ce7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Set New Password
            </a>
        </p>
        <p>
            If you didn't ask to reset your password, you can ignore this email.
        </p>
        <p style="margin-top: 40px;">Thanks,<br><strong>Your CodeCoon team</strong></p>
    </div>
</body>
</html>
