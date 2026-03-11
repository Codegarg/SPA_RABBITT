const nodemailer = require('nodemailer');

const sendSummaryEmail = async (toEmail, summaryText) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Formatting plain text to professional HTML
    const htmlSummary = summaryText
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        if (line.startsWith('•') || line.startsWith('*') || line.match(/^- /)) {
          return `<li style="margin-bottom: 8px;">${line.replace(/^[•*\-]\s*/, '')}</li>`;
        }
        return `<p style="margin-bottom: 12px;">${line}</p>`;
      })
      .join('');

    // If there are list items, wrap them in a <ul> roughly
    let polishedHtml = htmlSummary.replace(/(<li.*?>.*?<\/li>)+/g, match => `<ul style="padding-left: 20px;">${match}</ul>`);

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eef0f5;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1a1f36; font-size: 24px; font-weight: 600; margin: 0;">Sales Executive Summary</h2>
          <p style="color: #697386; font-size: 14px; margin-top: 5px;">Powered by AI Insights</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eef0f5; margin: 30px 0;" />
        
        <div style="color: #3c4257; font-size: 15px; line-height: 1.6;">
          ${polishedHtml}
        </div>
        
        <hr style="border: none; border-top: 1px solid #eef0f5; margin: 30px 0;" />
        
        <div style="text-align: center;">
          <p style="font-size: 13px; color: #8792a2; margin: 0;">
            Generated securely by the <strong>Sales Insight Automator</strong> API.
          </p>
          <p style="font-size: 12px; color: #a5b0c0; margin-top: 5px;">
            Please do not reply to this automated message.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Sales Insight Automator" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Automated Sales Insight Summary',
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email Delivery Error:', error);
    throw new Error('Failed to send email summary.');
  }
};

module.exports = {
  sendSummaryEmail
};
