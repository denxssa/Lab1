import React, { useState } from 'react';
import UserDashboardLayout from '../../../components/dashboard/shared/UserDashboardLayout/UserDashboardLayout';
import ConversationList from '../../../components/dashboard/pages/conversation-list/ConversationList';
import ChatWindow from '../../../components/dashboard/pages/chat-window/ChatWindow';

const MessagesPage = () => {
    const [selected, setSelected] = useState(null);

    return (
        <UserDashboardLayout>
            <div className="messages-page">
                <div className="messages-page__body">
                    <div className="messages-page__left">
                        <ConversationList selected={selected} onSelect={setSelected} />
                    </div>
                    <div className="messages-page__right">
                        <ChatWindow conversation={selected} />
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default MessagesPage;
