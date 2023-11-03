export const formatDate = (dateString) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = (hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours)).toString().padStart(2, '0'); // Convert to 12-hour format and ensure 2-digit
  const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure minutes are 2-digit
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  return `${day} ${month} - ${formattedHours}:${formattedMinutes} ${meridiem}`;
}
