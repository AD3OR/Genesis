
const downloadDatasetBtn = document.getElementById('downloadDatasetBtn');

if (downloadDatasetBtn) {
  downloadDatasetBtn.addEventListener('click', async () => {
    try {
      // Use the dedicated endpoint to fetch the dataset file
      const response = await fetch('/download/autismdata.txt');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Get the file data as a blob
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'autismdata.txt'; // Set the filename for the download
      
      // Append the link to the body and trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Clean up the temporary link and URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('Dataset download initiated.');
      
    } catch (error) {
      console.error('Error during dataset download:', error);
      
    }
  });
}
