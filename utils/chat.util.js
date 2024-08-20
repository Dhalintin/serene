class ChatUtils {
    async formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: true });
        return `${formattedDate} ${formattedTime}`;
    }
}

module.exports = new ChatUtils();
