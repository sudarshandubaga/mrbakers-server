<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #d97706; /* primary color */
            margin: 20px 0;
            letter-spacing: 5px;
        }
        .footer {
            font-size: 12px;
            color: #666;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello!</h2>
        <p>Your OTP for logging into Mr. Bakers app is:</p>
        <div class="otp">{{ $otp }}</div>
        <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        <div class="footer">
            Best wishes,<br>
            The Mr. Bakers Team
        </div>
    </div>
</body>
</html>
