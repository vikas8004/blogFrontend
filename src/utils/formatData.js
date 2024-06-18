export default function formatDate(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date(date);
  
    const day = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
  
   
    return `${day} ${month}, ${year}`;
  }
  

  