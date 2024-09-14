/**
 * Formats a date string into "Month Year" format.
 * 
 * @param {string|Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
    // Create a new Date object if the input is a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date object is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }
  
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(dateObj);
  };
  