window.addEventListener("load", function () {
    document
      .getElementById("findDistyForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
  
        let nmi = document.getElementById("input_nmi").value;
        let feedback = document.getElementById("feedbackresponse");

        submitNMI(nmi, feedback);
  
        return false;
      });
  });
  
  async function submitNMI(nmi, feedback) {
    // Hide the existing response
    feedback.innerHTML += "<p>Loading...</p>"
    //feedback.style.display = "none";
  
    let url = `https://api.findmyauspowerdisty.com/find?input_nmi=${encodeURIComponent(
      nmi
    )}`;
  
    let headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    });
  
    let params = {
      headers,
      mode: "cors",
    };
    try {
        let response = await fetch(url, params);
        let json = await response.json();
        // Add a visible delay before showing the response
        setTimeout(function () {
          feedback.innerHTML =
          "<table><tr><td>Searched NMI</td><td>"+json.NMI+"</td></tr><tr><td>Distributor</td><td>"+json.Distributor+"</td></tr><tr><td>Outage Page</td><td><a href=\""+json.OutageLink+"\">"+json.OutageLink+"</a></td></tr><tr><td>State</td><td>"+json.StateTerritory+"</a></td></tr></table>";
          feedback.style.display = "block";
        }, 450);
    }
    catch (e){
        feedback.innerHTML = "An Error Occured."
    }

  }