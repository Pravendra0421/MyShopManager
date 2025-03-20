import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendLowStockEmail = async (recipientEmail, itemName, stock) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `⚠️ Low Stock Alert: ${itemName}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: #FF5733; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0;">⚠️ Low Stock Alert</h1>
            </div>

            <!-- Content -->
            <div style="padding: 20px;">
                <p style="font-size: 18px; color: #333;">MYSHOPMANAGER,</p>
                <p style="font-size: 16px; color: #666;">
                    The item <strong style="color: #FF5733;">${itemName}</strong> is running low on stock.
                </p>
                <p style="font-size: 16px; background: #ffebcc; padding: 10px; border-radius: 5px; text-align: center;">
                    <strong>Current Stock: ${stock}</strong>
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://myshopmanager.onrender.com" 
                        style="background: #FF5733; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Restock Now
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #999; text-align: center;">
                    Please restock as soon as possible to avoid inventory issues.
                </p>
            </div>

            <!-- Footer -->
            <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 14px; color: #777;">
                &copy; ${new Date().getFullYear()} MyShopManager | All Rights Reserved.
            </div>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log(`📩 Low stock alert sent to ${recipientEmail}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};
