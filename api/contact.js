const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, company, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Zorunlu alanlar eksik.' });
  }
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials are not configured');
    return res.status(500).json({ error: 'Sunucu yapılandırma hatası.' });
  }
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });
  const lines = [
    'Ad Soyad: ' + name,
    company ? 'Marka / Sirket: ' + company : null,
    'E-posta: ' + email,
    'Konu: ' + subject,
    '',
    'Mesaj:',
    message,
  ].filter(Boolean);
  const textBody = lines.join('\n');
  const safeBody = textBody.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  try {
    await transporter.sendMail({
      from: '"NURDAI Iletisim" <' + smtpUser + '>',
      to: 'hello@nurdai.com',
      replyTo: email,
      subject: '[nurdai.com] ' + subject + ' - ' + name,
      text: textBody,
      html: '<pre style="font-family:sans-serif;font-size:14px;line-height:1.7">' + safeBody + '</pre>',
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form SMTP error:', err.message);
    return res.status(500).json({ error: 'E-posta gonderilemedi. Lutfen tekrar deneyin.' });
  }
};
