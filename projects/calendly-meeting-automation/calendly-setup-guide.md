# Calendly Setup Guide for n8n Automation

This guide shows you how to configure your Calendly event to work properly with the n8n meeting automation workflow.

## 🎯 Overview

Instead of using Calendly's built-in integrations (which can be unreliable), our n8n workflow creates meeting links via direct API calls to Google and Microsoft. This requires capturing the user's platform preference through a custom question.

## 📋 Step-by-Step Setup

### 1. Access Your Calendly Event Settings

1. Go to [calendly.com](https://calendly.com) and log in
2. Navigate to your **Event Types**
3. Click **Edit** on your main event type (the one used in your portfolio)

### 2. Configure Event Basics

**Event Details:**
- Name: "Meeting with Deon Hill" (or your preference)
- Duration: 30 minutes (recommended)
- Description: Include mention of automation demo

### 3. Set Up Location Settings

**Important**: Don't use built-in video conferencing options.

**Location Settings:**
- Select **"Ask invitee"** or **"Other"**
- Do NOT enable:
  - ❌ Google Meet integration
  - ❌ Microsoft Teams integration
  - ❌ Zoom integration

**Why?** Our n8n workflow will create the meeting links, so we don't want Calendly trying to do it too.

### 4. Add Custom Questions

This is the **critical step** for the automation to work.

**Go to "Invitee Questions" section and add:**

#### Question 1: Meeting Platform Preference
- **Question Text**: "What meeting platform do you prefer?"
- **Type**: Multiple Choice (Radio buttons)
- **Options**:
  - Google Meet
  - Microsoft Teams
- **Required**: Yes
- **Help Text**: "We'll create your meeting link automatically based on your preference"

#### Question 2 (Optional): Meeting Purpose
- **Question Text**: "What would you like to discuss?"
- **Type**: Multiple Choice or Long Text
- **Options** (if multiple choice):
  - Automation project consultation
  - n8n workflow development
  - General software engineering discussion
  - Other

### 5. Configure Notifications

**Email Settings:**
- **Disable** Calendly's default confirmation emails
- Our n8n workflow will send custom confirmation emails

**Calendar Settings:**
- You can keep calendar invites enabled
- Our workflow will add the meeting link to the calendar event

### 6. Set Up Webhooks

**Important**: This connects Calendly to your n8n workflow.

1. Go to **Integrations** → **Webhooks**
2. **Add webhook**:
   - **URL**: `https://your-n8n-instance.com/webhook/calendly-webhook`
   - **Events**: Select "Invitee Created"
   - **Signing key**: Copy this for your n8n workflow

### 7. Test the Setup

1. **Book a test meeting** using your Calendly link
2. **Check the webhook** is triggering in n8n
3. **Verify the question data** is captured correctly

## 🔍 Troubleshooting

### Common Issues:

#### "Microsoft Teams meeting link couldn't be added"
- **Solution**: Disable MS Teams integration in Calendly settings
- **Why**: Let n8n handle meeting creation instead

#### "Google Meet link not working"
- **Solution**: Disable Google Meet integration in Calendly
- **Why**: Our workflow creates better, more reliable links

#### Webhook not triggering
- **Check**: Webhook URL is correct
- **Check**: Event type is "Invitee Created"
- **Check**: n8n workflow is active

### Question Data Format

When someone books a meeting, the webhook will send data like this:

```json
{
  "payload": {
    "questions_and_responses": [
      {
        "question": "What meeting platform do you prefer?",
        "response": "Google Meet"
      }
    ]
  }
}
```

Our n8n workflow parses this to determine which platform to use.

## 🚀 Advanced Configuration

### Custom Branding
- Add your logo to the Calendly page
- Customize colors to match your portfolio
- Add custom confirmation text

### Multiple Event Types
- Create different event types for different purposes
- Each can have its own automation workflow
- Different durations for different meeting types

### Analytics Integration
- Track booking sources
- Monitor platform preferences
- Measure automation success rates

## ✅ Verification Checklist

Before going live, ensure:

- [ ] Custom question for platform preference is added
- [ ] Built-in video integrations are disabled
- [ ] Webhook is configured and pointing to n8n
- [ ] Test booking completes successfully
- [ ] n8n workflow receives correct data
- [ ] Meeting links are created properly
- [ ] Confirmation emails are sent

## 📞 Support

If you encounter issues:
1. Check the n8n execution logs
2. Verify webhook delivery in Calendly
3. Test with a simple booking first
4. Ensure all API credentials are configured

---

**Result**: Visitors to your portfolio can book real meetings, choose their preferred platform, and receive automated meeting links created by your n8n workflow - showcasing your automation skills in action! 