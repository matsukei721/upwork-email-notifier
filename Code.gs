const SLACK_WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty('UPWORK_URL');

const JOB_KEYWORDS = [
  'invited',
  'your proposal',
  'contract',
  'offer',
  'hired',
  'message from',
  'interview'
];

function isJobRelated(subject) {
  const lower = subject.toLowerCase();
  return JOB_KEYWORDS.some(keyword => lower.includes(keyword));
}

function checkUpworkEmails() {
  const threads = GmailApp.search('from:@upwork.com is:unread', 0, 10);
  
  let label = GmailApp.getUserLabelByName('Upwork通知済み');
  if (!label) {
    label = GmailApp.createLabel('Upwork通知済み');
  }
  
  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      if (message.isUnread()) {
        const subject = message.getSubject();
        
        if (isJobRelated(subject)) {
          const payload = {
            text: `📬 *Upwork案件通知*\n*件名:* ${subject}`
          };
          
          UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            contentType: 'application/json',
            payload: JSON.stringify(payload)
          });
        }
        
        message.markRead();
      }
    });
    
    thread.addLabel(label);
  });
}
