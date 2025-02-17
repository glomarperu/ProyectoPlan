export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const formatTime = (time: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(`1970-01-01T${time}`).toLocaleTimeString(undefined, options);
};