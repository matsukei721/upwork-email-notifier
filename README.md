# upwork-email-notifier

Automatically filters job-related emails from Upwork and sends Slack notifications.

## Overview

This Google Apps Script monitors your Gmail inbox for Upwork emails and sends Slack notifications only for job-related messages — filtering out newsletters and administrative emails.

## Features

- Monitors Gmail for emails from @upwork.com
- Filters by job-related keywords (invitations, proposals, contracts, messages, etc.)
- Sends notifications to a Slack channel via Webhook
- Automatically labels processed emails as "Upwork通知済み"
- Runs on a scheduled trigger (every hour)

## Tech Stack

- Google Apps Script
- Gmail API
- Slack Incoming Webhooks

## Setup

1. Create a new Google Apps Script project
2. Copy `Code.gs` into the editor
3. Add your Slack Webhook URL to Script Properties as `UPWORK_URL`
4. Set a time-based trigger to run `checkUpworkEmails` every hour

## Keywords monitored

- invited
- your proposal
- contract
- offer
- hired
- message from
- interview
