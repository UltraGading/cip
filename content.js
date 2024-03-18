chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'trackUsage') {
      // Extract data from message and track resource usage
      const { resource_id, quantity_used } = message.data;
      // Perform tracking logic here
      // Example: Send data to a backend server
      fetch('http://localhost/track-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resource_id, quantity_used })
      })
      .then(response => {
        if (response.ok) {
          console.log('Resource usage tracked successfully');
        } else {
          console.error('Failed to track resource usage');
        }
      })
      .catch(error => {
        console.error('Error tracking resource usage:', error);
      });
    }
});  