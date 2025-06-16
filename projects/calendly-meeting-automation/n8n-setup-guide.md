# n8n Setup Guide - Calendly Meeting Automation

This guide walks you through setting up the Calendly Meeting Automation workflow in n8n step by step.

## 🚀 Quick Start

### Prerequisites
- n8n instance (self-hosted or n8n Cloud)
- Calendly account with webhook access
- Google Workspace or Microsoft 365 account
- SMTP email service or SendGrid account

## 📦 Step 1: Import the Workflow

1. **Download the workflow file**: `workflow.json`
2. **Open n8n interface**
3. **Import workflow**:
   - Click "Import from file" or "Import from URL"
   - Select the `workflow.json` file
   - Click "Import"

## 🔐 Step 2: Configure API Credentials

### Google Calendar API Setup

1. **Go to Google Cloud Console** (console.cloud.google.com)
2. **Create a new project** or select existing one
3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search and enable "Google Calendar API"
4. **Create OAuth2 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Add redirect URI: `https://your-n8n-instance.com/rest/oauth2-credential/callback`
5. **Configure in n8n**:
   - Go to n8n → Settings → Credentials
   - Add "Google Calendar OAuth2 API"
   - Enter Client ID and Client Secret
   - Complete OAuth flow

### Microsoft Graph API Setup

1. **Go to Azure Portal** (portal.azure.com)
2. **Navigate to App Registrations**
3. **Create new registration**:
   - Name: "Calendly Meeting Automation"
   - Supported account types: "Single tenant"
   - Redirect URI: `https://your-n8n-instance.com/rest/oauth2-credential/callback`
4. **Configure API Permissions**:
   - Go to "API permissions"
   - Add "Microsoft Graph" → "Delegated permissions"
   - Add: "Calendars.ReadWrite", "OnlineMeetings.ReadWrite"
   - Grant admin consent
5. **Create Client Secret**:
   - Go to "Certificates & secrets"
   - Create new client secret
   - Copy the secret value
6. **Configure in n8n**:
   - Add "Microsoft Teams OAuth2 API" credential
   - Enter Client ID, Client Secret, and Tenant ID

### Email Configuration

#### Option A: SMTP (Gmail)
1. **Enable 2FA** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → App passwords
   - Generate password for "Mail"
3. **Configure in n8n**:
   - Add "SMTP" credential
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: your email
   - Password: app password

#### Option B: SendGrid
1. **Create SendGrid account**
2. **Generate API Key**:
   - Go to Settings → API Keys
   - Create new key with "Mail Send" permissions
3. **Configure in n8n**:
   - Add "SendGrid" credential
   - Enter API key

## 🌐 Step 3: Configure Webhook

### Get n8n Webhook URL
1. **Open the imported workflow**
2. **Click on "Calendly Webhook" node**
3. **Copy the webhook URL** (usually looks like):
   ```
   https://your-n8n-instance.com/webhook/calendly-webhook
   ```

### Configure Calendly Webhook
1. **Go to Calendly** → Integrations → Webhooks
2. **Add new webhook**:
   - URL: Your n8n webhook URL
   - Events: Select "Invitee Created"
   - Click "Create Webhook"

## 🎯 Step 4: Customize Calendly Form

To enable platform selection, add a custom question to your Calendly event:

1. **Edit your Calendly event**
2. **Add custom question**:
   - Question: "What meeting platform do you prefer?"
   - Type: Multiple choice
   - Options: "Google Meet", "Microsoft Teams"
   - Make it required (optional)

## ⚙️ Step 5: Configure Workflow Nodes

### Process Meeting Data Node
Update the platform detection logic if needed:
```javascript
// Modify this section for custom question matching
const platformResponse = responses.find(r => 
  r.question.toLowerCase().includes('meeting platform') || 
  r.question.toLowerCase().includes('prefer')
);
```

### Email Configuration
Customize the email template in "Send Confirmation Email" node:
- Update sender name and email
- Modify email content and branding
- Add company logo or signature

### Slack Integration (Optional)
If using Slack notifications:
1. **Create Slack webhook**:
   - Go to Slack → Apps → Incoming Webhooks
   - Create new webhook for your channel
2. **Update webhook URL** in the Slack notification node

## 🧪 Step 6: Testing

### Test the Workflow
1. **Activate the workflow** in n8n
2. **Create a test booking** in Calendly
3. **Monitor execution**:
   - Check n8n execution log
   - Verify meeting creation
   - Confirm email delivery

### Troubleshooting Common Issues

#### Webhook Not Triggering
- Check webhook URL in Calendly
- Verify workflow is activated
- Check n8n logs for errors

#### API Authentication Errors
- Refresh OAuth tokens
- Verify API permissions
- Check credential configuration

#### Email Not Sending
- Verify SMTP/SendGrid credentials
- Check spam folders
- Review email node configuration

## 📊 Step 7: Monitoring & Maintenance

### Set Up Monitoring
1. **Enable workflow notifications**:
   - Go to workflow settings
   - Enable "Notify on error"
   - Add your email for notifications

2. **Create health check**:
   - Add periodic test execution
   - Monitor API rate limits
   - Track success/failure rates

### Regular Maintenance
- **Monthly**: Rotate API credentials
- **Quarterly**: Review and update email templates
- **As needed**: Update platform integrations

## 🚀 Advanced Configuration

### Error Handling
Add error handling nodes:
```javascript
// In error workflow
if ($json.error) {
  // Send notification to admin
  // Log error details
  // Trigger fallback process
}
```

### Multi-Calendar Support
Modify for multiple calendars:
1. Add calendar selection logic
2. Update credential management
3. Implement round-robin distribution

### Analytics Integration
Track workflow metrics:
- Meeting platform preferences
- Booking success rates
- Response times
- User satisfaction

## 🎯 Production Deployment

### Security Checklist
- [ ] All credentials properly configured
- [ ] Webhook endpoints use HTTPS
- [ ] Error notifications set up
- [ ] Rate limiting configured
- [ ] Backup strategy in place

### Performance Optimization
- Configure concurrent executions
- Set appropriate timeouts
- Implement retry logic
- Monitor resource usage

---

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review n8n execution logs
3. Verify API credential status
4. Test individual nodes

**Need help?** Contact: [your-email@domain.com]

---

**Created by Deon Hill** | Part of my automation portfolio showcasing n8n expertise and API integration skills. 