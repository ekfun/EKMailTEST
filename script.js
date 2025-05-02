document.addEventListener('DOMContentLoaded', function() {
    // Sample email data
    const emails = [
        {
            id: 1,
            sender: 'John Doe',
            email: 'john@example.com',
            subject: 'Meeting Tomorrow',
            preview: 'Hi there, just a reminder about our meeting tomorrow at 10 AM...',
            body: 'Hi there,\n\nJust a reminder about our meeting tomorrow at 10 AM in the conference room. Please bring your project updates.\n\nBest regards,\nJohn',
            date: 'Today, 10:30 AM',
            read: false,
            starred: false
        },
        {
            id: 2,
            sender: 'Amazon',
            email: 'no-reply@amazon.com',
            subject: 'Your Order Has Shipped',
            preview: 'Your recent order #12345 has shipped and will arrive...',
            body: 'Hello,\n\nYour recent order #12345 has shipped and will arrive in 2-3 business days. You can track your package using the following link: [tracking link]\n\nThank you for shopping with us!\n\nAmazon Customer Service',
            date: 'Yesterday, 3:45 PM',
            read: true,
            starred: true
        },
        {
            id: 3,
            sender: 'LinkedIn',
            email: 'updates@linkedin.com',
            subject: 'New connection request',
            preview: 'You have a new connection request from Sarah Miller...',
            body: 'You have a new connection request from Sarah Miller.\n\nSarah is a Marketing Director at XYZ Corp.\n\nAccept or ignore this request at your convenience.\n\n- The LinkedIn Team',
            date: 'Mar 15, 9:20 AM',
            read: true,
            starred: false
        },
        {
            id: 4,
            sender: 'GitHub',
            email: 'notifications@github.com',
            subject: 'Pull Request: Feature/user-authentication',
            preview: 'A new pull request has been opened in your repository...',
            body: 'A new pull request has been opened in your repository by developer123.\n\nBranch: feature/user-authentication\n\nPlease review the changes and provide feedback.\n\n- GitHub',
            date: 'Mar 14, 5:12 PM',
            read: false,
            starred: false
        },
        {
            id: 5,
            sender: 'Netflix',
            email: 'info@netflix.com',
            subject: 'New shows added to your list',
            preview: 'We\'ve added new shows based on your preferences...',
            body: 'Hello,\n\nWe\'ve added new shows based on your preferences:\n\n- Stranger Things Season 4\n- The Crown\n- Ozark\n\nHappy streaming!\n\n- The Netflix Team',
            date: 'Mar 12, 11:05 AM',
            read: true,
            starred: true
        }
    ];

    // DOM elements
    const emailList = document.querySelector('.email-list');
    const emailDetail = document.getElementById('emailDetail');
    const closeDetail = document.getElementById('closeDetail');
    const composeBtn = document.querySelector('.compose-btn');
    const composeModal = document.getElementById('composeModal');
    const closeCompose = document.getElementById('closeCompose');
    const composeForm = document.getElementById('composeForm');

    // Render email list
    function renderEmails() {
        emailList.innerHTML = '';
        emails.forEach(email => {
            const emailItem = document.createElement('div');
            emailItem.className = `email-item ${email.read ? '' : 'unread'}`;
            emailItem.innerHTML = `
                <div class="email-checkbox"><input type="checkbox"></div>
                <div class="email-sender">${email.sender}</div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.preview}</div>
                <div class="email-date">${email.date}</div>
            `;
            emailItem.addEventListener('click', () => showEmailDetail(email.id));
            emailList.appendChild(emailItem);
        });
    }

    // Show email detail
    function showEmailDetail(id) {
        const email = emails.find(e => e.id === id);
        if (!email) return;

        document.getElementById('emailSubject').textContent = email.subject;
        document.getElementById('senderEmail').textContent = email.email;
        document.getElementById('emailDate').textContent = email.date;
        document.getElementById('emailBody').textContent = email.body;

        // Mark as read
        if (!email.read) {
            email.read = true;
            renderEmails();
        }

        emailDetail.style.display = 'flex';
    }

    // Close email detail
    closeDetail.addEventListener('click', () => {
        emailDetail.style.display = 'none';
    });

    // Open compose modal
    composeBtn.addEventListener('click', () => {
        composeModal.style.display = 'flex';
    });

    // Close compose modal
    closeCompose.addEventListener('click', () => {
        composeModal.style.display = 'none';
    });

    // Handle compose form submission
    composeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const to = document.getElementById('composeTo').value;
        const subject = document.getElementById('composeSubject').value;
        const body = document.getElementById('composeBody').value;

        // In a real app, you would send this to your backend
        alert(`Email to ${to} with subject "${subject}" would be sent in a real app.`);
        
        // Reset form and close modal
        composeForm.reset();
        composeModal.style.display = 'none';
    });

    // Initial render
    renderEmails();
});
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailList = document.getElementById('emailList');
    const emailDetailView = document.getElementById('emailDetailView');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const composeBtn = document.getElementById('ekmailComposeBtn');
    const composeModal = document.getElementById('composeModal');
    const closeComposeBtn = document.getElementById('closeComposeBtn');
    const composeForm = document.getElementById('composeForm');
    const refreshBtn = document.getElementById('refreshBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const replyBtn = document.getElementById('replyBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const folderItems = document.querySelectorAll('.ekmail-folders li');
    const inboxCount = document.getElementById('inboxCount');
    const folderInfo = document.getElementById('folderInfo');

    // Email Data
    let emails = JSON.parse(localStorage.getItem('ekmail-emails')) || [];
    let currentFolder = 'inbox';
    let selectedEmailId = null;

    // Sample data if empty
    if (emails.length === 0) {
        emails = [
            {
                id: generateId(),
                from: 'support@ekmail.com',
                to: 'user@ekmail.com',
                subject: 'Welcome to EKmail!',
                body: 'Thank you for choosing EKmail as your email service. We hope you enjoy using it!',
                date: new Date().toISOString(),
                read: false,
                folder: 'inbox'
            },
            {
                id: generateId(),
                from: 'notifications@linkedin.com',
                to: 'user@ekmail.com',
                subject: 'New connection request',
                body: 'You have a new connection request from John Smith.',
                date: new Date(Date.now() - 3600000).toISOString(),
                read: true,
                folder: 'inbox'
            },
            {
                id: generateId(),
                from: 'user@ekmail.com',
                to: 'friend@example.com',
                subject: 'Meeting tomorrow',
                body: 'Hi there, just confirming our meeting tomorrow at 2pm.',
                date: new Date(Date.now() - 86400000).toISOString(),
                read: true,
                folder: 'sent'
            }
        ];
        saveEmails();
    }

    // Initialize
    renderEmailList();

    // Event Listeners
    composeBtn.addEventListener('click', openComposeModal);
    closeComposeBtn.addEventListener('click', closeComposeModal);
    closeDetailBtn.addEventListener('click', closeEmailDetail);
    refreshBtn.addEventListener('click', refreshEmails);
    deleteBtn.addEventListener('click', deleteSelectedEmail);
    replyBtn.addEventListener('click', replyToEmail);
    forwardBtn.addEventListener('click', forwardEmail);
    
    composeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendEmail();
    });

    folderItems.forEach(item => {
        item.addEventListener('click', function() {
            folderItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            currentFolder = this.dataset.folder;
            folderInfo.textContent = this.textContent.trim().replace(/[0-9]/g, '');
            renderEmailList();
        });
    });

    // Functions
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function saveEmails() {
        localStorage.setItem('ekmail-emails', JSON.stringify(emails));
    }

    function renderEmailList() {
        emailList.innerHTML = '';
        const filteredEmails = emails.filter(email => email.folder === currentFolder);
        
        if (filteredEmails.length === 0) {
            emailList.innerHTML = '<div class="empty-folder">No emails in this folder</div>';
            return;
        }

        filteredEmails.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        filteredEmails.forEach(email => {
            const emailItem = document.createElement('div');
            emailItem.className = `email-item ${email.read ? '' : 'unread'}`;
            emailItem.dataset.id = email.id;
            
            const date = new Date(email.date);
            const dateString = date.toLocaleDateString() === new Date().toLocaleDateString() 
                ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                : date.toLocaleDateString();
            
            emailItem.innerHTML = `
                <div class="email-sender">${email.folder === 'sent' ? email.to : email.from}</div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.body.substring(0, 50)}${email.body.length > 50 ? '...' : ''}</div>
                <div class="email-date">${dateString}</div>
            `;
            
            emailItem.addEventListener('click', () => viewEmail(email.id));
            emailList.appendChild(emailItem);
        });

        updateUnreadCount();
    }

    function viewEmail(id) {
        const email = emails.find(e => e.id === id);
        if (!email) return;

        // Mark as read
        if (!email.read && email.folder === 'inbox') {
            email.read = true;
            saveEmails();
            renderEmailList();
        }

        const date = new Date(email.date);
        const dateString = date.toLocaleString();
        
        document.getElementById('detailSubject').textContent = email.subject;
        document.getElementById('detailSender').textContent = email.folder === 'sent' ? 'To: ' + email.to : email.from;
        document.getElementById('detailEmail').textContent = email.folder === 'sent' ? '' : email.from;
        document.getElementById('detailDate').textContent = dateString;
        document.getElementById('detailBody').textContent = email.body;
        document.getElementById('detailAvatar').textContent = email.folder === 'sent' ? email.to.charAt(0).toUpperCase() : email.from.charAt(0).toUpperCase();

        selectedEmailId = id;
        emailDetailView.style.display = 'flex';
    }

    function closeEmailDetail() {
        emailDetailView.style.display = 'none';
        selectedEmailId = null;
    }

    function openComposeModal() {
        composeModal.style.display = 'flex';
    }

    function closeComposeModal() {
        composeModal.style.display = 'none';
        composeForm.reset();
    }

    function sendEmail() {
        const to = document.getElementById('composeTo').value;
        const subject = document.getElementById('composeSubject').value;
        const body = document.getElementById('composeBody').value;

        if (!to || !body) {
            alert('Please fill in all required fields');
            return;
        }

        // Add to sent folder
        emails.push({
            id: generateId(),
            from: 'user@ekmail.com',
            to: to,
            subject: subject || '(No subject)',
            body: body,
            date: new Date().toISOString(),
            read: true,
            folder: 'sent'
        });

        // Simulate receiving a reply (for demo purposes)
        if (to.includes('@example.com')) {
            setTimeout(() => {
                emails.push({
                    id: generateId(),
                    from: to,
                    to: 'user@ekmail.com',
                    subject: 'Re: ' + (subject || '(No subject)'),
                    body: 'Thanks for your email! This is an automated reply.',
                    date: new Date().toISOString(),
                    read: false,
                    folder: 'inbox'
                });
                saveEmails();
                if (currentFolder === 'inbox') renderEmailList();
                updateUnreadCount();
            }, 2000);
        }

        saveEmails();
        if (currentFolder === 'sent') renderEmailList();
        closeComposeModal();
        alert('Email sent successfully!');
    }

    function refreshEmails() {
        renderEmailList();
    }

    function deleteSelectedEmail() {
        if (!selectedEmailId) {
            alert('No email selected');
            return;
        }

        const emailIndex = emails.findIndex(e => e.id === selectedEmailId);
        if (emailIndex !== -1) {
            emails[emailIndex].folder = 'trash';
            saveEmails();
            renderEmailList();
            closeEmailDetail();
        }
    }

    function replyToEmail() {
        if (!selectedEmailId) return;
        
        const email = emails.find(e => e.id === selectedEmailId);
        if (!email) return;
        
        openComposeModal();
        document.getElementById('composeTo').value = email.from;
        document.getElementById('composeSubject').value = 'Re: ' + email.subject;
        document.getElementById('composeBody').value = `\n\n---------- Original Message ----------\nFrom: ${email.from}\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`;
    }

    function forwardEmail() {
        if (!selectedEmailId) return;
        
        const email = emails.find(e => e.id === selectedEmailId);
        if (!email) return;
        
        openComposeModal();
        document.getElementById('composeSubject').value = 'Fwd: ' + email.subject;
        document.getElementById('composeBody').value = `\n\n---------- Forwarded Message ----------\nFrom: ${email.from}\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`;
    }

    function updateUnreadCount() {
        const unreadCount = emails.filter(e => e.folder === 'inbox' && !e.read).length;
        inboxCount.textContent = unreadCount > 0 ? unreadCount : '';
    }
});
