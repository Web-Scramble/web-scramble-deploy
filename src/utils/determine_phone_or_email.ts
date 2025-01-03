export const  identifyStringType = (input:string)=> {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Regular expression for phone number validation
    // This regex allows international numbers, dashes, spaces, and parentheses
    const phoneRegex = /^\+?(\d[\d-.() ]+)?(\d{10,})$/;
  
    if (emailRegex.test(input)) {
      return {email:input};
    } else if (phoneRegex.test(input)) {
      return {phone:input};
    } else {
      return 'unknown';
    }
}