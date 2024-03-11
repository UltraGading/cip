function onAnchorClick(event) {
    chrome.tabs.create({
      selected: true,
      url: event.srcElement.href
    });
    return false;
  }
function buildPopupDom(divName, data) {
    let popupDiv = document.getElementById(divName);
  
    let ul = document.createElement('ul');
    popupDiv.appendChild(ul);
  
    for (let i = 0, ie = data.length; i < ie; ++i) {
      let a = document.createElement('a');
      a.href = data[i];
      a.appendChild(document.createTextNode(data[i]));
      a.addEventListener('click', onAnchorClick);
  
      let li = document.createElement('li');
      li.appendChild(a);
  
      ul.appendChild(li);
    }
}
function buildTypedUrlList(divName) {
    // To look for history items visited in the last week,
    // subtract a week of microseconds from the current time.
    let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    let oneWeekAgo = new Date().getTime() - microsecondsPerWeek;
  
    // Track the number of callbacks from chrome.history.getVisits()
    // that we expect to get.  When it reaches zero, we have all results.
    let numRequestsOutstanding = 0;
  
    chrome.history.search(
      {
        text: '', // Return every history item....
        startTime: oneWeekAgo // that was accessed less than one week ago.
      },
      function (historyItems) {
        for (let i = 0; i < historyItems.length; ++i) {
          let url = historyItems[i].url;
          let processVisitsWithUrl = function (url) {
            return function (visitItems) {
              processVisits(url, visitItems);
            };
          };
          chrome.history.getVisits({ url: url }, processVisitsWithUrl(url));
          numRequestsOutstanding++;
        }
        if (!numRequestsOutstanding) {
          onAllVisitsProcessed();
        }
      }
    );
    let urlToCount = {};
    const processVisits = function (url, visitItems) {
      for (let i = 0, ie = visitItems.length; i < ie; ++i) {
        if (visitItems[i].transition != 'typed') {
          continue;
        }
  
        if (!urlToCount[url]) {
          urlToCount[url] = 0;
        }
  
        urlToCount[url]++;
      }  
      if (!--numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
    };
    const onAllVisitsProcessed = () => {
      // Get the top scorring urls.
      let urlArray = [];
      for (let url in urlToCount) {
        urlArray.push(url);
      }
      urlArray.sort(function (a, b) {
        return urlToCount[b] - urlToCount[a];
      });
  
      buildPopupDom(divName, urlArray.slice(0, 10));
    };
  }  
  document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList('typedUrl_div');
  });