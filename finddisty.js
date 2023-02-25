window.addEventListener("load", function () {
    document
      .getElementById("findDistyForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
  
        let nmi = document.getElementById("input_nmi").value;
        let feedback = document.getElementById("response");

        submitNMI(nmi, feedback);
  
        return false;
      });
  });
  
  async function submitNMI(nmi, feedback) {
    // Hide the existing response
    feedback.style.display = "none";
  
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
  
    let response = await fetch(url, params);
    let json = await response.json();
    // Add a visible delay before showing the response
    setTimeout(function () {
      feedback.textContent = json.NMI+"\n"+json.Distributor+"\n"+
      json.OutageLink+"\n"+json.StateTerritory;
      feedback.style.display = "block";
    }, 900);
  }