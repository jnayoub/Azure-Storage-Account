function formatDate(datetime) {
  const date = new Date(datetime);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function formatFileSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  const size = bytes / Math.pow(1024, i);

  return `${size.toFixed(2)} ${sizes[i]}`;
}
function formatDateandTime(dateandtime) {
  if (!dateandtime) return "Invalid Date and Time";

  const date = new Date(dateandtime);

  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
    date
  );

  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
    date
  );

  return `${formattedDate} ${formattedTime}`;
}
